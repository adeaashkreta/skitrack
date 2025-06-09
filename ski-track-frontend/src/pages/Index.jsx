import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const resorts = [
  {
    name: "Val Thorens",
    country: "France",
    lifts: 32,
    snow: "Powder",
    price: "€75 / day",
    rating: "4.8",
    image: "/images/france.webp",
  },
  {
    name: "Zermatt",
    country: "Switzerland",
    lifts: 52,
    snow: "Excellent",
    price: "€92 / day",
    rating: "4.9",
    image: "/images/Switzerland1.jpg",
  },
  {
    name: "Aspen Snowmass",
    country: "USA",
    lifts: 41,
    snow: "Fresh",
    price: "€180 / day",
    rating: "4.7",
    image: "/images/aspen-snowmass.jpeg",
  },
  {
    name: "Cortina d'Ampezzo",
    country: "Italy",
    lifts: 34,
    snow: "Packed",
    price: "€88 / day",
    rating: "4.6",
    image: "/images/Cortina_Ski.jpg",
  },
];

const IndexPage = () => {
  useEffect(() => {
    // Fetch weather highlights
    fetch('http://localhost:3000/api/weather/highlights')
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('coldest').innerHTML = `❄️ Coldest: ${data.coldest.name} – ${data.coldest.temp}°C`;
        document.getElementById('windiest').innerHTML = `💨 Windiest: ${data.windiest.name} – ${data.windiest.wind} km/h`;
        document.getElementById('sunniest').innerHTML = `🌞 Sunniest: ${data.sunniest.name} – ${data.sunniest.temp}°C`;
      })
      .catch((err) => console.error('Weather fetch error:', err));
      const TopPicksSidebar = () => {
  const picks = [
    { icon: "fas fa-mountain", text: "Loading top picks..." },
    { icon: "fas fa-skiing", text: "Loading top picks..." },
    { icon: "fas fa-snowboarding", text: "Loading top picks..." },
    { icon: "fas fa-mountain", text: "Loading top picks..." },
  ]};

    // Fetch top picks
    fetch('http://localhost:3000/api/weather/picks')
      .then((res) => res.json())
      .then((data) => {
        const picksList = document.getElementById('top-picks-list');
        picksList.innerHTML = '';
        data.forEach((resort) => {
          const item = document.createElement('li');
          item.textContent = `⛷ ${resort.name} – ${resort.condition}`;
          picksList.appendChild(item);
        });
      })
      .catch((err) => {
        console.error('Error loading top picks:', err);
        document.getElementById('top-picks-list').innerHTML = '<li>Unable to load top picks.</li>';
      });
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero position-relative">
        <div className="hero-image-container">
          <img src="/images/MountainBackground.jpg" alt="Ski Mountain" className="hero-img" />
          <div className="hero-gradient"></div>
        </div>
        <div className="container hero-content py-5">
          <h1>
            Find the Best <span className="accent">Ski Resorts</span> Near You
          </h1>
          <p>Search by location or let us auto-detect your position and discover top ski destinations, snow conditions and more!</p>
          <div className="searchbar input-group mb-3">
            <input id="locationInput" type="text" className="form-control" placeholder="Enter your location..." />
            <button className="btn btn-primary">
              <span id="searchIcon">
                <i className="fa fa-search"></i>
              </span>{' '}
              Search
            </button>
            <button className="detect-btn btn btn-outline-secondary">
              <span role="img" aria-label="location">
                📍
              </span>{' '}
              Auto-detect
            </button>
          </div>
          <div id="heroResult" className="hero-result"></div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section activities-section section-block">
        <div className="container">
          <h2>Explore Activities</h2>
          <div className="row activity-cards g-3">
            <div className="col-6 col-md-2 activity-card">
              <a href="/Snowboarding" className="d-flex align-items-center justify-content-center text-decoration-none text-dark w-100 h-100">
                <span>
                  <i className="fas fa-snowboarding me-2"></i> Snowboarding
                </span>
              </a>
            </div>
            <div className="col-6 col-md-2 activity-card">
              <a href="/SkiLessons" className="d-flex align-items-center justify-content-center text-decoration-none text-dark w-100 h-100">
                <span>
                  <i className="fas fa-person-skiing me-2"></i> Ski Lessons
                </span>
              </a>
            </div>
            <div className="col-6 col-md-2 activity-card">
              <a href="/FamilyFun" className="d-flex align-items-center justify-content-center text-decoration-none text-dark w-100 h-100">
                <span>
                  <i className="fas fa-children"></i> Family Fun
                </span>
              </a>
            </div>
            <div className="col-6 col-md-2 activity-card">
              <a href="/ApresSki" className="d-flex align-items-center justify-content-center text-decoration-none text-dark w-100 h-100">
                <span>
                  <i className="fas fa-champagne-glasses"></i> Après Ski
                </span>
              </a>
            </div>
            <div className="col-6 col-md-2 activity-card">
              <a href="/EventPage" className="d-flex align-items-center justify-content-center text-decoration-none text-dark w-100 h-100">
                <span>
                  <i className="fas fa-calendar-star"></i> Events
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Top Resorts Section */}
    <section className="section top-resorts-section section-block">
        <div className="container">
          <h2 className="text-center mb-5">
            <strong>Worldwide: Best Ski Resorts</strong>
          </h2>
          <div className="row justify-content-center">
            {resorts.map((resort, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-3 mb-4 d-flex">
                <div className="resort-card">
                  <div className="resort-card-image">
                    <img
                      src={resort.image}
                      alt={resort.name}
                      className="img-fluid"
                    />
                  </div>
                  <div className="resort-card-body">
                    <h5 className="resort-title">{resort.name}</h5>
                    <p className="resort-meta">
                      {resort.country} | Lifts: {resort.lifts}
                    </p>
                    <p className="resort-meta">
                      Snow: {resort.snow} | {resort.price}
                    </p>
                    <p className="resort-rating">
                      <i className="fas fa-star text-warning me-1"></i>
                      {resort.rating}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section className="section weather-section section-block">
        <div className="container weather-container">
          <h2>Current Mountain Weather</h2>
          <div className="weather-layout">
            <div className="weather-map-container">
              <img src="/images/europe-map.png" className="weather-map" alt="Europe Map" />
            </div>
            <div className="sidebar-wrapper">
              <div className="weather-sidebar">
                <h3>Today's Highlights</h3>
                <ul>
                  <li id="coldest">❄️ Coldest: Loading...</li>
                  <li id="windiest">💨 Windiest: Loading...</li>
                  <li id="sunniest">🌞 Sunniest: Loading...</li>
                </ul>
              </div>
              <div className="weather-sidebar secondary">
                <h3>Our Top Picks for the Week</h3>
                <ul id="top-picks-list">
                  <li>⛷️ Loading top picks...</li>
                  <li>🏔️ Loading top picks...</li>
                  <li>🎿 Loading top picks...</li>
                  <li>🏔️ Loading top picks...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <h2 className="section-heading">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-avatar">
              <img src="/images/user1.jpg" alt="John" />
            </div>
            <p className="testimonial-quote">
              "Found the perfect resort with fresh snow thanks to Ski Track! Very easy to use and up to date."
            </p>
            <p className="testimonial-author">– John, Austria</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">
              <img src="/images/user2.jpg" alt="Maria" />
            </div>
            <p className="testimonial-quote">
              "I loved the weather updates. Helped me plan a great family ski trip."
            </p>
            <p className="testimonial-author">- Maria, Switzerland</p>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-avatar">
              <img src="/images/user3.jpg" alt="Luca" />
            </div>
            <p className="testimonial-quote">
              "Best platform for ski lovers, with trending news and all the details about resorts!"
            </p>
            <p className="testimonial-author">- Luca, Italy</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;
