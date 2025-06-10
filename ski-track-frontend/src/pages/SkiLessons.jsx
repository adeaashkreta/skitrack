import React from 'react';
import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';

const SkiLessons = () => {
  // 🔑 Krijo funksionin handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 📥 Merr të dhënat nga input fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const skillLevel = document.getElementById('level').value;

    try {
      // 📡 Dërgo kërkesën te backend-i

      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, skillLevel })
      });

      if (response.ok) {
        alert('Registration successful!');
        // 🔄 Pastro formën
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('level').value = 'beginner';
      } else {
        const data = await response.json();
        alert(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  // 🔥 Pjesa tjetër e komponentit mbetet e njëjtë
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="hero-section text-white text-center position-relative"
        style={{
          background: "url('/images/SkiLessons2.jpg') center/cover no-repeat",
          padding: '90px 0'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1
          }}
        ></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold">Learn to Ski with the Best</h1>
          <p className="lead">Beginner or pro - we've got the perfect lesson for you.</p>
          <a href="#register" className="btn btn-secondary btn-lg mt-3">
            Join a Lesson
          </a>
        </div>
      </section>

      {/* Course Levels */}
      {/* ... (e njëjta pjesë si më parë) */}

      {/* Register Call to Action */}
      <section className="py-5" id="register">
        <div className="container">
          <h2 className="text-center mb-4">Ready to Hit the Slopes?</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form
                className="p-4 bg-light shadow rounded"
                onSubmit={handleSubmit}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="level" className="form-label">
                    Skill Level
                  </label>
                  <select id="level" className="form-select" defaultValue="beginner">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-secondary w-100">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top */}
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

export default SkiLessons;
