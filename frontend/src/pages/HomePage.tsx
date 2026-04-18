import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main role="main" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section style={{ position: "relative" }}>
        <img
          src="/src/assets/home-page-header.jpg"
          alt="Anchorage"
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.45))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <div style={{ maxWidth: "850px" }}>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              Find Your Cause in Anchorage
            </h1>

            <p
              style={{
                color: "#f3f4f6",
                fontSize: "1.1rem",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              Discover local volunteer opportunities that match your interests
              and schedule. Connect with organizations and make a difference in
              your community.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/opportunities"
                className="btn"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Browse All Opportunities
              </Link>

              <Link
                to="/signup"
                className="btn"
                style={{
                  background: "#ffffff",
                  color: "#2563eb",
                  border: "1px solid #dbeafe",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Organization Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 24px" }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: "36px" }}>
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "#111827",
                marginBottom: "10px",
              }}
            >
              Why VolunteerAnchorage
            </h2>
            <p
              style={{
                color: "#6b7280",
                maxWidth: "700px",
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Volunteer Anchorage helps community members discover meaningful
              local opportunities while helping organizations share events and
              connect with volunteers more easily.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="card h-100"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="card-body p-4">
                  <h5
                    className="card-title fw-bold"
                    style={{ color: "#111827" }}
                  >
                    Browse Opportunities
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280" }}>
                    Explore volunteer opportunities across Anchorage and find
                    events that fit your interests, skills, and availability.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="card-body p-4">
                  <h5
                    className="card-title fw-bold"
                    style={{ color: "#111827" }}
                  >
                    Connect with Organizations
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280" }}>
                    Learn more about each opportunity and submit your volunteer
                    information directly through the connect form.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card h-100"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="card-body p-4">
                  <h5
                    className="card-title fw-bold"
                    style={{ color: "#111827" }}
                  >
                    Support the Community
                  </h5>
                  <p className="card-text" style={{ color: "#6b7280" }}>
                    Help local nonprofits and community groups by contributing
                    your time where it can make a real difference.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-center"
            style={{
              marginTop: "48px",
              padding: "32px 24px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              Ready to get started?
            </h3>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "20px",
              }}
            >
              Browse current opportunities or sign up your organization to post
              volunteer events.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/opportunities"
                className="btn"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                View Opportunities
              </Link>

              <Link
                to="/signup"
                className="btn"
                style={{
                  background: "#fff",
                  color: "#2563eb",
                  border: "1px solid #2563eb",
                  borderRadius: "10px",
                  padding: "12px 20px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Post an Opportunity
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;