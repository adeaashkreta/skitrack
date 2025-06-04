const express = require('express');
const axios   = require('axios');
const router  = express.Router();
require('dotenv').config(); // Loads SLOPE_API_KEY from .env
// //
// ───── In-Memory Cache for Open-Meteo Calls ─────
//
const wxCache = {};
const TTL = 10 * 60 * 1000; // 10 minutes

const cached = (key, fn) => {
  const hit = wxCache[key];
  if (hit && Date.now() - hit.ts < TTL) {
    return Promise.resolve(hit.val);
  }
  return fn().then((val) => {
    wxCache[key] = { ts: Date.now(), val };
    return val;
  });
};

//
// ───── Helper: Fetch current weather & snow data from Open-Meteo ─────
//
async function fetchWeather({ name, lat, lon }) {
  const key = `wx:${name}`;
  const raw = await cached(key, () => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current_weather=true&hourly=cloudcover,precipitation,snowfall`;
    return axios.get(url).then((r) => r.data);
  });
  if (!raw?.current_weather) {
    console.error(`Failed to fetch current weather for ${name}`);
    return null;
  }
  return raw;
}

//
// ───── ROUTE: GET /api/weather/search?resort=<name> ─────
//
router.get('/search', async (req, res) => {
  try {
    // 1) Validate query parameter
    const { resort } = req.query;
    if (!resort) {
      return res
        .status(400)
        .json({ error: 'Missing "resort" query parameter.' });
    }

  
    const allResorts = require('../data/resorts.json');
    const resortObj = allResorts.find(r =>
      r.name.toLowerCase().startsWith(resort.toLowerCase())
    );
    if (!resortObj) {
      return res
        .status(404)
        .json({ error: `Resort "${resort}" not found.` });
    }

  
    const weatherRaw = await fetchWeather(resortObj);
    if (!weatherRaw) {
      return res
        .status(500)
        .json({ error: 'Failed to retrieve weather data.' });
    }
    const cw = weatherRaw.current_weather;

  
    let snow24h = 0,
        snow3d = 0,
        snow7d = 0;
    if (weatherRaw.hourly && Array.isArray(weatherRaw.hourly.snowfall)) {
      const snowfallArray = weatherRaw.hourly.snowfall;
      // Sum last 24 hours (assumes hourly data sorted chronologically)
      snow24h = snowfallArray.slice(-24).reduce((a, b) => a + b, 0);
      // Sum last 3 days (72 hours)
      snow3d = snowfallArray.slice(-72).reduce((a, b) => a + b, 0);
      // Sum last 7 days (168 hours)
      snow7d = snowfallArray.slice(-168).reduce((a, b) => a + b, 0);
    }

    // 4) Compute “bluebirdDays” (days with < 30% cloudcover). For simplicity, mock as 3.
    const bluebirdDays = 3;

    // ───── Replace the hard-coded slopeStatusDemo with a real API call ─────
    const SLOPE_API_KEY = process.env.SLOPE_API_KEY;
    let slopeData;
    try {
      // Example: GET https://api.example-slopes.com/v1/resorts/{resort_id}/status?api_key=…
      const apiRes = await axios.get(
        `https://api.example-slopes.com/v1/resorts/${encodeURIComponent(resortObj.id)}/status`,
        { params: { api_key: SLOPE_API_KEY } }
      );
      const rsp = apiRes.data;

      slopeData = {
        quality:  rsp.quality,                             // e.g. "Powder"
        groomed:  rsp.groomedPercent,                      // e.g. 78 (%)
        runsOpen: `${rsp.runsOpen} / ${rsp.runsTotal}`,    // e.g. "200 / 230"
        liftsOpen: `${rsp.liftsOpen} / ${rsp.liftsTotal}`  // e.g. "40 / 45"
      };
    } catch (err) {
      console.error(`Failed to fetch slope status for ${resortObj.name}:`, err.message);
      // Fallback if the slope API call fails
      slopeData = {
        quality:   'Unknown',
        groomed:   0,
        runsOpen:  'N/A',
        liftsOpen: 'N/A'
      };
    }


    // The 7-day forecast from daily data in the forecast API
    const today = new Date();
    const endDateObj = new Date();
    endDateObj.setDate(today.getDate() + 6); // Next 6 days + today = 7 days total

    const isoToday = today.toISOString().slice(0, 10);
    const isoEnd   = endDateObj.toISOString().slice(0, 10);

    const forecastUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${resortObj.lat}&longitude=${resortObj.lon}` +
      `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
      `&start_date=${isoToday}&end_date=${isoEnd}` +
      `&timezone=UTC`;

    const forecastRes = await axios.get(forecastUrl);
    const daily = forecastRes.data.daily;

    function weatherCodeToIcon(code) {
      if (code === 0)                return '☀️';   // Clear sky
      if (code === 1 || code === 2)  return '🌤';   // Mainly clear / partly cloudy
      if (code === 3)                return '☁️';   // Overcast
      if ([45, 48].includes(code))   return '🌫';   // Fog
      if ([51, 53, 55, 56, 57].includes(code)) return '🌦'; // Drizzle
      if ([61, 63, 65, 66, 67].includes(code)) return '🌧'; // Rain
      if ([71, 73, 75, 77].includes(code))        return '🌨'; // Snow
      if ([80, 81, 82].includes(code))            return '⛈'; // Rain showers
      if ([85, 86].includes(code))                return '❄️'; // Snow showers
      if ([95, 96, 99].includes(code))            return '🌩'; // Thunderstorm
      return '❔'; // Fallback for unknown codes
    }

    const forecastArr = daily.time.map((dateStr, idx) => {
      const dateObj = new Date(dateStr);
      const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const dayName = weekdayNames[dateObj.getUTCDay()];
      return {
        day:  dayName,
        icon: weatherCodeToIcon(daily.weathercode[idx]),
        hi:   daily.temperature_2m_max[idx],
        lo:   daily.temperature_2m_min[idx]
      };
    });

    const result = {
  name:           `${resortObj.name}`,
  rating: resortObj.rating || null,
  recommendation: resortObj.recommendation || '',
  slope:          slopeData,
  weather: {
    currentTemp:  Math.round(cw.temperature),
    snow24h:      Math.round(snow24h),
    snow3d:       Math.round(snow3d),
    snow7d:       Math.round(snow7d),
    bluebirdDays: bluebirdDays
  },
  forecast:       forecastArr
};


    return res.json(result);
  } catch (err) {
    console.error('[/api/weather/search] error:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;


