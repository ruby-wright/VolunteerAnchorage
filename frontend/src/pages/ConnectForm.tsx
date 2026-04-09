import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registerVolunteer } from "../api/volunteers";

interface OpportunityDetails {
  opportunityId: string;
  organizationName: string;
  email: string;
  phone: string;
  opportunityTitle: string;
  date: string;
  location: string;
  spotsTotal: number;
  spotsRemaining: number;
  requirements: string[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const opportunityData: Omit<OpportunityDetails, "opportunityId"> = {
  organizationName: "Anchorage Environmental Stewards",
  email: "contact@anchorage-stewards.org",
  phone: "(907) 555-6789",
  opportunityTitle: "Community River Cleanup Initiative",
  date: "Saturday, October 26, 2024 (9:00 AM - 1:00 PM)",
  location: "Ship Creek Trailhead, Anchorage",
  spotsTotal: 30,
  spotsRemaining: 15,
  requirements: [
    "Ages 16+ (minors need parental consent)",
    "Ability to walk on uneven terrain and lift up to 20 lbs",
    "Wear weather-appropriate clothing (waterproof suggested)",
    "No prior experience needed; training provided on site",
    "Bring your own water bottle (refill stations available)",
  ],
};

function EmailIcon() {
  return (
    <svg width="16" height="16" fill="#2196f3" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" fill="#2196f3" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" fill="#2196f3" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" fill="#2196f3" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="15" height="15" fill="#2196f3" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" fill="#2196f3" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
      />
    </svg>
  );
}

export default function ConnectForm() {
  const navigate = useNavigate();
  const { opportunityId } = useParams<{ opportunityId: string }>();

  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const opp: OpportunityDetails = {
    opportunityId: opportunityId || "",
    ...opportunityData,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    if (!opportunityId) {
      setError("Missing opportunity ID.");
      return;
    }

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("First name, last name, and email are required.");
      return;
    }

    try {
      setLoading(true);

      await registerVolunteer({
        opportunity_id: opportunityId,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone_number: form.phone.trim(),
        notes: form.message.trim(),
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #dee2e6",
    borderRadius: 6,
    padding: "10px 12px",
    fontSize: 14,
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    marginBottom: 6,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Segoe UI', sans-serif", color: "#222" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 28, color: "#111" }}>
          Connect with {opp.organizationName}
        </h1>

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid #ced4da",
            borderRadius: 6,
            background: "#fff",
            padding: "8px 16px",
            fontSize: 14,
            color: "#444",
            cursor: "pointer",
            marginBottom: 36,
            fontWeight: 500,
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <BackArrowIcon />
          Back to Opportunity Details
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
              Contact {opp.organizationName}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                <EmailIcon />
                <a href={`mailto:${opp.email}`} style={{ color: "#222", textDecoration: "none" }}>
                  {opp.email}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14 }}>
                <PhoneIcon />
                <span>{opp.phone}</span>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #e9ecef",
                borderRadius: 10,
                padding: "20px 22px",
                background: "#fafbfc",
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                  color: "#888",
                  marginBottom: 8,
                }}
              >
                Opportunity Details
              </p>

              <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111", marginBottom: 16 }}>
                {opp.opportunityTitle}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#333" }}>
                  <CalendarIcon />
                  <span>{opp.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#333" }}>
                  <PinIcon />
                  <span>{opp.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#333" }}>
                  <PeopleIcon />
                  <span>
                    Up to {opp.spotsTotal} volunteers, {opp.spotsRemaining} spots remaining
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#222" }}>Requirements:</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {opp.requirements.map((req, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#333" }}>
                    <CheckIcon />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 22 }}>Your Information</h2>

            {submitted ? (
              <div
                style={{
                  background: "#e8f5e9",
                  border: "1px solid #a5d6a7",
                  borderRadius: 10,
                  padding: "24px 20px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
                <h3 style={{ color: "#2e7d32", fontWeight: 700, fontSize: 17 }}>Application Submitted!</h3>
                <p style={{ color: "#388e3c", fontSize: 14, marginTop: 6 }}>
                  Thank you, {form.firstName}! {opp.organizationName} will be in touch soon.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {error && (
                  <div
                    style={{
                      background: "#fdecea",
                      color: "#b71c1c",
                      border: "1px solid #f5c2c7",
                      borderRadius: 8,
                      padding: "10px 12px",
                      fontSize: 14,
                    }}
                  >
                    {error}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
                      onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
                      onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
                    onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(907) 123-4567"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
                    onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Message / Cover Letter</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us why you're interested in this opportunity..."
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                    onFocus={(e) => (e.target.style.borderColor = "#2196f3")}
                    onBlur={(e) => (e.target.style.borderColor = "#dee2e6")}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    background: loading ? "#90caf9" : "#2196f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "13px",
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    width: "100%",
                    letterSpacing: 0.3,
                    transition: "background 0.15s",
                  }}
                  onMouseOver={(e) => {
                    if (!loading) e.currentTarget.style.background = "#1976d2";
                  }}
                  onMouseOut={(e) => {
                    if (!loading) e.currentTarget.style.background = "#2196f3";
                  }}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}