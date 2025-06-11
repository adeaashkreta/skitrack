// src/pages/Weather.jsx
import { useEffect } from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const Weather = () => {
  /* ────────────────────────────────────────────────────────────
     React effect — fetch resort data & populate the DOM
  ──────────────────────────────────────────────────────────── */
  useEffect(() => {
    /*  tiny DOM helpers  */
    const $  = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    /*  skeleton shimmer toggler  */
    const toggleSkeleton = (on) =>
      $$('.info-card, .forecast-card').forEach((el) =>
        el.classList.toggle('skeleton', on)
      );

    /*  simple reveal-on-scroll  */
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('show'));
      },
      { threshold: 0.15 }
    );

    /*  safe fallback helper  */
    const safe = (v, def) =>
      v === null || v === undefined || v === '' ? def : v;

    /* ----------------------------------------------------------
       Main render()
    ---------------------------------------------------------- */
    const render = async (resort) => {
      if (!resort) return;

      $('#noResultMessage').style.display = 'none';
      toggleSkeleton(true);
      ['resortHeader', 'statusSection', 'forecastSection'].forEach(
        (id) => (document.getElementById(id).style.display = 'none')
      );

      try {
        const res = await fetch(
          `http://localhost:3000/api/weather/search?resort=${encodeURIComponent(
            resort
          )}`
        );

        if (!res.ok) {
          const { error } = await res.json();
          $('#noResultMessage').textContent = error || 'Resort not found.';
          $('#noResultMessage').style.display = 'block';
          return;
        }

        const data = await res.json();

        /* ── Resort header ───────────────────────────── */
        $('#resortName').textContent = data.name;
        $('#resortRating').innerHTML =
          data.rating != null
            ? `${data.rating} <i class="fas fa-star text-warning"></i>`
            : '';

        if (data.recommendation) {
          $('#recommendation').textContent = data.recommendation;
          $('#recommendation').style.display = 'inline-block';
        } else {
          $('#recommendation').style.display = 'none';
        }

        /* ── Slope & Lifts (with defaults) ───────────── */
        const slope = data.slope ?? {};
        $('#slopeQuality').textContent  = safe(slope.quality, 'Unknown');
        $('#groomedStatus').textContent = `${safe(slope.groomed, 0)}% groomed`;
        $('#groomedBar').style.width    = `${safe(slope.groomed, 0)}%`;
        $('#runsOpen').textContent      = safe(slope.runsOpen,  'N/A');
        $('#liftsOpen').textContent     = safe(slope.liftsOpen, 'N/A');

        /* ── Weather block ───────────────────────────── */
        const w = data.weather ?? {};
        $('#currentTemp').textContent  = `${safe(w.currentTemp, 'N/A')} °C`;
        $('#snow24h').textContent      = `${safe(w.snow24h, 0)} cm`;
        $('#snow3d').textContent       = `${safe(w.snow3d, 0)} cm`;
        $('#snow7d').textContent       = `${safe(w.snow7d, 0)} cm`;
        $('#bluebirdDays').textContent = safe(w.bluebirdDays, 0);

        /* ── 7-Day Forecast ──────────────────────────── */
        const grid = $('#forecastGrid');
        grid.innerHTML = '';
        (data.forecast || []).forEach((f, i) => {
          const col = document.createElement('div');
          col.className = 'col-6 col-md-4 col-lg-2 reveal';
          col.innerHTML = `
            <div class="info-card forecast-card p-3 text-center">
              <div class="fw-semibold mb-1">${safe(f.day, '')}</div>
              <div class="display-6">${safe(f.icon, '❓')}</div>
              <small class="text-muted">${safe(f.lo, '?')} / ${safe(
            f.hi,
            '?'
          )} °C</small>
            </div>`;
          grid.appendChild(col);
        });

        /* ── Show sections & attach reveals ──────────── */
        ['resortHeader', 'statusSection', 'forecastSection'].forEach(
          (id) => (document.getElementById(id).style.display = 'block')
        );
        revealObs.disconnect();
        $$('.reveal').forEach((el) => revealObs.observe(el));
      } catch (err) {
        console.error(err);
        alert('Unable to load resort data.');
      } finally {
        toggleSkeleton(false);
      }
    };

    /*  search form handler + initial load  */
    $('#searchForm').addEventListener('submit', (e) => {
      e.preventDefault();
      render($('#resortInput').value.trim());
    });
    $('#year').textContent = new Date().getFullYear();
    render('Zermatt');

    return () => revealObs.disconnect();
  }, []);

  /* ────────────────────────────────────────────────────────────
     Full Mark-up
  ──────────────────────────────────────────────────────────── */
  return (
    <Layout>
      {/* HERO SECTION */}
      <header className="hero position-relative">
        <div className="hero-image-container">
          <img
            src="/images/MountainBackground.jpg"
            className="hero-img"
            alt="Fresh powder on alpine peaks"
            loading="lazy"
          />
          <div className="hero-gradient"></div>
        </div>

        <div className="container hero-content d-flex flex-column justify-content-center align-items-center text-white text-center">
          <div className="hero-copy mb-3">
            <h1 className="mb-3">Know Before You Go</h1>
            <p>
              Real-time snow depth, slope status &amp; 7-day forecasts for
              resorts worldwide.
            </p>
          </div>

          {/* search bar */}
          <form
            id="searchForm"
            className="hero-cta d-flex flex-wrap gap-2 justify-content-center"
          >
            <input
              id="resortInput"
              className="form-control form-control-lg"
              style={{ minWidth: '240px' }}
              placeholder="Search resort (e.g. Zermatt)"
              required
            />
            <button id="searchBtn" className="btn btn-accent btn-lg">
              <i className="fas fa-search"></i>&nbsp;Search
            </button>
          </form>
        </div>

        <span className="scroll-arrow">
          <i className="fa-solid fa-angle-down"></i>
        </span>
      </header>

      {/* WAVY DIVIDER */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 40">
          <path d="M0,20L60,26C120,32,240,44,360,42C480,40,600,24,720,24C840,24,960,40,1080,40C1200,40,1320,24,1380,18L1440,12V40H0Z" />
        </svg>
      </div>

      {/* “No result” message */}
      <div
        id="noResultMessage"
        className="text-center text-danger mt-4"
        style={{ display: 'none' }}
      ></div>

      {/* RESORT HEADER CARD */}
      <section id="resortHeader" className="section-block" style={{ display: 'none' }}>
        <div className="container">
          <div className="section-card py-3 px-4">
            <div
              id="headerFlex"
              className="d-flex flex-column flex-md-row justify-content-between align-items-center"
            >
              <div id="resortBlock" className="text-center flex-grow-1">
                <h2 id="resortName" className="fw-bold mb-1"></h2>
                <div
                  id="ratingRow"
                  className="d-flex justify-content-center align-items-center flex-wrap"
                >
                  <div id="resortRating" className="fs-5"></div>
                  <span
                    id="recommendation"
                    className="badge bg-success"
                    style={{ display: 'none' }}
                  ></span>
                </div>
              </div>

              <button className="btn btn-outline-accent mt-3 mt-md-0">
                <i className="fas fa-ticket-alt me-1"></i>Book&nbsp;Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 40">
          <path d="M0,28L60,34C120,40,240,52,360,48C480,44,600,28,720,28C840,28,960,44,1080,44C1200,44,1320,28,1380,22L1440,18V40H0Z" />
        </svg>
      </div>

      {/* STATUS + WEATHER CARDS */}
      <section
        id="statusSection"
        className="section-block bg-light"
        style={{ display: 'none' }}
      >
        <div className="container">
          <div className="row g-3">
            {/* Slope & Lifts */}
            <div className="col-lg-6 reveal">
              <div className="section-card h-100">
                <div className="section-heading text-center">Slope &amp; Lifts</div>
                <div className="row stats-grid" id="slopeGrid">
                  <div className="col-6">
                    <div className="info-card p-3 text-center">
                      <i className="fas fa-mountain text-primary mb-1"></i>
                      <span id="slopeQuality" className="fw-semibold"></span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-card p-3 text-center">
                      <i className="fas fa-skiing text-info mb-1"></i>
                      <span id="groomedStatus" className="fw-semibold"></span>
                      <div className="progress mt-1">
                        <div id="groomedBar" className="progress-bar" role="progressbar"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-card p-3 text-center">
                      <i className="fas fa-route text-success mb-1"></i>
                      <span id="runsOpen" className="fw-semibold"></span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="info-card p-3 text-center">
                      <i className="fas fa-chairlift text-warning mb-1"></i>
                      <span id="liftsOpen" className="fw-semibold"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather & Snow */}
            <div className="col-lg-6 reveal">
              <div className="section-card h-100">
                <div className="section-heading text-center">Weather &amp; Snow</div>
                <div className="row stats-grid" id="statsGrid">
                  <div className="col-6 col-md-4">
                    <div className="info-card p-3 text-center">
                      <span className="display-6">🌡</span>
                      <span id="currentTemp" className="fw-semibold ms-1"></span>
                      <small className="text-muted d-block">Current</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="info-card p-3 text-center">
                      <span className="display-6">❄️</span>
                      <span id="snow24h" className="fw-semibold ms-1"></span>
                      <small className="text-muted d-block">24 h</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <div className="info-card p-3 text-center">
                      <span className="display-6">🗓</span>
                      <span id="snow3d" className="fw-semibold ms-1"></span>
                      <small className="text-muted d-block">3 d</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="info-card p-3 text-center">
                      <span className="display-6">📅</span>
                      <span id="snow7d" className="fw-semibold ms-1"></span>
                      <small className="text-muted d-block">7 d</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-6">
                    <div className="info-card p-3 text-center">
                      <span className="display-6">☀️</span>
                      <span id="bluebirdDays" className="fw-semibold ms-1"></span>
                      <small className="text-muted d-block">Blue-bird</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WAVE */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 40">
          <path d="M0,20L60,26C120,32,240,44,360,42C480,40,600,24,720,24C840,24,960,40,1080,40C1200,40,1320,24,1380,18L1440,12V40H0Z" />
        </svg>
      </div>

      {/* 7-DAY FORECAST */}
      <section
        id="forecastSection"
        className="section-block"
        style={{ display: 'none' }}
      >
        <div className="container">
          <div className="section-card">
            <div className="section-heading text-center">7-Day Forecast</div>
            <div className="row stats-grid" id="forecastGrid"></div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div id="ctaBar" className="show">
        <span className="me-2 fw-semibold">Ready for the slopes?</span>
        <a href="#" className="btn btn-primary btn-sm">
          Plan your trip
        </a>
      </div>

      {/* FOOTER (extra footer specific to Weather page) */}
      <footer className="footer bg-dark text-light py-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <span>
            ©&nbsp;
            <span id="year"></span>&nbsp;Ski Track
          </span>
          <div className="d-flex gap-3">
            <a href="#" className="text-light">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-light">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-light">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Weather;
