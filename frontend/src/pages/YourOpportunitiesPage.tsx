import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOpportunities, createOpportunity, deleteOpportunity, updateOpportunity } from "../api/opportunities";
import DeleteModal from "../components/DeleteModal";
import EditOpportunityModal from "../components/EditOpportunityModal";

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

type OpportunityRow = {
  opportunity_id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  start_time: string;
  end_time: string;
  age_requirements: string;
  commitment_level: string;
  photo_url: string;
};

function YourOpportunitiesPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    startTime: "",
    endTime: "",
    ageRequirements: "",
    commitmentLevel: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editOpportunity, setEditOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchOpportunities();

        const formatted = data.map((item: OpportunityRow) => ({
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
        }));

        setOpportunities(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhotoFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inserted = await createOpportunity(formData, photoFile);

      const newOpportunity = {
        id: inserted.opportunity_id,
        title: inserted.title,
        description: inserted.description,
        date: inserted.date,
        location: inserted.location,
        category: inserted.category,
        startTime: inserted.start_time,
        endTime: inserted.end_time,
        ageRequirements: inserted.age_requirements,
        commitmentLevel: inserted.commitment_level,
        photo_url: inserted.photo_url ?? "",
      };

      setOpportunities((prev) => [newOpportunity, ...prev]);

      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        startTime: "",
        endTime: "",
        ageRequirements: "",
        commitmentLevel: "",
      });

      setPhotoFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteOpportunity(id);

      setOpportunities((prev) =>
        prev.filter((opportunity) => opportunity.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (updatedOpportunity: Opportunity) => {
  try {
    await updateOpportunity(updatedOpportunity.id, {
      title: updatedOpportunity.title,
      description: updatedOpportunity.description,
      date: updatedOpportunity.date,
      location: updatedOpportunity.location,
      category: updatedOpportunity.category,
      start_time: updatedOpportunity.startTime,
      end_time: updatedOpportunity.endTime,
      age_requirements: updatedOpportunity.ageRequirements,
      commitment_level: updatedOpportunity.commitmentLevel,
    });

    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === updatedOpportunity.id ? updatedOpportunity : opp
      )
    );
  } catch (error) {
    console.error("Error updating opportunity:", error);
    alert("Failed to update opportunity.");
  }
  };

  function formatTime(time: string) {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
  });
  }

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
            Manage Your Opportunities
          </h1>
          <p
            className="lead"
            style={{ color: "#6b7280", maxWidth: 720, margin: "0 auto" }}
          >
            Create volunteer events for your organization and manage your
            existing opportunities in one place.
          </p>
        </div>
      </section>

      <div className="py-5" style={{ background: "#f8fafc" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div
                className="card mb-5"
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                }}
              >
                <div className="card-body p-4 p-md-5">
                  <h4
                    className="card-title mb-4 fw-bold"
                    style={{ color: "#111827" }}
                  >
                    Create a New Opportunity
                  </h4>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Opportunity Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">Date</label>
                        <input
                          type="date"
                          name="date"
                          className="form-control"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Start Time
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          className="form-control"
                          value={formData.startTime}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          End Time
                        </label>
                        <input
                          type="time"
                          name="endTime"
                          className="form-control"
                          value={formData.endTime}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Category</label>
                      <select
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Community Service">
                          Community Service
                        </option>
                        <option value="Environment">Environment</option>
                        <option value="Food Support">Food Support</option>
                        <option value="Youth">Youth</option>
                        <option value="Animals">Animals</option>
                        <option value="Health">Health</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Age Requirements
                      </label>
                      <input
                        type="text"
                        name="ageRequirements"
                        className="form-control"
                        placeholder="e.g. 18+ or All Ages"
                        value={formData.ageRequirements}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Commitment Level
                      </label>
                      <select
                        name="commitmentLevel"
                        className="form-select"
                        value={formData.commitmentLevel}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select commitment level</option>
                        <option value="One-time">One-time</option>
                        <option value="Short-term">Short-term</option>
                        <option value="Long-term">Long-term</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold">
                        Upload Photo
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handlePhotoChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn"
                      disabled={isSubmitting}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "12px 20px",
                        fontWeight: 700,
                      }}
                    >
                      {isSubmitting ? "Creating..." : "Create Opportunity"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-bold" style={{ color: "#111827" }}>
              Your Posted Opportunities
            </h4>
            <span style={{ color: "#6b7280", fontSize: "0.95rem" }}>
              {opportunities.length} posted
            </span>
          </div>

          <div className="row">
            {opportunities.length > 0 ? (
              opportunities.map((opportunity) => (
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
                    <img
                      className="card-img-top"
                      src={
                        opportunity.photo_url ||
                        "https://via.placeholder.com/100x225?text=Your+Opportunity"
                      }
                      alt={opportunity.title}
                      style={{ height: "225px", objectFit: "cover" }}
                    />

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

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(`/connect/${opportunity.id}`)
                            }
                          >
                            View Details
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => setEditOpportunity(opportunity)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setDeleteId(opportunity.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
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
                      No opportunities yet
                    </h5>
                    <p className="card-text mb-0" style={{ color: "#6b7280" }}>
                      Create your first volunteer opportunity using the form
                      above.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={async () => {
            await handleDelete(deleteId);
            setDeleteId(null);
          }}
        />
      )}
      {editOpportunity && (
        <EditOpportunityModal
          opportunity={editOpportunity}
          onCancel={() => setEditOpportunity(null)}
          onSave={async (updatedOpportunity) => {
            await handleUpdate(updatedOpportunity);
            setEditOpportunity(null);
          }}
        />
      )}
    </main>
  );
}

export default YourOpportunitiesPage;