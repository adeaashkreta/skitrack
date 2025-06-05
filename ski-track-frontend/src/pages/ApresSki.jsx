import React from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';
const ApresSki = () => {
  return (
    <Layout>
      <section className="apres-wrapper">
        <div className="container">
          <div className="apres-header">
            <h1>Unwind, Connect & Celebrate</h1>
            <p className="text-muted">
              Après ski isn't just about drinks - it's the soul of your winter escape.
            </p>
          </div>

          {/* Lounge & Chill Zones */}
          <div className="apres-grid">
            <div id="loungeSlider" className="carousel slide" data-bs-ride="carousel" style={{ maxWidth: '100%' }}>
              <div className="carousel-inner rounded shadow">
                <div className="carousel-item active">
                  <img src="/images/SkiParties3.jpg" className="d-block w-100 apres-img" alt="Lounge 1" />
                </div>
                <div className="carousel-item">
                  <img src="/images/Kirkwood-Resort-Lifestyle.jpg" className="d-block w-100 apres-img" alt="Lounge 2" />
                </div>
                <div className="carousel-item">
                  <img src="/images/1roundhouse-apres-ski-pc-sun-valley-resort-1200x900.jpg" className="d-block w-100 apres-img" alt="Lounge 3" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#loungeSlider" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#loungeSlider" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>

            <div className="apres-text">
              <h3>Lounge & Chill Zones</h3>
              <p>
                Experience the full spirit of après ski — from sharing fondue and craft drinks with friends,
                to dancing in snow-covered parties, and ending the evening with family by the fire.
                Our alpine lounges offer a warm escape wrapped in soft lights, cozy blankets, and relaxing music that melts away the cold.
                Whether you're laughing with old friends over mulled wine, meeting new people near a firepit, or just watching the snow
                fall from a window seat with hot cocoa in hand, these moments turn into memories.
                Après ski isn't just an activity, it's the atmosphere that completes the day.
              </p>
            </div>
          </div>

          {/* Art Nights & Acoustic Sessions */}
          <div className="apres-grid mt-5">
            <div className="apres-text">
              <h3>Art Nights & Acoustic Sessions</h3>
              <p>
                Discover a different side of après ski with our intimate Art Nights and live acoustic evenings.
                Unwind after a day on the slopes with a glass of fine wine in hand while painting with others in our cozy, candle-lit lounge.
                Let local mountain musicians fill the air with gentle melodies as you connect, create, and relax in a warm alpine atmosphere.
                Whether you're an artist, a listener, or simply someone seeking soulful moments, these sessions promise serenity and inspiration
                under snowy skies.
              </p>
            </div>

            <div id="artSlider" className="carousel slide" data-bs-ride="carousel" style={{ maxWidth: '100%' }}>
              <div className="carousel-inner rounded shadow">
                <div className="carousel-item active">
                  <img src="/images/AcousticSession4.jpg" className="d-block w-100 apres-img" alt="Art Session 1" />
                </div>
                <div className="carousel-item">
                  <img src="/images/AcousticSession2.jpg" className="d-block w-100 apres-img" alt="Art Session 2" />
                </div>
                <div className="carousel-item">
                  <img src="/images/AcousticSession3.jpg" className="d-block w-100 apres-img" alt="Art Session 3" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#artSlider" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#artSlider" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>
          </div>

          {/* Highlight Box */}
          <div className="highlight-box mt-5">
            <h5><i className="fas fa-star text-warning me-2"></i>Special Moment:</h5>
            <p>
              Each Friday, we host a candle-lit snow walk under the stars followed by hot chocolate storytelling around the bonfire. A magical family-friendly experience!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ApresSki;
