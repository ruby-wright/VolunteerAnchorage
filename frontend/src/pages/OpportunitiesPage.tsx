import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Opportunity = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  startTime: string;
  endTime: string;
  ageRequirements: string;
  commitmentLevel: string;
  photo_url: string;
};

function OpportunitiesPage() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  function formatTime(time: string) {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  }

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const { data, error } = await supabase
          .from("volunteer_opportunities")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedOpportunities: Opportunity[] = (data || []).map(
          (item) => ({
            id: item.opportunity_id,
            title: item.title,
            description: item.description,
            date: item.date,
            location: item.location,
            category: item.category,
            startTime: item.start_time,
            endTime: item.end_time,
            ageRequirements: item.age_requirements,
            commitmentLevel: item.commitment_level,
            photo_url: item.photo_url ?? "",
          })
        );

        setOpportunities(formattedOpportunities);
      } catch (error) {
        console.error("Error fetching public opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <main role="main" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <section
        className="text-center"
        style={{
          padding: "60px 20px 40px 20px",
          background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div className="container">
          <h1
            className="fw-bold"
            style={{ fontSize: "2.4rem", color: "#111827", marginBottom: 12 }}
          >
            Browse Opportunities
          </h1>
          <p
            className="lead"
            style={{ color: "#6b7280", maxWidth: 720, margin: "0 auto" }}
          >
            Explore volunteer opportunities and find ways to give back to your
            community.
          </p>
        </div>
      </section>

      <div className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container">
          {loading ? (
            <p style={{ color: "#6b7280" }}>Loading opportunities...</p>
          ) : opportunities.length > 0 ? (
            <div className="row">
              {opportunities.map((opportunity) => (
                <div className="col-md-6 col-lg-4 mb-4" key={opportunity.id}>
                  <div
                    className="card h-100"
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 16,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      overflow: "hidden",
                    }}
                  >
                    {opportunity.photo_url && (
                      <img
                        className="card-img-top"
                        src={opportunity.photo_url}
                        alt={opportunity.title}
                        style={{ height: "225px", objectFit: "cover" }}
                      />
                    )}

                    <div className="card-body d-flex flex-column p-4">
                      <div
                        style={{
                          display: "inline-block",
                          alignSelf: "flex-start",
                          background: "#eff6ff",
                          color: "#2563eb",
                          borderRadius: 999,
                          padding: "4px 10px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          marginBottom: 12,
                        }}
                      >
                        {opportunity.category}
                      </div>

                      <h5
                        className="card-title fw-bold"
                        style={{ color: "#111827" }}
                      >
                        {opportunity.title}
                      </h5>

                      <p className="card-text" style={{ color: "#4b5563" }}>
                        {opportunity.description}
                      </p>

                      <p className="card-text mb-1">
                        <strong>Date:</strong> {opportunity.date}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Time:</strong> {formatTime(opportunity.startTime)} - {formatTime(opportunity.endTime)}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Location:</strong> {opportunity.location}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Age:</strong> {opportunity.ageRequirements}
                      </p>
                      <p className="card-text mb-3">
                        <strong>Commitment:</strong>{" "}
                        {opportunity.commitmentLevel}
                      </p>

                      <div className="mt-auto">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => navigate(`/connect/${opportunity.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="card"
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="card-body text-center py-5">
                <h5 className="fw-bold mb-2" style={{ color: "#111827" }}>
                  No opportunities available
                </h5>
                <p className="card-text mb-0" style={{ color: "#6b7280" }}>
                  Check back soon for new volunteer opportunities.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default OpportunitiesPage;