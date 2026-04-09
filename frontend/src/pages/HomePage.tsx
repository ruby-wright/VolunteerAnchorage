import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <main role="main">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Find Your Cause in Anchorage</h1>
          <p className="lead text-muted">
            Discover local volunteer opportunities that match your interests and
            schedule. Make a difference in our community!
          </p>
          <p>
            <a href="#" className="btn btn-primary my-2">
              Browse All Opportunities
            </a>
          </p>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <h6>Explore Volunteer Opportunities</h6>

          <div className="row">
            {[...Array(9)].map((_, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4 box-shadow">
                  <img
                    className="card-img-top"
                    src="https://via.placeholder.com/100x225?text=Volunteer+Opportunity"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      This is a wider card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => navigate(`/connect/${index}`)}
                        >
                          View Details
                        </button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default HomePage;