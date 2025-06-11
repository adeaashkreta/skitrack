/* ─────────────────────────────────────────────────────────────
   src/pages/Resorts.jsx   –  final drop-in version
   ──────────────────────────────────────────────────────────── */
import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

/* ── helpers ──────────────────────────────────────────────── */
const toRad = (d) => (d * Math.PI) / 180;
const haversine = (φ1, λ1, φ2, λ2) => {
  const R = 6371;
  const dφ = toRad(φ2 - φ1);
  const dλ = toRad(λ2 - λ1);
  const a =
    Math.sin(dφ / 2) ** 2 +
    Math.cos(toRad(φ1)) * Math.cos(toRad(φ2)) * Math.sin(dλ / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};
const MAX_KM = 400;

/* ── data: featured (unchanged) ───────────────────────────── */
const featuredResorts = [
  {
    id: 1,
    name: 'Val Thorens, France',
    country: 'France',
    lat: 45.297,
    lon: 6.580,
    img: '/images/ValThorens.jpg',
    badge: 'Popular',
    desc:
      "Europe's highest ski resort with breathtaking slopes and vibrant après-ski vibes.",
    rating: 4,
    reviews: 124,
    price: '$199 / night'
  },
  {
    id: 2,
    name: 'Whistler Blackcomb, Canada',
    country: 'Canada',
    lat: 50.113,
    lon: -122.956,
    img: '/images/WhistlerBlackcomb.jpg',
    badge: 'Family-Friendly',
    desc:
      'North America’s largest ski area offering endless snow adventures and charming village life.',
    rating: 4.5,
    reviews: 180,
    price: '$185 / night'
  },
  {
    id: 3,
    name: 'Aspen Snowmass, USA',
    country: 'USA',
    lat: 39.208,
    lon: -106.949,
    img: '/images/AspenSnowmass.jpg',
    badge: 'Luxury',
    desc:
      'Luxury meets legendary skiing. A world-renowned resort with unparalleled style and service.',
    rating: 5,
    reviews: 210,
    price: '$245 / night'
  }
];

/* ── data: nearby incl. Balkan resorts ────────────────────── */
const nearbyResorts = [
  { id: 11, name: 'Kopaonik',   country: 'Serbia',          lat: 43.289, lon: 20.822, img: '/images/ValThorens.jpg',      category: ['family','budget'], desc: 'Largest ski area in Serbia – modern lifts, great for beginners.', price: '€95 / night' },
  { id: 12, name: 'Brezovica',  country: 'Kosovo',          lat: 42.220, lon: 20.999, img: '/images/WhistlerBlackcomb.jpg', category: ['budget'],          desc: 'Untouched back-country feel in the Šar Mountains.',           price: '€70 / night' },
  { id: 13, name: 'Mavrovo',    country: 'North Macedonia', lat: 41.733, lon: 20.764, img: '/images/AspenSnowmass.jpg',   category: ['family'],          desc: 'Friendly resort with tree runs and lake views.',             price: '€80 / night' },
  { id: 14, name: 'Bansko',     country: 'Bulgaria',        lat: 41.838, lon: 23.488, img: '/images/ValThorens.jpg',      category: ['family'],          desc: 'Modern lifts, long season & lively old town.',               price: '€110 / night' },
  { id: 15, name: 'Borovets',   country: 'Bulgaria',        lat: 42.267, lon: 23.605, img: '/images/WhistlerBlackcomb.jpg', category: ['budget','family'], desc: 'Forested pistes on the Rila Mountains, great nightlife.',     price: '€95 / night' },
  { id: 16, name: 'Pamporovo',  country: 'Bulgaria',        lat: 41.650, lon: 24.683, img: '/images/AspenSnowmass.jpg',   category: ['budget'],          desc: 'Sunny slopes perfect for beginners & intermediates.',       price: '€90 / night' },
  /* two demo resorts kept for users elsewhere */
  { id: 21, name: 'Val Thorens',   country: 'France',      lat: 45.297, lon: 6.580,  img: '/images/ValThorens.jpg',    category: ['luxury'],          desc: 'Alpine giant – highest resort in Europe.',                  price: '$199 / night' },
  { id: 22, name: 'Crystal Peaks', country: 'Switzerland', lat: 46.020, lon: 7.749, img: '/images/AspenSnowmass.jpg',  category: ['luxury','family'], desc: 'Five-star spa, Michelin dining & perfectly groomed runs.',  price: '€310 / night' }
];

/* ─────────────────────────────────────────────────────────── */
const ResortsPage = () => {
  const [filter,  setFilter ] = useState('all');
  const [coords,  setCoords ] = useState(null);
  const [country, setCountry] = useState('');
  const [modal,   setModal  ] = useState({ show:false, name:null });

  /* geolocation + reverse-geocode once */
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        setCoords({ lat: coords.latitude, lon: coords.longitude });
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`;
          const { address } = await fetch(url).then(r => r.json());
          if (address?.country) setCountry(address.country);
        } catch {/* ignore network issues */ }
      },
      () => {/* denied */},
      { enableHighAccuracy:true, timeout:8000 }
    );
  }, []);

  /* resort list sorted & distance-filtered */
  const shortlist = useMemo(() => {
    if (!coords) return nearbyResorts;
    return nearbyResorts
      .map(r => ({ ...r, dist: haversine(coords.lat, coords.lon, r.lat, r.lon) }))
      .filter(r =>
        r.country.toLowerCase() === country.toLowerCase() ||
        r.dist <= MAX_KM)
      .sort((a,b) => a.dist - b.dist);
  }, [coords, country]);

  const visible = shortlist.filter(r =>
    filter === 'all' ? true : r.category.includes(filter)
  );

  /* simple reveal animation */
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && e.target.classList.add('show')),
      { threshold:0.15 }
    );
    document.querySelectorAll('#nearby-resorts .reveal')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* modal helpers */
  const open = name => setModal({show:true, name});
  const hide = ()   => setModal({show:false,name:null});

  /* ── render ─────────────────────────────────────────────── */
  return (
    <Layout>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero position-relative">
        <div className="hero-image-container">
          <img src="/images/MountainBackground.jpg" className="hero-img" alt="Snow-covered mountain range"/>
          <div className="hero-gradient"/>
        </div>
        <div className="container hero-content py-5 text-center">
          <h1 className="mb-3">Explore <span className="accent">Top Ski Resorts</span> Worldwide</h1>
          <p className="lead mb-4">From the Alps to Aspen – discover your perfect mountain getaway.</p>
          <a href="#featured-resorts" className="btn btn-primary btn-lg custom-hero-btn">
            <i className="fas fa-skiing me-2"/>Discover Resorts
          </a>
        </div>
      </section>

      {/* ── Featured Resorts ─────────────────────────────── */}
      <section id="featured-resorts" className="section-block bg-white">
        <div className="container">
          <h2 className="text-center mb-5">Featured Resorts</h2>
          <div className="row g-4">
            {featuredResorts.map(r => (
              <div key={r.id} className="col-lg-4 col-md-6">
                <div className="card h-100 hover-lift">
                  <img src={r.img} alt={r.name} className="card-img-top"/>
                  <div className="card-body d-flex flex-column">
                    <span className={`badge mb-2 ${
                      r.badge==='Luxury'          ? 'bg-warning text-dark' :
                      r.badge==='Family-Friendly'? 'bg-info'             :
                                                   'bg-success'}`}>
                      {r.badge}
                    </span>
                    <h5 className="card-title">{r.name}</h5>
                    <p className="card-text">{r.desc}</p>
                    <div className="d-flex align-items-center mb-2">
                      <span className="text-warning me-1">
                        {Array.from({length:5}).map((_,i)=>(
                          <i key={i} className={
                            i<Math.floor(r.rating) ? 'fas fa-star' :
                            i<r.rating            ? 'fas fa-star-half-alt' :
                                                    'far fa-star' }/>
                        ))}
                      </span>
                      <small className="text-muted">({r.reviews} reviews)</small>
                    </div>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="price-tag">{r.price}</span>
                      <button className="btn btn-primary custom-hero-btn" onClick={()=>open(r.name)}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Resorts ───────────────────────────────── */}
      <section id="nearby-resorts-section" className="section-block position-relative">
        {[...Array(3)].map((_,i)=>(
          <span key={i} className="snowflake"><i className="fas fa-snowflake"/></span>
        ))}

        <div className="container">
          <h2 className="text-center mb-1">
            Resorts Near You{country && ` — ${country}`}
          </h2>
          <p className="text-center text-muted mb-4">
            {coords ? 'Filtered by real distance from your position'
                     : 'Enable location services to see the closest resorts'}
          </p>

          {/* filter pills */}
          <div className="d-flex justify-content-center gap-2 flex-wrap mb-4">
            {['all','budget','luxury','family'].map(cat=>(
              <button key={cat}
                className={`btn btn-outline-primary ${filter===cat?'active':''}`}
                onClick={()=>setFilter(cat)}>
                {cat==='all'?'All':cat[0].toUpperCase()+cat.slice(1)}
              </button>
            ))}
          </div>

          {/* resort cards */}
          <div className="row g-4" id="nearby-resorts">
            {visible.map(r=>(
              <div key={r.id} className="col-lg-4 col-md-6 resort-item reveal">
                <div className="card border-0 shadow-sm hover-lift h-100">
                  <div className="ratio ratio-4x3">
                    <img src={r.img} alt={r.name} className="card-img-top rounded-top" loading="lazy"/>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{r.name}</h5>
                    <p className="card-text small text-muted">{r.desc}</p>
                    {coords && <p className="small text-muted mb-1">{r.dist.toFixed(0)} km away</p>}
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fw-semibold">{r.price}</span>
                      <button className="btn btn-outline-primary btn-sm" onClick={()=>open(r.name)}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!visible.length && <p className="text-center text-muted">No resorts match this filter.</p>}
          </div>
        </div>
      </section>

      {/* why-choose + back-to-top unchanged */}
      <WhyChoose/>
      <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
        className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
        title="Go to top"><i className="fa fa-chevron-up"/></button>

      {/* booking modal */}
      {modal.show && <BookingModal show={modal.show} onClose={hide} resortName={modal.name}/> }
    </Layout>
  );
};

/* ── Why-Choose section pulled out for brevity -------------- */
const WhyChoose = () => (
  <section className="section-block bg-white why-choose-us-section">
    <div className="container text-center">
      <h2 className="mb-5">Why Choose Ski Track?</h2>
      <div className="row g-4">
        {[
          ['fas fa-mountain','Curated Resorts','Only the highest-rated ski destinations, personally selected for unforgettable trips.'],
          ['fas fa-tags','Best Price Guarantee','You’ll always get the best rate – and if not, we’ll match it. Zero stress.'],
          ['fas fa-headset','24/7 Expert Support','From last-minute plans to emergency questions — our team is always on call.']
        ].map(([icon,title,desc],i)=>(
          <div key={i} className="col-md-4">
            <div className="p-4 rounded hover-lift h-100">
              <div className="icon-circle mx-auto mb-3"><i className={`${icon} fa-2x`}/></div>
              <h5 className="fw-semibold">{title}</h5>
              <p className="text-muted">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ResortsPage;
