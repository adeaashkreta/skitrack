import React from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const Events = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="hero-banner position-relative text-white d-flex align-items-center"
        style={{
          background: `url('/images/event2.jpg') center center/cover no-repeat`,
          backgroundBlendMode: 'overlay'
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: 'rgba(0, 0, 0, 0.55)', zIndex: 1 }}
        ></div>
        <div
          className="container text-center position-relative"
          style={{ zIndex: 2 }}
        >
          <h1
            className="display-4 fw-bold"
            style={{
              textShadow: '2px 2px 6px rgba(0,0,0,0.8)'
            }}
          >
            Find Your Next Adventure
          </h1>
          <p
            className="lead"
            style={{
              textShadow: '1px 1px 5px rgba(0,0,0,0.7)'
            }}
          >
            Plan, book, and enjoy unforgettable events on and off the slopes
          </p>
        </div>
      </section>

      {/* Search Filter */}
      <div className="container event-search">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search for events..."
            />
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option defaultValue>Choose Resort</option>
              <option>Alpine Peak</option>
              <option>Snow Haven</option>
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option defaultValue>Date</option>
              <option>This Weekend</option>
              <option>Next Week</option>
            </select>
          </div>
        </div>
      </div>

      {/* Event Cards */}
      <div className="container py-5">
        <div className="row g-4">
          {[
            {
              title: 'Sunset DJ Session',
              desc:
                'Dance under the pink skies at our main slope arena. Music by guest DJ Arda Nova.',
              img: '/images/DjSunset.png',
              price: 'FREE'
            },
            {
              title: 'Snow Yoga & Brunch',
              desc:
                'Start your day balanced with mountaintop yoga and a healthy brunch with views.',
              img: '/images/snow-yoga.jpg',
              price: '$10'
            },
            {
              title: 'Torchlight Descent',
              desc:
                'Join our glowing downhill parade and ski under the stars with torches and music.',
              img: '/images/TorchlightDescent.jpg',
              price: '$5'
            },{
              title: 'Ice Sculpting Workshop',
              desc:
                'Learn the basics of ice sculpting from talented local artists and create your own stunning, unique piece.',
              img: '/images/icesculpting.jpg',
              price: '$15'
            },{
              title: 'Ski Tricks & Tips Workshop',
              desc:
                'An interactive session with professional instructors covering advanced skiing techniques and new tricks.',
              img: '/images/skitricks.jpg',
              price: '$12'
            },{
              title: 'Stargazing & Mulled Wine',
              desc:
                'Spend a magical evening under the stars with a professional astronomer and warm spiced wine.',
              img: '/images/stargazing.jpg',
              price: '$10'
            }
          ].map((event, index) => (
            <div className="col-md-4" key={index}>
              <div className="card event-card">
                <div className="position-relative">
                  <img
                    src={event.img}
                    className="card-img-top"
                    alt={event.title}
                  />
                  <span className="price-tag">{event.price}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text">{event.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
        id="backToTopBtn"
        title="Go to top"
      >
        <i className="fa fa-chevron-up"></i>
      </button>

      {/* Inline CSS Styles */}
      <style>{`
        body {
          background: #f4f6fa;
          font-family: 'Segoe UI', sans-serif;
        }
        .hero-banner {
          background: linear-gradient(120deg, #003366, #0059b3);
          color: white;
          padding: 60px 0;
          text-align: center;
        }
        .hero-banner h1 {
          font-size: 2.5rem;
          font-weight: 700;
        }
        .event-search {
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-radius: 12px;
          padding: 30px;
          margin-top: -50px;
          z-index: 10;
          position: relative;
        }
        .event-card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          transition: 0.3s;
        }
        .event-card:hover {
          transform: translateY(-5px);
        }
        .event-card img {
          height: 180px;
          object-fit: cover;
        }
        .price-tag {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: #007bff;
          color: white;
          font-size: 0.8rem;
          padding: 4px 10px;
          border-radius: 8px;
        }
      `}</style>
    </Layout>
  );
};

export default Events;
