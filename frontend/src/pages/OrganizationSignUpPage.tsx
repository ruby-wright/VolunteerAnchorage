import "./OrganizationSignUpPage.css";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { registerOrganization } from "../api/organizations";

type FormData = {
  organizationName: string;
  organizationEmail: string;
  organizationWebsite: string; 
  contactName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  password: string;
  confirmPassword: string;
};

function OrganizationSignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    organizationEmail: "",
    organizationWebsite: "",
    contactName: "",
    contactEmail: "",
    contactPhoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerOrganization({
        organizationName: formData.organizationName,
        organizationEmail: formData.organizationEmail,
        organizationWebsite: formData.organizationWebsite, 
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhoneNumber: formData.contactPhoneNumber,
        password: formData.password,
      });

      alert("Organization registered successfully!");

      setFormData({
        organizationName: "",
        organizationEmail: "",
        organizationWebsite: "",
        contactName: "",
        contactEmail: "",
        contactPhoneNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      alert(message);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Register Organization</h1>
        <p className="signup-subtitle">
          Create an account to post volunteer opportunities
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="section-title">Organization Info</h3>

          <div className="form-group">
            <label htmlFor="organizationName">Organization Name</label>
            <input
              id="organizationName"
              name="organizationName"
              type="text"
              placeholder="e.g. Anchorage Volunteer Network"
              value={formData.organizationName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="organizationEmail">Organization Email</label>
            <input
              id="organizationEmail"
              name="organizationEmail"
              type="email"
              placeholder="organization@email.com"
              value={formData.organizationEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="organizationWebsite">Organization Website</label>
            <input
              id="organizationWebsite"
              name="organizationWebsite"
              type="url"
              placeholder="https://www.organization.com"
              value={formData.organizationWebsite}
              onChange={handleChange}
              required
            />
          </div>

          <h3 className="section-title">Primary Contact</h3>

          <div className="form-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              placeholder="Full name"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              placeholder="contact@email.com"
              value={formData.contactEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactPhoneNumber">Contact Phone Number</label>
            <input
              id="contactPhoneNumber"
              name="contactPhoneNumber"
              type="tel"
              placeholder="123-456-7890"
              value={formData.contactPhoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Create Organization Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrganizationSignUpPage;