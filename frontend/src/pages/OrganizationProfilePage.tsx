import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import {
  fetchOrganizationProfile,
  updateOrganizationProfile,
} from "../api/organizations";

type ProfileFormData = {
  name: string
  contact_name: string;
  contact_email: string;
  phone_number: string;
  website_url: string;
};

function OrganizationProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    contact_name: "",
    contact_email: "",
    phone_number: "",
    website_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchOrganizationProfile();

        if (data) {
          setFormData({
            name: data.name || "",
            contact_name: data.contact_name || "",
            contact_email: data.contact_email || "",
            phone_number: data.phone_number || "",
            website_url: data.website_url || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setMessage("Failed to load organization profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateOrganizationProfile(formData);
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="container py-4">Loading profile...</div>;
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm p-4">
        <h2 className="mb-3">Edit Organization Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Name</label>
            <input
              type="text"
              className="form-control"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Email</label>
            <input
              type="email"
              className="form-control"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Website URL</label>
            <input
              type="text"
              className="form-control"
              name="website_url"
              value={formData.website_url}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {message && <p className="mt-3 mb-0">{message}</p>}
      </div>
    </div>
  );
}

export default OrganizationProfilePage;