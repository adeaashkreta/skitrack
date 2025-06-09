import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";

const featuredResorts = [
  {
    id: 1,
    name: "Val Thorens, France",
    img: "/images/ValThorens.jpg",
    badge: "Popular",
    desc: "Europe's highest ski resort with breathtaking slopes and vibrant après-ski vibes.",
    rating: 4,
    reviews: 124,
    price: "$199/night"
  },
  {
    id: 2,
    name: "Whistler Blackcomb, Canada",
    img: "/images/WhistlerBlackcomb.jpg",
    badge: "Family-Friendly",
    desc: "North America's largest ski area offering endless snow adventures and charming village life.",
    rating: 4.5,
    reviews: 180,
    price: "$185/night"
  },
  {
    id: 3,
    name: "Aspen Snowmass, USA",
    img: "/images/AspenSnowmass.jpg",
    badge: "Luxury",
    desc: "Where luxury meets legendary skiing. A world-renowned resort with unparalleled style and service.",
    rating: 5,
    reviews: 210,
    price: "$245/night"
  }
];

const nearbyResorts = [
  {
    id: 1,
    name: "Snow Haven, Austria",
    img: "/images/ValThorens.jpg",
    category: "budget",
    desc: "Affordable comfort and picturesque slopes for price-conscious travellers.",
    price: "$89/night"
  },
  {
    id: 2,
    name: "Crystal Peaks, Switzerland",
    img: "/images/AspenSnowmass.jpg",
    category: "luxury family",
    desc: "Five-star spa, Michelin dining and perfectly groomed runs for the whole family.",
    price: "€310/night"
  },
  {
    id: 3,
    name: "Glacier Ridge, Italy",
    img: "/images/WhistlerBlackcomb.jpg",
    category: "family budget",
    desc: "Family-friendly slopes, great pizza and wallet-friendly packages.",
    price: "€110/night"
  },
  {
    id: 4,
    name: "Alpine Vista, France",
    img: "/images/AspenSnowmass.jpg",
    category: "luxury",
    desc: "Panoramic views, designer chalets and private gondola access.",
    price: "€280/night"
  },
  {
    id: 5,
    name: "Powder Point, Germany",
    img: "/images/ValThorens.jpg",
    category: "budget family",
    desc: "Rolling powder fields and cozy lodges perfect for families on a budget.",
    price: "€99/night"
  },
  {
    id: 6,
    name: "Summit Lodge, USA",
    img: "/images/WhistlerBlackcomb.jpg",
    category: "luxury",
    desc: "Ski-in / ski-out suites, private guides and après-ski under the stars.",
    price: "$320/night"
  }
];

