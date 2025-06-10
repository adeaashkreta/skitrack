import Layout from '../components/Layout';
import '../assets/css/bootstrap.css';
import '../assets/css/style.css';



const SkiLessons = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
            {/* Hero Section */}
      <section
        className="hero-section text-white text-center position-relative"
        style={{
          background: "url('/images/SkiLessons2.jpg') center/cover no-repeat",
          padding: "90px 0"
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1 }}></div>
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-4 fw-bold">Learn to Ski with the Best</h1>
          <p className="lead">Beginner or pro - we've got the perfect lesson for you.</p>
          <a href="#register" className="btn btn-secondary btn-lg mt-3">Join a Lesson</a>
        </div>
      </section>

      {/* Course Levels */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Choose Your Skill Level</h2>
          <div className="row g-4">
            {[
              { icon: "fas fa-person-skiing", title: "Beginner", desc: "New to skiing? Our beginner lessons focus on safety, balance and basic slopes.", color: "text-primary" },
              { icon: "fas fa-person-skiing-nordic", title: "Intermediate", desc: "Build your confidence with parallel turns, speed control and chairlift navigation.", color: "text-success" },
              { icon: "fas fa-mountain", title: "Advanced", desc: "Refine your technique, explore off-piste terrain and tackle challenging runs.", color: "text-danger" }
            ].map((level, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 text-center shadow-sm">
                  <div className="card-body">
                    <i className={`${level.icon} fa-3x ${level.color} mb-3`}></i>
                    <h5 className="card-title">{level.title}</h5>
                    <p>{level.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Ski Track Lessons?</h2>
          <div className="row text-center g-4">
            {[
              { icon: "fas fa-user-shield", title: "Certified Instructors", desc: "All our instructors are internationally certified and experienced.", color: "text-primary" },
              { icon: "fas fa-clock", title: "Flexible Scheduling", desc: "Join group sessions or book private coaching at your convenience.", color: "text-success" },
              { icon: "fas fa-snowflake", title: "Perfect Conditions", desc: "We monitor weather & slopes daily to ensure optimal learning conditions.", color: "text-info" }
            ].map((feature, idx) => (
              <div className="col-md-4" key={idx}>
                <i className={`${feature.icon} fa-2x mb-2 ${feature.color}`}></i>
                <h5>{feature.title}</h5>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="py-5">
        <div className="container">
          <h1 className="mb-3 text-center">Meet Our Certified Trainers</h1>
          <p className="lead text-center">Professional ski & snowboard coaches to guide your next adventure.</p>
          <div className="row g-4">
            {[
              { name: "John Snow", img: "/images/jamesnow.jpg", exp: "10 Years of Experience" },
              { name: "Emma Frost", img: "/images/emmafrost.jpg", exp: "8 Years of Experience" },
              { name: "Liam Peak", img: "/images/liampeak.webp", exp: "12 Years of Experience" }
            ].map((trainer, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card h-100 text-center">
                  <img src={trainer.img} className="card-img-top" alt={trainer.name} />
                  <div className="card-body">
                    <h5 className="card-title">{trainer.name}</h5>
                    <p className="card-text">{trainer.exp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register Call to Action */}
      <section className="py-5" id="register">
        <div className="container">
          <h2 className="text-center mb-4">Ready to Hit the Slopes?</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form className="p-4 bg-light shadow rounded" onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter full name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="level" className="form-label">Skill Level</label>
                  <select id="level" className="form-select">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-secondary w-100">Register Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>

    
      {/* Back to Top */}
      <button onClick={scrollToTop} className="back-to-top btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow" title="Go to top">
        <i className="fa fa-chevron-up"></i>
      </button>
    </Layout>
  );
};

export default SkiLessons;
