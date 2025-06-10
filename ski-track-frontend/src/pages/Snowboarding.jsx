import Layout from "../components/Layout";
import "../assets/css/bootstrap.css";
import "../assets/css/style.css";

const Snowboarding = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-center"
        style={{
          background: "url('/images/snowboarding-hero.jpg') no-repeat center center/cover",
          height: "15vh",
          position: "relative",
          color: "white"
        }}
      >
        
      </section>

      {/* Track Status */}
      <section className="track-status bg-light py-4 text-center" style={{ marginTop: "-30px" }}>
        <div className="container">
          <h2 className="mb-3">Current Track Status</h2>
          <div className="d-flex justify-content-center gap-4">
            <span>Track 1: Available 🟢</span>
            <span>Track 2: Reserved 🔴</span>
            <span>Track 3: Busy 🟠</span>
          </div>
        </div>
      </section>

      {/* Rental Packages */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Packages</h2>
          <div className="row g-4">
            {/* Package 1 */}
            <div className="col-md-4">
              <div className="card h-100 rental-card shadow-sm">
                <img
                  src="/images/SalomonSnowboardPackage.jpg"
                  className="card-img-top"
                  alt="Salomon Snowboard Package"
                />
                <div className="card-body">
                  <h5 className="card-title">Salomon Snowboard Package</h5>
                  <p className="card-text">
                    <strong>$35</strong> Full Day | <strong>$25</strong> Half Day |{" "}
                    <strong>$250</strong> Seasonal
                  </p>
                  <p className="card-text">Perfect for intermediate riders, includes board + boots.</p>
                </div>
              </div>
            </div>

            {/* Package 2 */}
            <div className="col-md-4">
              <div className="card h-100 rental-card shadow-sm">
                <img
                  src="/images/demoskipackage2.jpg"
                  className="card-img-top"
                  alt="Demo Board Package"
                />
                <div className="card-body">
                  <h5 className="card-title">Salomon Demo Board Package</h5>
                  <p className="card-text">
                    <strong>$80</strong> Full Day | <strong>$60</strong> Board Only
                  </p>
                  <p className="card-text">Test new boards before you buy! Includes demo board and boots.</p>
                </div>
              </div>
            </div>

            {/* Package 3 */}
            <div className="col-md-4">
              <div className="card h-100 rental-card shadow-sm">
                <img
                  src="/images/kidspackage.jpg"
                  className="card-img-top"
                  alt="Kids Snowboard Package"
                />
                <div className="card-body">
                  <h5 className="card-title">Kids Snowboard Package</h5>
                  <p className="card-text">
                    <strong>$23</strong> Full Day | <strong>$18</strong> Half Day
                  </p>
                  <p className="card-text">Tailored equipment for kids, boosting learning and fun!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Child Snowboard Pricing */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Child Snowboard Rates (Ages 12 & Under)</h2>
          <div className="table-responsive">
            <table className="table table-bordered pricing-table">
              <thead className="table-dark">
                <tr>
                  <th>Package</th>
                  <th>After 12 PM</th>
                  <th>Full Day</th>
                  <th>3 Day Rate/Day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Snowboard Package</td>
                  <td>$34</td>
                  <td>$39</td>
                  <td>$34</td>
                </tr>
                <tr>
                  <td>Snowboard Only</td>
                  <td>$26</td>
                  <td>$32</td>
                  <td>$26</td>
                </tr>
                <tr>
                  <td>Boots Only</td>
                  <td>$13</td>
                  <td>$15</td>
                  <td>$13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mid and High Performance Snowboards */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Mid Performance Snowboards (Ages 13+)</h2>
          <div className="table-responsive mb-5">
            <table className="table table-bordered pricing-table">
              <thead className="table-dark">
                <tr>
                  <th>Package</th>
                  <th>After 12 PM</th>
                  <th>Full Day</th>
                  <th>3 Day Rate/Day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Snowboard Package</td>
                  <td>$55</td>
                  <td>$63</td>
                  <td>$55</td>
                </tr>
                <tr>
                  <td>Snowboard Only</td>
                  <td>$43</td>
                  <td>$50</td>
                  <td>$43</td>
                </tr>
                <tr>
                  <td>Boots Only</td>
                  <td>$19</td>
                  <td>$22</td>
                  <td>$19</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-center mb-4">High Performance Snowboards (Ages 13+)</h2>
          <div className="table-responsive">
            <table className="table table-bordered pricing-table">
              <thead className="table-dark">
                <tr>
                  <th>Package</th>
                  <th>After 12 PM</th>
                  <th>Full Day</th>
                  <th>3 Day Rate/Day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Snowboard Package</td>
                  <td>$65</td>
                  <td>$75</td>
                  <td>$65</td>
                </tr>
                <tr>
                  <td>Snowboard Only</td>
                  <td>$57</td>
                  <td>$65</td>
                  <td>$57</td>
                </tr>
                <tr>
                  <td>Boots Only</td>
                  <td>$19</td>
                  <td>$22</td>
                  <td>$19</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Miscellaneous Rentals */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Miscellaneous Rentals</h2>
          <div className="table-responsive">
            <table className="table table-bordered pricing-table">
              <thead className="table-dark">
                <tr>
                  <th>Item</th>
                  <th>Full Day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Pants & Jacket</td>
                  <td>$48</td>
                </tr>
                <tr>
                  <td>Pants</td>
                  <td>$29</td>
                </tr>
                <tr>
                  <td>Jackets</td>
                  <td>$29</td>
                </tr>
                <tr>
                  <td>Helmets</td>
                  <td>$15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Optional Add-ons */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <div className="optional-addons p-4 bg-white rounded shadow-sm">
            <h3 className="mb-3">Optional Add-ons</h3>
            <p className="mb-3">
              <strong>Damage Insurance:</strong> $2/day |{" "}
              <strong>Helmet Rental:</strong> $10/day
            </p>
            <button className="btn btn-primary mt-3">
              Reserve Add-Ons
            </button>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow"
        title="Go to top"
        aria-label="Scroll to top"
      >
        <i className="fa fa-chevron-up"></i>
      </button>
    </Layout>
  );
};

export default Snowboarding;