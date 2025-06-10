import { Link } from "react-router-dom";
import "../assets/css/dashboard.css";

function Dashboard() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#2a416d", margin: 0, padding: 0 }}
      >
        <div
          className="container-fluid d-flex justify-content-between align-items-center"
          style={{ paddingLeft: "16px", paddingRight: "16px" }}
        >
          <div className="logo d-flex align-items-center">
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="Ski Track Logo"
                className="img-fluid"
                style={{ width: "80px", height: "80px" }}
              />
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                marginLeft: "8px",
              }}
            >
              <span>Ski Track</span>
            </Link>
          </div>

          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse d-flex justify-content-end align-items-center"
            id="navbarNav"
          >
            <ul className="nav-links navbar-nav me-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Resorts">
                  Resorts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Weather">
                  Weather
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>

            <form className="d-flex me-2">
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Search..."
                id="searchInput"
              />
              <button
                className="btn btn-sm btn-outline-light"
                type="submit"
                id="searchIcon"
              >
                <i className="fa fa-search"></i>
              </button>
            </form>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/login"
                  id="profileIcon"
                  title="Profile"
                >
                  <i className="fa fa-user"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="box">
            <div className="box1">
              <Link to="/UserTable" style={{ textDecoration: "none" }}>
                <button className="dashboard-button">VIEW USERS</button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-light py-4">
        <div className="container footer-flex d-flex flex-column flex-md-row justify-content-between align-items-center g-3">
          <span className="footer-left mb-2 mb-md-0">
            © 2024 Ski Track. All rights reserved.
          </span>

          {/* Newsletter Section */}
          <section className="newsletter-section mb-2 mb-md-0 text-center">
            <div className="newsletter-container">
              <h3 className="h6 mb-3 text-center">
                Subscribe to our Ski Track Newsletter
              </h3>
              <form
                className="d-flex justify-content-center flex-wrap"
                onSubmit={handleNewsletterSubmit}
              >
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control no-radius"
                    placeholder="Your email address..."
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-primary no-radius custom-subscribe-btn"
                  >
                    <i className="fas fa-envelope"></i> Subscribe
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Social Icons */}
          <span className="footer-right d-flex gap-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </span>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
        id="backToTopBtn"
        title="Go to top"
      >
        <i className="fa fa-chevron-up"></i>
      </button>
    </>
  );
}

export default Dashboard;