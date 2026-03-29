import "./OrganizationSignUpPage.css";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { supabase } from "../lib/supabaseClient"; 

type FormData = {
  organizationName: string;
  organizationEmail: string;
  contactName: string;
  contactEmail: string;
  password: string;
  confirmPassword: string;
};

function OrganizationSignUpPage() {
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    organizationEmail: "",
    contactName: "",
    contactEmail: "",
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.organizationEmail,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (!data.user) {
        alert("User was not created");
        return;
      }

      const { error: insertError } = await supabase.from("organizations").insert([
        {
          user_id: data.user.id,
          organization_name: formData.organizationName,
          organization_email: formData.organizationEmail,
          contact_name: formData.contactName,
          contact_email: formData.contactEmail,
        },
      ]);

      if (insertError) {
        alert(insertError.message);
        return;
      }

      alert("Organization registered successfully!");

      setFormData({
        organizationName: "",
        organizationEmail: "",
        contactName: "",
        contactEmail: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong";
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

          {/* Primary Contact */}
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