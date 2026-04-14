import { useState, type ChangeEvent, type FormEvent } from "react";

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

type Props = {
  opportunity: Opportunity;
  onCancel: () => void;
  onSave: (updatedOpportunity: Opportunity) => Promise<void> | void;
};

function EditOpportunityModal({ opportunity, onCancel, onSave }: Props) {
  const [formData, setFormData] = useState<Opportunity>(opportunity);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "700px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <h4 className="fw-bold mb-4">Edit Opportunity</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Opportunity Title</label>
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
            <label className="form-label fw-semibold">Description</label>
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
              <label className="form-label fw-semibold">Location</label>
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
              <label className="form-label fw-semibold">Start Time</label>
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
              <label className="form-label fw-semibold">End Time</label>
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
              <option value="Community Service">Community Service</option>
              <option value="Environment">Environment</option>
              <option value="Food Support">Food Support</option>
              <option value="Youth">Youth</option>
              <option value="Animals">Animals</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Age Requirements</label>
            <input
              type="text"
              name="ageRequirements"
              className="form-control"
              value={formData.ageRequirements}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Commitment Level</label>
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

          <div className="mb-3">
            <label className="form-label fw-semibold">Capacity</label>
            <input
              type="text"
              name="capacity"
              className="form-control"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditOpportunityModal;