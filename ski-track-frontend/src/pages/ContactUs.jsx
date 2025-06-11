import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const Contact = () => {
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate success with a timeout
    setTimeout(() => {
      setFormSuccess(true);
      setFormError(false);
      e.target.reset();
    }, 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
            {/* CONTACT INFO & FORM */}
      <section className="section-block py-5" style={{ background: 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-card">
            <div className="row gx-5">
              {/* Left: Contact Information */}
              <div className="col-lg-5 mb-4 mb-lg-0">
                <h2 className="section-heading">Contact Information</h2>
                <div className="contact-info mt-4">
                  <p><i className="fas fa-map-marker-alt"></i>123 Alpine Drive, Mountain Town, CO 80000</p>
                  <p><i className="fas fa-envelope"></i>support@skitrack.com</p>
                  <p><i className="fas fa-phone"></i>+1 (555) 123-4567</p>
                  <p><i className="fas fa-clock"></i>Mon–Fri: 9am – 5pm (MST)</p>
                </div>

                <div className="divider"><span>Follow Us</span></div>
                <div className="d-flex gap-3">
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-dark fs-4">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-dark fs-4">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-dark fs-4">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="col-lg-7">
                <h2 className="section-heading">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="nameInput" placeholder="e.g. Jane Doe" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="emailInput" placeholder="e.g. jane@example.com" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subjectInput" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subjectInput" placeholder="e.g. Feedback on Weather Page" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="messageInput" className="form-label">Message</label>
                    <textarea className="form-control" id="messageInput" rows="5" placeholder="Type your message here..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn-accent">Send Message</button>
                </form>

                {formSuccess && (
                  <div className="alert alert-success mt-3">
                    Thank you! Your message has been sent.
                  </div>
                )}
                {formError && (
                  <div className="alert alert-danger mt-3">
                    Oops! Something went wrong. Please try again later.
                  </div>
                )}
              </div>
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
        .section-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        .contact-info i {
          font-size: 1.5rem;
          color: var(--accent);
          margin-right: 0.75rem;
        }
        .contact-info p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
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

export default Contact;
