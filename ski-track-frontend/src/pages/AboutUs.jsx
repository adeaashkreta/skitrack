import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const AboutUs = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      
     

      {/* ABOUT US SECTION */}
      <section className="section-block py-5" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-card">
            <h2 className="section-heading text-center mb-4">Who We Are</h2>
            <p className="text-center mb-5">
              Ski Track is more than just a snow report app—it's your ultimate mountain companion...
            </p>
            <div className="container-fluid px-0"></div>
            <div className="row gx-0 gy-4">
              {[
                {
                  title: 'Our Mission',
                  text: `Our goal is to provide accurate, real-time information across a wide network of ski resorts...`
                },
                {
                  title: 'Our Vision',
                  text: `We envision a global hub for the winter sports community—where anyone, anywhere, can explore and compare resorts...`
                },
                {
                  title: 'What We Offer',
                  text: `Ski Track gives you access to a growing list of resorts, each with detailed profiles that include trail maps, resort amenities...`
                },
                {
                  title: 'Unforgettable Experiences',
                  text: `From thrilling snowboarding sessions to guided ski tours and family-friendly festivals, Ski Track connects you with unforgettable alpine experiences...`
                }
              ].map((item, index) => (
                <div className="col-12 col-md-6 col-lg-3" key={index}  style={{ width: '50%' }} >
                  <h5 >{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="section-block py-5">
        <div className="container">
          <div className="divider">
            <span>Meet the Team</span>
          </div>
          <div className="row gx-4 gy-4">
            {[
              {
                name: 'Alice Johnson',
                role: 'Front-End Developer',
                skills: 'HTML/CSS/JavaScript, UX/UI',
                image:
                  'https://www.lensmen.ie/wp-content/uploads/2015/02/Profile-Portrait-Photographer-in-Dublin-Ireland.-1030x1030.jpg'
              },
              {
                name: 'Bob Smith',
                role: 'Back-End Developer',
                skills: 'Node.js, Express, APIs',
                image:
                  'https://www.lensmen.ie/wp-content/uploads/2015/02/ality-LinkedIn-Photography-in-Dublin-Ireland-1030x1030.jpg'
              },
              {
                name: 'Carol Lee',
                role: 'Project Manager',
                skills: 'Planning & Documentation',
                image:
                  'https://www.lensmen.ie/wp-content/uploads/2015/02/Headshot-Photographer-in-Dublin-Ireland.-1030x1030.jpg'
              },
              {
                name: 'Linda Martinez',
                role: 'QA & DevOps',
                skills: 'Testing & Deployment',
                image:
                  'https://www.lensmen.ie/wp-content/uploads/2015/02/Corporate-Portraiture-in-Dublin-Ireland-1030x1030.jpg'
              }
            ].map((member, index) => (
              <div className="col-sm-6 col-lg-3" key={index}>
                <div className="team-member">
                  <img src={member.image} alt={member.name} />
                  <h5>{member.name}</h5>
                  <p>
                    {member.role}
                    <br />
                    <small className="text-muted">{member.skills}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section className="section-block py-5" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-card">
            <h2 className="section-heading text-center">Technology Stack</h2>
            <div className="row text-center">
              {[
                {
                  icon: 'fab fa-node-js fa-3x text-success mb-2',
                  title: 'Node.js & Express',
                  desc: 'Handles all API requests, data aggregation, and caching.'
                },
                {
                  icon: 'fas fa-snowflake fa-3x text-primary mb-2',
                  title: 'Open-Meteo & Ski APIs',
                  desc: 'Provides real-time weather and slope/lift status data.'
                },
                {
                  icon: 'fab fa-bootstrap fa-3x text-info mb-2',
                  title: 'Bootstrap & Vanilla JS',
                  desc: 'Delivers a responsive, mobile-friendly UI without heavy frameworks.'
                }
              ].map((tech, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <i className={tech.icon}></i>
                  <h5 className="mt-2">{tech.title}</h5>
                  <p>{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
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
        .team-member {
          background: #fefefe;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
          text-align: center;
          padding: 1.5rem;
        }
        .team-member img {
          border-radius: 50%;
          width: 120px;
          height: 120px;
          object-fit: cover;
          margin-bottom: 1rem;
        }
        .team-member h5 {
          margin-top: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .team-member p {
          font-size: 0.9rem;
          color: #555;
        }
        .divider {
          margin: 3rem 0 2rem;
          position: relative;
          text-align: center;
        }
        .divider::before,
        .divider::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 40%;
          height: 1px;
          background: #ddd;
        }
        .divider::before {
          left: 0;
        }
        .divider::after {
          right: 0;
        }
        .divider span {
          background: #fff;
          padding: 0 1rem;
          position: relative;
          font-weight: 600;
          color: var(--accent);
        }
      `}</style>
    </Layout>
  );
};

export default AboutUs;
