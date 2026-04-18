import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Volunteer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  notes: string;
  opportunityId: string;
};

type OpportunityWithVolunteers = {
  id: string;
  title: string;
  date: string;
  location: string;
  volunteers: Volunteer[];
};

export default function YourVolunteersPage() {
  const [opportunities, setOpportunities] = useState<OpportunityWithVolunteers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVolunteers = async () => {
      try {
        setLoading(true);
        setError("");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error("You must be logged in to view volunteers.");

        const { data: opportunitiesData, error: opportunitiesError } = await supabase
          .from("volunteer_opportunities")
          .select("opportunity_id, title, date, location")
          .eq("org_id", user.id)
          .order("date", { ascending: true });

        if (opportunitiesError) throw opportunitiesError;

        const opportunityIds = (opportunitiesData || []).map(
          (opp) => opp.opportunity_id
        );

        if (opportunityIds.length === 0) {
          setOpportunities([]);
          return;
        }

        const { data: volunteerData, error: volunteerError } = await supabase
          .from("volunteer_info")
          .select(
            "volunteer_info_id, first_name, last_name, email, phone_number, notes, opportunity_id"
          )
          .in("opportunity_id", opportunityIds);

        if (volunteerError) throw volunteerError;

        const grouped: OpportunityWithVolunteers[] = (opportunitiesData || []).map((opp) => ({
          id: opp.opportunity_id,
          title: opp.title,
          date: opp.date,
          location: opp.location,
          volunteers: (volunteerData || [])
            .filter((vol) => vol.opportunity_id === opp.opportunity_id)
            .map((vol) => ({
              id: String(vol.volunteer_info_id),
              firstName: vol.first_name,
              lastName: vol.last_name,
              email: vol.email,
              phoneNumber: vol.phone_number ?? "",
              notes: vol.notes ?? "",
              opportunityId: vol.opportunity_id,
            })),
        }));

        setOpportunities(grouped);
      } catch (err: any) {
        console.error("Error loading volunteers:", err);
        setError(err.message || "Failed to load volunteers.");
      } finally {
        setLoading(false);
      }
    };

    loadVolunteers();
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
            Your Volunteers
          </h1>
          <p
            className="lead"
            style={{ color: "#6b7280", maxWidth: 720, margin: "0 auto" }}
          >
            View volunteer interest for each of your posted opportunities.
          </p>
        </div>
      </section>

      <div className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container">
          {loading ? (
            <p style={{ color: "#6b7280" }}>Loading volunteers...</p>
          ) : error ? (
            <div
              className="card"
              style={{
                border: "1px solid #fecaca",
                background: "#fef2f2",
                borderRadius: 16,
              }}
            >
              <div className="card-body">
                <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p>
              </div>
            </div>
          ) : opportunities.length > 0 ? (
            <div className="d-flex flex-column gap-4">
              {opportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="card"
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 16,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <h4 className="fw-bold mb-2" style={{ color: "#111827" }}>
                        {opportunity.title}
                      </h4>
                      <p className="mb-1" style={{ color: "#4b5563" }}>
                        <strong>Date:</strong> {opportunity.date}
                      </p>
                      <p className="mb-0" style={{ color: "#4b5563" }}>
                        <strong>Location:</strong> {opportunity.location}
                      </p>
                    </div>

                    <hr />

                    <h5 className="fw-bold mb-3" style={{ color: "#111827" }}>
                      Interested Volunteers ({opportunity.volunteers.length})
                    </h5>

                    {opportunity.volunteers.length > 0 ? (
                      <div className="row">
                        {opportunity.volunteers.map((volunteer) => (
                          <div className="col-md-6 mb-3" key={volunteer.id}>
                            <div
                              className="card h-100"
                              style={{
                                border: "1px solid #e5e7eb",
                                borderRadius: 14,
                                background: "#ffffff",
                              }}
                            >
                              <div className="card-body">
                                <h6
                                  className="fw-bold mb-2"
                                  style={{ color: "#111827" }}
                                >
                                  {volunteer.firstName} {volunteer.lastName}
                                </h6>

                                <p className="mb-1" style={{ color: "#4b5563" }}>
                                  <strong>Email:</strong> {volunteer.email}
                                </p>

                                <p className="mb-1" style={{ color: "#4b5563" }}>
                                  <strong>Phone:</strong>{" "}
                                  {volunteer.phoneNumber || "Not provided"}
                                </p>

                                <p className="mb-0" style={{ color: "#4b5563" }}>
                                  <strong>Message:</strong>{" "}
                                  {volunteer.notes || "No message provided"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: "#6b7280", marginBottom: 0 }}>
                        No volunteers have signed up for this opportunity yet.
                      </p>
                    )}
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
                  No opportunities found
                </h5>
                <p className="card-text mb-0" style={{ color: "#6b7280" }}>
                  Post an opportunity first, then volunteer responses will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}