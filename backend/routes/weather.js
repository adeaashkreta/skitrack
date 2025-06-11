// backend/routes/weather.js
const express = require('express');
const axios   = require('axios');
const router  = express.Router();
require('dotenv').config();

// ──────────────────────────────────────────────────────────────
// In-memory cache for Open-Meteo calls (10-minute TTL)
// ──────────────────────────────────────────────────────────────
const wxCache = {};
const TTL = 10 * 60 * 1000; // 10 min

function cached(key, fn) {
  const hit = wxCache[key];
  if (hit && Date.now() - hit.ts < TTL) return Promise.resolve(hit.val);

  return fn().then((val) => {
    wxCache[key] = { ts: Date.now(), val };
    return val;
  });
}

// ──────────────────────────────────────────────────────────────
// Helper: fetch weather data from Open-Meteo
// ──────────────────────────────────────────────────────────────
async function fetchWeather({ name, lat, lon }) {
  const key = `wx:${name}`;
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true&hourly=cloudcover,precipitation,snowfall`;

  const raw = await cached(key, () => axios.get(url).then(r => r.data));
  if (!raw?.current_weather) return null;
  return raw;
}

// ──────────────────────────────────────────────────────────────
// Hard-coded demo slope data
// [quality, groomed%, "runsOpen / runsTotal", "liftsOpen / liftsTotal"]
// ──────────────────────────────────────────────────────────────
const slopeDemo = {
  'Zermatt':        ['Powder', 78, '200 / 230', '40 / 45'],
  'Whistler':       ['Packed', 65, '155 / 200', '20 / 22'],
  'Val Thorens':    ['Excellent', 90, '140 / 150', '30 / 32'],
  'Aspen Snowmass': ['Good', 72, '100 / 125', '17 / 20'],
  default:          ['Good', 50, 'N/A', 'N/A']
};

// ──────────────────────────────────────────────────────────────
// GET  /api/weather/search?resort=<name>
// ──────────────────────────────────────────────────────────────
router.get('/search', async (req, res) => {
  try {
    const { resort } = req.query;
    if (!resort) {
      return res.status(400).json({ error: 'Missing "resort" query parameter.' });
    }

    // Load basic resort list (name, lat, lon, etc.)
    const allResorts = require('../data/resorts.json');
    const resortObj = allResorts.find(r =>
      r.name.toLowerCase().startsWith(resort.toLowerCase())
    );
    if (!resortObj) {
      return res.status(404).json({ error: `Resort "${resort}" not found.` });
    }

    // ─── Weather ───
    const weatherRaw = await fetchWeather(resortObj);
    if (!weatherRaw) {
      return res.status(500).json({ error: 'Failed to retrieve weather data.' });
    }
    const cw = weatherRaw.current_weather;

    // Snow depth calcs
    const snowfallArr = weatherRaw.hourly?.snowfall || [];
    const snow24h = snowfallArr.slice(-24).reduce((a, b) => a + b, 0);
    const snow3d  = snowfallArr.slice(-72).reduce((a, b) => a + b, 0);
    const snow7d  = snowfallArr.slice(-168).reduce((a, b) => a + b, 0);
    const bluebirdDays = 3; // demo

    // ─── Slope & lifts (demo data) ───
    const demoKey = Object.keys(slopeDemo).find(k =>
  resortObj.name.toLowerCase().includes(k.toLowerCase())
) || 'default';

const [quality, groomed, runsOpen, liftsOpen] = slopeDemo[demoKey];

    // ─── 7-day forecast ───
    const today     = new Date();
    const endDate   = new Date(today);
    endDate.setDate(today.getDate() + 6);

    const fcUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${resortObj.lat}&longitude=${resortObj.lon}` +
      `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
      `&start_date=${today.toISOString().slice(0,10)}` +
      `&end_date=${endDate.toISOString().slice(0,10)}` +
      `&timezone=UTC`;

    const fcData = (await axios.get(fcUrl)).data.daily;
    const codeToIcon = (code) => {
      if (code === 0) return '☀️';
      if ([1,2].includes(code)) return '🌤';
      if (code === 3) return '☁️';
      if ([71,73,75,77,85,86].includes(code)) return '❄️';
      if ([61,63,65].includes(code)) return '🌧';
      return '🌡';
    };
    const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const forecast = fcData.time.map((d,i) => ({
      day:  weekday[new Date(d).getUTCDay()],
      icon: codeToIcon(fcData.weathercode[i]),
      hi:   fcData.temperature_2m_max[i],
      lo:   fcData.temperature_2m_min[i]
    }));

    // ─── Final payload ───
    return res.json({
      name: resortObj.name,
      rating: resortObj.rating || null,
      recommendation: resortObj.recommendation || '',
      slope: { quality, groomed, runsOpen, liftsOpen },
      weather: {
        currentTemp:  Math.round(cw.temperature),
        snow24h:      Math.round(snow24h),
        snow3d:       Math.round(snow3d),
        snow7d:       Math.round(snow7d),
        bluebirdDays
      },
      forecast
    });
  } catch (err) {
    console.error('[/api/weather/search] error:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/highlights', (req, res) => {
  res.json({
    coldest:  { name: 'Ruka', temp: -15 },
    windiest: { name: 'La Grave', wind: 55 },
    sunniest: { name: 'Sierra Nevada', temp: 12 }
  });
});

router.get('/picks', (req, res) => {
  res.json([
    { name: 'Zermatt', condition: 'Blue-bird ☀️' },
    { name: 'Val Thorens', condition: '30 cm fresh ❄️' },
    { name: 'Aspen', condition: 'Ideal groomers 🏂' },
    { name: 'Kitzbühel', condition: 'Family friendly 👨‍👩‍👧‍👦' }
  ]);
});

module.exports = router;
