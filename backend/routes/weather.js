// ─────────────────────────────────────────────────────────────────────────────
// backend/routes/weather.js
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const axios   = require("axios");
const router  = express.Router();
require("dotenv").config(); // Loads SLOPE_API_KEY from .env (if you use it)

//
// ───── In‐Memory Cache for Open‐Meteo Calls (to avoid hammering the API) ─────
//
const wxCache = {};
const TTL     = 10 * 60 * 1000; // 10 minutes

/**
 * cached(key, fn)  
 *   If the “key” is in wxCache and is fresh, returns it.  
 *   Otherwise, calls fn() (which returns a Promise), stores it, and returns the Promise.
 */
const cached = (key, fn) => {
  const hit = wxCache[key];
  if (hit && Date.now() - hit.ts < TTL) {
    return Promise.resolve(hit.val);
  }
  return fn().then((val) => {
    wxCache[key] = { val, ts: Date.now() };
    return val;
  });
};

//
// ───── Load the entire list of resorts from data/resorts.json ─────
//
const allResorts = require("../data/resorts.json"); // Array of { id, name, lat, lon, price, rating, description, image }

//
// ───── Existing route: GET /api/weather/search?resort=<name> ─────
//   (You already have this; we keep it here exactly as is.)
//
router.get("/search", async (req, res) => {
  try {
    const { resort } = req.query;
    if (!resort) {
      return res
        .status(400)
        .json({ error: 'Missing "resort" query parameter.' });
    }

    // Find the first resort whose name starts with the query (case‐insensitive)
    const resortObj = allResorts.find((r) =>
      r.name.toLowerCase().startsWith(resort.toLowerCase())
    );
    if (!resortObj) {
      return res.status(404).json({ error: `Resort "${resort}" not found.` });
    }

    // Build an Open‐Meteo 7‐day forecast URL for this resort’s coordinates:
    const today     = new Date();
    const endDate   = new Date();
    endDate.setDate(today.getDate() + 6);
    const isoToday  = today.toISOString().slice(0, 10);
    const isoEnd    = endDate.toISOString().slice(0, 10);

    const forecastUrl =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${resortObj.lat}&longitude=${resortObj.lon}` +
      `&daily=weathercode,temperature_2m_max,temperature_2m_min` +
      `&start_date=${isoToday}&end_date=${isoEnd}` +
      `&timezone=UTC`;

    // Use caching so we don’t call the API on every request
    const forecastRes = await cached(
      `forecast_${resortObj.id}_${isoToday}_${isoEnd}`,
      () => axios.get(forecastUrl).then((r) => r.data)
    );

    // Build a simpler array to send back
    const daily = forecastRes.daily;
    function weatherCodeToIcon(code) {
      if (code === 0)                return "☀️";
      if (code === 1 || code === 2)  return "🌤";
      if (code === 3)                return "☁️";
      if ([45, 48].includes(code))   return "🌫";
      if ([51,53,55,56,57].includes(code)) return "🌦";
      if ([61,63,65,66,67].includes(code)) return "🌧";
      if ([71,73,75,77].includes(code))    return "🌨";
      if ([80,81,82].includes(code))       return "⛈";
      if ([85,86].includes(code))          return "❄️";
      if ([95,96,99].includes(code))       return "🌩";
      return "❔";
    }

    const forecastArr = daily.time.map((dateStr, idx) => {
      const dateObj = new Date(dateStr);
      const weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      const dayName = weekdayNames[dateObj.getUTCDay()];
      return {
        day:       dayName,
        date:      dateStr,
        icon:      weatherCodeToIcon(daily.weathercode[idx]),
        maxTemp:   daily.temperature_2m_max[idx],
        minTemp:   daily.temperature_2m_min[idx],
      };
    });

    const result = {
      resort:   resortObj.name,
      location: `${resortObj.name} (${resortObj.lat},${resortObj.lon})`,
      forecast: forecastArr,
    };
    return res.json(result);
  } catch (err) {
    console.error("[/api/weather/search] error:", err.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

//
// ───── NEW ROUTE: GET /api/weather/highlights ─────
//   “Today’s Highlights” means: among all resorts, find which has the
//   coldest current temperature, which has the highest windspeed, and
//   which has the highest temperature (sunniest) for today’s current weather.
//
//   We’ll fetch each resort’s current weather via Open‐Meteo’s “current_weather”
//   endpoint. We wrap each call in `cached(...)` so that, for a 10‐minute window,
//   we don’t hammer the external API for each resort on every request.
//
//   The response is a JSON object with three properties:
//     {
//       coldest: { name, location, temperature },
//       windiest: { name, location, windspeed },
//       sunniest: { name, location, temperature }
//     }
//
// ─────────────────────────────────────────────────────────────────────────────
// Modified “Today’s Highlights” route: GET /api/weather/highlights
// ─────────────────────────────────────────────────────────────────────────────

router.get("/highlights", async (req, res) => {
  try {
    // ───────── Choose a small subset of resorts ─────────
    // You can adjust the number (here we take the first 10). If you try allResorts
    // at once, it may become very slow or run into rate limits. We demonstrate with 10.
    const subset = allResorts.slice(0, 10);

    if (subset.length === 0) {
      return res.status(500).json({ error: "No resorts available for highlights." });
    }

    // ───────── Build an array of “current‐weather” Promises ─────────
    // We use Promise.allSettled so that a single failed resort fetch doesn't kill the whole set.
    const weatherPromises = subset.map((r) => {
      const url = `https://api.open-meteo.com/v1/forecast`
                + `?latitude=${r.lat}&longitude=${r.lon}`
                + `&current_weather=true`;

      // Use our cached helper to avoid refetching the same resort within 10 minutes.
      return cached(`current_${r.id}`, () =>
        axios.get(url)
             .then((resp) => ({
               resort:  r,
               current: resp.data.current_weather || { temperature: 0, windspeed: 0 },
             }))
      );
    });

    // ───────── Await all‐settled (some may fail) ─────────
    const settled = await Promise.allSettled(weatherPromises);

    // Extract successful results:
    const results = settled
      .filter((s) => s.status === "fulfilled")
      .map((s) => s.value);

    if (results.length === 0) {
      return res.status(500).json({ error: "Failed to fetch any resort weather." });
    }

    // ───────── Initialize coldest, windiest, sunniest to the first successful result ─────────
    let coldestResolved  = results[0];
    let windiestResolved = results[0];
    let sunniestResolved = results[0];

    // ───────── Loop through each result to find the min/max values ─────────
    results.forEach((entry) => {
      const { resort, current } = entry;
      // Note: current = { temperature, windspeed, winddirection, time }

      // Coldest → smallest temperature
      if (current.temperature < coldestResolved.current.temperature) {
        coldestResolved = entry;
      }
      // Windiest → largest windspeed
      if (current.windspeed > windiestResolved.current.windspeed) {
        windiestResolved = entry;
      }
      // Sunniest → largest temperature
      if (current.temperature > sunniestResolved.current.temperature) {
        sunniestResolved = entry;
      }
    });

    // ───────── Build the JSON to send back ─────────
    const out = {
      coldest: {
        name:        coldestResolved.resort.name,
        location:    coldestResolved.resort.name,
        temperature: coldestResolved.current.temperature,
      },
      windiest: {
        name:      windiestResolved.resort.name,
        location:  windiestResolved.resort.name,
        windspeed: windiestResolved.current.windspeed,
      },
      sunniest: {
        name:        sunniestResolved.resort.name,
        location:    sunniestResolved.resort.name,
        temperature: sunniestResolved.current.temperature,
      },
    };

    return res.json(out);
  } catch (err) {
    console.error("[/api/weather/highlights] error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

//
// ───── NEW ROUTE: GET /api/weather/picks ─────
//   For “Top Picks for the Week,” we’ll choose the resorts with the highest
//   user rating (the “rating” field in resorts.json). We’ll return the top 4
//   resorts sorted by rating, along with the fields the frontend needs
//   (name, image, price, rating).
//
router.get("/picks", (req, res) => {
  try {
    // 1) Parse rating from string to float
    const ranked = allResorts
      .map((r) => ({ ...r, ratingVal: parseFloat(r.rating) || 0 }))
      .sort((a, b) => b.ratingVal - a.ratingVal)
      .slice(0, 4);

    // 2) Build a clean array to send back
    const picks = ranked.map((r) => ({
      name:     r.name,
      image:    r.image,     // e.g. "madonna-di-campiglio-italy.jpg"
      price:    r.price,
      rating:   r.ratingVal,
      location: r.name,      // or r.id, whichever front expects
    }));
    return res.json(picks);
  } catch (err) {
    console.error("[/api/weather/picks] error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
});

//
// ─────────────────────────────────────────────────────────────────────────────
// Export the router so that index.js can do `app.use("/api/weather", weatherRoute)`
// ─────────────────────────────────────────────────────────────────────────────
module.exports = router;
