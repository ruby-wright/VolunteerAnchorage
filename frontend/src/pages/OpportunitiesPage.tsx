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
  capacity: string;
  photo_url: string;
};

function OpportunitiesPage() {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCommitments, setSelectedCommitments] = useState<string[]>([]);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");

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
            capacity: item.capacity,
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

  const categories = [...new Set(opportunities.map((o) => o.category).filter(Boolean))].sort();
  const commitmentLevels = [...new Set(opportunities.map((o) => o.commitmentLevel).filter(Boolean))].sort();
  const ageGroups = [...new Set(opportunities.map((o) => o.ageRequirements).filter(Boolean))].sort();

  const filtered = opportunities.filter((o) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      o.title?.toLowerCase().includes(q) ||
      o.description?.toLowerCase().includes(q) ||
      o.category?.toLowerCase().includes(q) ||
      o.location?.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(o.category);

    const matchesCommitment =
      selectedCommitments.length === 0 || selectedCommitments.includes(o.commitmentLevel);

    const matchesAge =
      selectedAgeGroups.length === 0 || selectedAgeGroups.includes(o.ageRequirements);

    const matchesDate =
      !dateFrom || (o.date && o.date >= dateFrom);

    return matchesSearch && matchesCategory && matchesCommitment && matchesAge && matchesDate;
  });

  function toggleCategory(cat: string) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function toggleCommitment(level: string) {
    setSelectedCommitments((prev) =>
      prev.includes(level) ? prev.filter((c) => c !== level) : [...prev, level]
    );
  }

  function toggleAgeGroup(age: string) {
    setSelectedAgeGroups((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedCommitments([]);
    setSelectedAgeGroups([]);
    setDateFrom("");
    setSearchQuery("");
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedCommitments.length > 0 ||
    selectedAgeGroups.length > 0 ||
    dateFrom !== "" ||
    searchQuery !== "";

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

          {/* Search bar */}
          <div className="mb-4">
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "1.1rem",
                  pointerEvents: "none",
                }}
              >
                🔍
              </span>
              <input
                type="text"
                placeholder="Search by keyword, category, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  fontSize: "1rem",
                  color: "#111827",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>
          </div>

          <div className="row">
            {/* Filter sidebar */}
            <div className="col-md-3 mb-4">
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  padding: "24px 20px",
                  position: "sticky",
                  top: 24,
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0" style={{ color: "#111827", fontSize: "1rem" }}>
                    Filters
                  </h6>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#2563eb",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <hr style={{ borderColor: "#e5e7eb", margin: "0 0 16px 0" }} />

                {/* Date filter */}
                <div className="mb-4">
                  <p
                    className="fw-bold mb-2"
                    style={{ color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    Date
                  </p>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      fontSize: "0.85rem",
                      color: "#111827",
                      background: "#fff",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  {dateFrom && (
                    <p style={{ color: "#6b7280", fontSize: "0.78rem", marginTop: 4, marginBottom: 0 }}>
                      Showing events on or after this date
                    </p>
                  )}
                </div>

                {/* Cause / Category filter */}
                {categories.length > 0 && (
                  <div className="mb-4">
                    <p
                      className="fw-bold mb-2"
                      style={{ color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                    >
                      Cause / Category
                    </p>
                    {categories.map((cat) => (
                      <div key={cat} className="form-check mb-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`cat-${cat}`}
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          style={{ cursor: "pointer", accentColor: "#2563eb" }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`cat-${cat}`}
                          style={{ color: "#4b5563", fontSize: "0.9rem", cursor: "pointer" }}
                        >
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Age Group filter */}
                {ageGroups.length > 0 && (
                  <div className="mb-4">
                    <p
                      className="fw-bold mb-2"
                      style={{ color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                    >
                      Age Group
                    </p>
                    {ageGroups.map((age) => (
                      <div key={age} className="form-check mb-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`age-${age}`}
                          checked={selectedAgeGroups.includes(age)}
                          onChange={() => toggleAgeGroup(age)}
                          style={{ cursor: "pointer", accentColor: "#2563eb" }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`age-${age}`}
                          style={{ color: "#4b5563", fontSize: "0.9rem", cursor: "pointer" }}
                        >
                          {age}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Commitment Level filter */}
                {commitmentLevels.length > 0 && (
                  <div className="mb-4">
                    <p
                      className="fw-bold mb-2"
                      style={{ color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}
                    >
                      Commitment Level
                    </p>
                    {commitmentLevels.map((level) => (
                      <div key={level} className="form-check mb-1">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`commit-${level}`}
                          checked={selectedCommitments.includes(level)}
                          onChange={() => toggleCommitment(level)}
                          style={{ cursor: "pointer", accentColor: "#2563eb" }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`commit-${level}`}
                          style={{ color: "#4b5563", fontSize: "0.9rem", cursor: "pointer" }}
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {loading && (
                  <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>Loading filters...</p>
                )}
              </div>
            </div>

            {/* Cards grid */}
            <div className="col-md-9">
              {loading ? (
                <p style={{ color: "#6b7280" }}>Loading opportunities...</p>
              ) : filtered.length > 0 ? (
                <>
                  <p style={{ color: "#6b7280", fontSize: "0.9rem", marginBottom: 16 }}>
                    {filtered.length} {filtered.length === 1 ? "result" : "results"} found
                  </p>
                  <div className="row">
                    {filtered.map((opportunity) => (
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
                            <p className="card-text mb-1">
                              <strong>Capacity:</strong> {opportunity.capacity}
                            </p>
                            <p className="card-text mb-3">
                              <strong>Commitment:</strong> {opportunity.commitmentLevel}
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
                </>
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
                      {hasActiveFilters
                        ? "Try adjusting your search or filters."
                        : "Check back soon for new volunteer opportunities."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default OpportunitiesPage;
