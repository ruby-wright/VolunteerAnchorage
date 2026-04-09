import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
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

function YourOpportunitiesPage() {
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

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const { data: organization, error: orgError } = await supabase
          .from("organizations")
          .select("org_id, organization_email, contact_email")
          .or(`organization_email.eq.${user.email},contact_email.eq.${user.email}`)
          .maybeSingle();

        if (orgError) throw orgError;
        if (!organization) return;

        const { data, error } = await supabase
          .from("volunteer_opportunities")
          .select("*")
          .eq("org_id", organization.org_id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        const formattedOpportunities: Opportunity[] = (data || []).map((item) => ({
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

        setOpportunities(formattedOpportunities);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    };

    fetchOpportunities();
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
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("You must be logged in to create an opportunity.");

      const { data: organization, error: orgError } = await supabase
        .from("organizations")
        .select("org_id, organization_email, contact_email")
        .eq("organization_email", user.email)
        .maybeSingle();

      if (orgError) throw orgError;
      if (!organization) {
        throw new Error("No organization record found for this account.");
      }

      let photoUrl = "";

      if (photoFile) {
        const fileExt = photoFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("opportunity-images")
          .upload(fileName, photoFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("opportunity-images")
          .getPublicUrl(fileName);

        photoUrl = publicUrlData.publicUrl;
      }

      const { data: insertedOpportunity, error: insertError } = await supabase
        .from("volunteer_opportunities")
        .insert([
          {
            org_id: organization.org_id,
            title: formData.title,
            description: formData.description,
            date: formData.date,
            location: formData.location,
            category: formData.category,
            start_time: formData.startTime,
            end_time: formData.endTime,
            age_requirements: formData.ageRequirements,
            commitment_level: formData.commitmentLevel,
            photo_url: photoUrl,
          },
        ])
        .select()
        .maybeSingle();

      if (insertError) throw insertError;
      if (!insertedOpportunity) {
        throw new Error("Opportunity was not returned after insert.");
      }

      const newOpportunity: Opportunity = {
        id: insertedOpportunity.opportunity_id,
        title: insertedOpportunity.title,
        description: insertedOpportunity.description,
        date: insertedOpportunity.date,
        location: insertedOpportunity.location,
        category: insertedOpportunity.category,
        startTime: insertedOpportunity.start_time,
        endTime: insertedOpportunity.end_time,
        ageRequirements: insertedOpportunity.age_requirements,
        commitmentLevel: insertedOpportunity.commitment_level,
        photo_url: insertedOpportunity.photo_url ?? "",
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
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert("Opportunity created successfully.");
    } catch (error: unknown) {
      console.error("Error creating opportunity:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Could not create opportunity.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    setOpportunities((prev) =>
      prev.filter((opportunity) => opportunity.id !== id)
    );
  };

  return (
    <main role="main">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Manage Your Opportunities</h1>
          <p className="lead text-muted">
            Create volunteer events for your organization and manage existing
            opportunities.
          </p>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card mb-5 box-shadow">
                <div className="card-body">
                  <h4 className="card-title mb-4">Create a New Opportunity</h4>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Opportunity Title</label>
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
                      <label className="form-label">Description</label>
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
                        <label className="form-label">Date</label>
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
                        <label className="form-label">Location</label>
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
                        <label className="form-label">Start Time</label>
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
                        <label className="form-label">End Time</label>
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
                      <label className="form-label">Category</label>
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
                      <label className="form-label">Age Requirements</label>
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
                      <label className="form-label">Commitment Level</label>
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
                      <label className="form-label">Upload Photo</label>
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
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating..." : "Create Opportunity"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <h4 className="mb-4">Your Posted Opportunities</h4>

          <div className="row">
            {opportunities.length > 0 ? (
              opportunities.map((opportunity) => (
                <div className="col-md-4" key={opportunity.id}>
                  <div className="card mb-4 box-shadow h-100">
                    <img
                      className="card-img-top"
                      src={
                        opportunity.photo_url ||
                        "https://via.placeholder.com/100x225?text=Your+Opportunity"
                      }
                      alt={opportunity.title}
                      style={{ height: "225px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{opportunity.title}</h5>
                      <p className="card-text">{opportunity.description}</p>
                      <p className="card-text mb-1">
                        <strong>Date:</strong> {opportunity.date}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Time:</strong> {opportunity.startTime} -{" "}
                        {opportunity.endTime}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Location:</strong> {opportunity.location}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Category:</strong> {opportunity.category}
                      </p>
                      <p className="card-text mb-1">
                        <strong>Age:</strong> {opportunity.ageRequirements}
                      </p>
                      <p className="card-text mb-3">
                        <strong>Commitment:</strong> {opportunity.commitmentLevel}
                      </p>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(opportunity.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <small className="text-muted">Posted just now</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="card box-shadow">
                  <div className="card-body text-center">
                    <p className="card-text mb-0">
                      You have not created any opportunities yet.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default YourOpportunitiesPage;