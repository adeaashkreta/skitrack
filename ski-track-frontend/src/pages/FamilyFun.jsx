import React from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const FamilyFun = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
     

      {/* Activities */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Family Activities</h2>
        <div className="row g-4">
          {[
            {
              icon: 'fas fa-child',
              title: "Kids' Ski School",
              desc: 'Professional instructors help your little ones learn in a fun & safe way.'
            },
            {
              icon: 'fas fa-sleigh',
              title: 'Sledding Hills',
              desc: 'Enjoy family races or casual slides down our safe snow-covered slopes.'
            },
            {
              icon: 'fas fa-mug-hot',
              title: 'Hot Cocoa Lounge',
              desc: 'Warm up with delicious drinks and snacks after your snowy adventures.'
            },
            {
              icon: 'fas fa-snowman',
              title: 'Snowman Building',
              desc: 'Free snowman kits available at our activity station – get creative!'
            },
            {
              icon: 'fas fa-campground',
              title: 'Family Campfires',
              desc: 'Cozy up by the fire and enjoy marshmallows under the stars.'
            },
            {
              icon: 'fas fa-gamepad',
              title: 'Indoor Game Zone',
              desc: 'Perfect for evening fun with ping pong, foosball, and creative crafts.'
            }
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="fun-card">
                <i className={item.icon}></i>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container my-5">
        <h2 className="text-center mb-4">What Families Are Saying</h2>
        {[
          {
            text: `"My kids absolutely loved the ski school! Safe, fun, and memorable." – Laura, Albania`
          },
          {
            text: `"We’ve never had so much fun together – sledding was a hit!" – Erion, Kosovo`
          },
          {
            text: `"The hot cocoa lounge was our favorite spot every evening!" – Fatmira, Macedonia`
          }
        ].map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <p>{testimonial.text}</p>
          </div>
        ))}
      </section>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
        id="backToTopBtn"
        title="Go to top"
      >
        <i className="fa fa-chevron-up"></i>
      </button>

      {/* Inline Styles */}
      <style>{`
        .hero-family {
          background: url('/images/family-hero.jpg') center/cover no-repeat;
          color: white;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          text-align: center;
        }
        .hero-family::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
        }
        .fun-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
          text-align: center;
        }
        .fun-card:hover {
          transform: translateY(-8px);
        }
        .fun-card i {
          font-size: 2rem;
          color: #007bff;
          margin-bottom: 15px;
        }
        .testimonial {
          background: #f8f9fa;
          border-left: 4px solid #007bff;
          padding: 20px;
          margin-bottom: 20px;
        }
        .testimonial p {
          margin-bottom: 5px;
        }
      `}</style>
    </Layout>
  );
};

export default FamilyFun;