const ResortsPage = () => {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll("#nearby-resorts .reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero position-relative">
        <div className="hero-image-container">
          <img
            src="/images/MountainBackground.jpg"
            className="hero-img"
            alt="Snow-covered mountain range"
          />
          <div className="hero-gradient"></div>
        </div>
        <div className="container hero-content py-5 text-center">
          <h1 className="mb-3">
            Explore <span className="accent">Top Ski Resorts</span> Worldwide
          </h1>
          <p className="lead mb-4">
            From the Alps to Aspen – discover your perfect mountain getaway.
          </p>
          <a href="#featured-resorts" className="btn btn-primary btn-lg custom-hero-btn">
            <i className="fas fa-skiing me-2"></i>Discover Resorts
          </a>
        </div>
      </section>

      {/* Featured Resorts */}
      <section id="featured-resorts" className="section-block bg-white">
        <div className="container">
          <h2 className="text-center mb-5">Featured Resorts</h2>
          <div className="row g-4">
            {featuredResorts.map((resort) => (
              <div key={resort.id} className="col-lg-4 col-md-6">
                <div className="card h-100">
                  <img
                    src={resort.img}
                    alt={resort.name}
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column">
                    <span
                      className={`badge mb-2 ${
                        resort.badge === "Luxury"
                          ? "bg-warning text-dark"
                          : resort.badge === "Family-Friendly"
                          ? "bg-info"
                          : "bg-success"
                      }`}
                    >
                      {resort.badge}
                    </span>
                    <h5 className="card-title">{resort.name}</h5>
                    <p className="card-text">{resort.desc}</p>
                    <div className="d-flex align-items-center mb-2">
                      <span className="text-warning me-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={
                              i < Math.floor(resort.rating)
                                ? "fas fa-star"
                                : i < resort.rating
                                ? "fas fa-star-half-alt"
                                : "far fa-star"
                            }
                          ></i>
                        ))}
                      </span>
                      <small className="text-muted">
                        ({resort.reviews} reviews)
                      </small>
                    </div>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="price-tag">{resort.price}</span>
                        <button className="btn btn-primary custom-hero-btn">Book Now</button>
                      </div>
                      <div className="d-flex gap-3 mt-2 feature-icons">
                        <i className="fas fa-snowflake"></i>
                        <i className="fas fa-hotel"></i>
                        <i className="fas fa-skiing"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resorts Near You */}
      <section
        id="nearby-resorts-section"
        className="section-block position-relative"
      >
        {/* Snowflakes */}
        <span className="snowflake">
          <i className="fas fa-snowflake"></i>
        </span>
        <span className="snowflake">
          <i className="fas fa-snowflake"></i>
        </span>
        <span className="snowflake">
          <i className="fas fa-snowflake"></i>
        </span>

        <div className="container">
          <h2 className="text-center mb-1">Resorts Near You</h2>
          <p className="text-center text-muted mb-4">
            Based on your region and past searches
          </p>

          {/* Filter Buttons */}
          <div className="d-flex justify-content-center gap-2 flex-wrap mb-4 filter-buttons">
            {["all", "budget", "luxury", "family"].map((cat) => (
              <button
                key={cat}
                className={`btn btn-outline-primary ${
                  filter === cat ? "active" : ""
                }`}
                onClick={() => setFilter(cat)}
              >
                {cat === "all"
                  ? "All"
                  : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Resort Cards */}
          <div className="row g-4" id="nearby-resorts">
            {nearbyResorts
              .filter(
                (resort) =>
                  filter === "all" || resort.category.includes(filter)
              )
              .map((resort) => (
                <div
                  key={resort.id}
                  className="col-lg-4 col-md-6 resort-item reveal"
                >
                  <div className="card border-0 shadow-sm hover-lift h-100">
                    <div className="ratio ratio-4x3">
                      <img
                        src={resort.img}
                        alt={resort.name}
                        className="card-img-top rounded-top"
                        loading="lazy"
                      />
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{resort.name}</h5>
                      <p className="card-text small text-muted">
                        {resort.desc}
                      </p>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="fw-semibold">{resort.price}</span>
                        <button className="btn btn-outline-primary btn-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Why Choose Ski Track */}
      <section className="section-block bg-white why-choose-us-section">
        <div className="container text-center">
          <h2 className="mb-5">Why Choose Ski Track?</h2>
          <div className="row g-4">
            {[
              {
                icon: "fas fa-mountain",
                title: "Curated Resorts",
                desc: "Only the highest-rated ski destinations, personally selected for unforgettable trips."
              },
              {
                icon: "fas fa-tags",
                title: "Best Price Guarantee",
                desc: "You’ll always get the best rate – and if not, we’ll match it. Zero stress."
              },
              {
                icon: "fas fa-headset",
                title: "24/7 Expert Support",
                desc: "From last-minute plans to emergency questions — our team is always on call."
              }
            ].map((item, index) => (
              <div key={index} className="col-md-4">
                <div className="p-4 rounded hover-lift h-100">
                  <div className="icon-circle mx-auto mb-3">
                    <i className={`${item.icon} fa-2x`}></i>
                  </div>
                  <h5 className="fw-semibold">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
        title="Go to top"
      >
        <i className="fa fa-chevron-up"></i>
      </button>
    </Layout>
  );
};

export default ResortsPage;
