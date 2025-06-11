// src/pages/Index.jsx
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

/* ------------------------------------------------------------------ */
/*  PROMO CARDS shown in “Worldwide – Best Ski Resorts”                */
/* ------------------------------------------------------------------ */
const resorts = [
  { name: 'Val Thorens',        country: 'France',       lifts: 32, snow: 'Powder',    price: '€75 / day',  rating: '4.8', image: '/images/france.webp'        },
  { name: 'Zermatt',            country: 'Switzerland',  lifts: 52, snow: 'Excellent', price: '€92 / day',  rating: '4.9', image: '/images/Switzerland1.jpg'  },
  { name: 'Aspen Snowmass',     country: 'USA',          lifts: 41, snow: 'Fresh',     price: '€180 / day', rating: '4.7', image: '/images/aspen-snowmass.jpeg'},
  { name: "Cortina d'Ampezzo",  country: 'Italy',        lifts: 34, snow: 'Packed',    price: '€88 / day',  rating: '4.6', image: '/images/Cortina_Ski.jpg'   }
];

export default function IndexPage() {
  /* -----------------------------  SEARCH STATE ----------------------------- */
  const [query,   setQuery]   = useState('');
  const [status,  setStatus]  = useState('');
  const [loading, setLoading] = useState(false);

  /* ------------------  ONE-TIME fetch of highlights & picks --------------- */
  useEffect(() => {
    /* --- highlights --- */
    fetch('http://localhost:3000/api/weather/highlights')
      .then(r => r.json())
      .then(d => {
        document.getElementById('coldest' ).textContent = `❄️ Coldest:  ${d.coldest.name} – ${d.coldest.temp}°C`;
        document.getElementById('windiest').textContent = `💨 Windiest: ${d.windiest.name} – ${d.windiest.wind} km/h`;
        document.getElementById('sunniest').textContent = `🌞 Sunniest: ${d.sunniest.name} – ${d.sunniest.temp}°C`;
      })
      .catch(() => { /* keep “Loading…” text */ });

    /* --- weekly top picks --- */
    fetch('http://localhost:3000/api/weather/picks')
      .then(r => r.json())
      .then(arr => {
        const ul = document.getElementById('top-picks-list');
        ul.innerHTML = '';
        arr.forEach(p => {
          const li = document.createElement('li');
          li.textContent = `⛷️ ${p.name} – ${p.condition}`;
          ul.appendChild(li);
        });
      })
      .catch(() => {
        document.getElementById('top-picks-list').innerHTML =
          '<li>Unable to load top picks.</li>';
      });
  }, []);

  /* ----------------------------  SEARCH HANDLER --------------------------- */
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setStatus('Searching…');

    try {
      const res = await fetch(
        `http://localhost:3000/api/weather/search?resort=${encodeURIComponent(query.trim())}`
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Resort not found.');
      }

      const data = await res.json();
      setStatus(
        `${data.name}: ${data.weather.currentTemp}°C, ` +
        `${data.slope.quality} snow, ${data.slope.runsOpen} runs open`
      );
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================================= */
  /*                                 RENDER                                  */
  /* ======================================================================= */
  return (
    <Layout>
      {/* =============================== HERO =============================== */}
      <section className="hero position-relative">
        <div className="hero-image-container">
          <img src="/images/MountainBackground.jpg" alt="Ski Mountain" className="hero-img" />
          <div className="hero-gradient" />
        </div>

        <div className="container hero-content py-5">
          <h1>
            Find the Best <span className="accent">Ski Resorts</span> Near You
          </h1>
          <p>
            Search by resort name or let us auto-detect your location to discover
            top destinations and live conditions.
          </p>

          {/* -------- SEARCH BAR -------- */}
          <form onSubmit={handleSearch} className="searchbar input-group mb-3">
            <input
              id="locationInput"
              type="text"
              className="form-control"
              placeholder="Enter resort name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="btn btn-primary">
              {loading
                ? <span className="spinner-border spinner-border-sm" />
                : <><i className="fa fa-search me-1" />Search</>}
            </button>

            <button
              type="button"
              className="detect-btn btn btn-outline-secondary"
              title="Auto-detect coming soon"
            >
              📍 Auto-detect
            </button>
          </form>

          <div id="heroResult" className="hero-result">{status}</div>
        </div>
      </section>

      {/* ========================== ACTIVITIES ============================= */}
      <section className="section activities-section section-block">
        <div className="container">
          <h2>Explore Activities</h2>
          <div className="row activity-cards g-3">
            {[
              { link: '/Snowboarding', icon: 'fas fa-snowboarding me-2', label: 'Snowboarding' },
              { link: '/SkiLessons',   icon: 'fas fa-person-skiing me-2', label: 'Ski Lessons'  },
              { link: '/FamilyFun',    icon: 'fas fa-children',           label: 'Family Fun'   },
              { link: '/ApresSki',     icon: 'fas fa-champagne-glasses',  label: 'Après Ski'    },
              { link: '/EventPage',    icon: 'fas fa-calendar-star',      label: 'Events'       }
            ].map(({ link, icon, label }) => (
              <div key={label} className="col-6 col-md-2 activity-card">
                <a href={link} className="d-flex align-items-center justify-content-center text-decoration-none text-dark w-100 h-100">
                  <span><i className={icon}></i> {label}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== TOP RESORTS ============================ */}
      <section className="section top-resorts-section section-block">
        <div className="container">
          <h2 className="text-center mb-5"><strong>Worldwide: Best Ski Resorts</strong></h2>
          <div className="row justify-content-center">
            {resorts.map((r, i) => (
              <div key={i} className="col-12 col-sm-6 col-md-3 mb-4 d-flex">
                <div className="resort-card">
                  <div className="resort-card-image">
                    <img src={r.image} alt={r.name} className="img-fluid" />
                  </div>
                  <div className="resort-card-body">
                    <h5 className="resort-title">{r.name}</h5>
                    <p className="resort-meta">{r.country} | Lifts: {r.lifts}</p>
                    <p className="resort-meta">Snow: {r.snow} | {r.price}</p>
                    <p className="resort-rating">
                      <i className="fas fa-star text-warning me-1" />{r.rating}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== WEATHER SIDEBAR ========================= */}
      <section className="section weather-section section-block">
        <div className="container weather-container">
          <h2>Current Mountain Weather</h2>
          <div className="weather-layout">
            <div className="weather-map-container">
              <img src="/images/europe-map.png" className="weather-map" alt="Europe map" />
            </div>

            <div className="sidebar-wrapper">
              <div className="weather-sidebar">
                <h3>Today's Highlights</h3>
                <ul>
                  <li id="coldest">❄️ Coldest: Loading…</li>
                  <li id="windiest">💨 Windiest: Loading…</li>
                  <li id="sunniest">🌞 Sunniest: Loading…</li>
                </ul>
              </div>

              <div className="weather-sidebar secondary">
                <h3>Our Top Picks for the Week</h3>
                <ul id="top-picks-list">
                  <li>⛷️ Loading top picks…</li>
                  <li>🏔️ Loading top picks…</li>
                  <li>🎿 Loading top picks…</li>
                  <li>🏔️ Loading top picks…</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================== TESTIMONIALS =========================== */}
      <section className="section testimonials-section">
        <h2 className="section-heading">What Our Users Say</h2>
        <div className="testimonials-grid">
          {[
            { img: '/images/user1.jpg', quote: 'Found the perfect resort with fresh snow thanks to Ski Track!', author: '– John, Austria'      },
            { img: '/images/user2.jpg', quote: 'Weather updates helped me plan a great family trip.',               author: '– Maria, Switzerland'},
            { img: '/images/user3.jpg', quote: 'Best platform for ski lovers, with trending news and resort info!', author: '– Luca, Italy'       }
          ].map((t,i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-avatar"><img src={t.img} alt="" /></div>
              <p className="testimonial-quote">“{t.quote}”</p>
              <p className="testimonial-author">{t.author}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
