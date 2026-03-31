import "./OrganizationMainPage.css";
import { useState } from "react";
import type { ChangeEvent } from "react";

type VolunteerEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

type EventFormData = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
};

const EMPTY_FORM: EventFormData = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
};

function OrganizationMainPage() {
  const [events, setEvents] = useState<VolunteerEvent[]>([
    {
      id: 1,
      title: "Community Park Cleanup",
      date: "2025-04-12",
      time: "10:00",
      location: "Delaney Park Strip, Anchorage",
      description: "Help us clean up the park and plant new flowers for spring.",
    },
    
    {
      id: 2,
      title: "Food Bank Sorting",
      date: "2025-04-18",
      time: "14:00",
      location: "Downtown Soup Kitchen",
      description: "Sort and pack donated food items for distribution."
    },
  ]);

  const [formData, setFormData] = useState<EventFormData>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "spots" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId !== null) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingId ? { ...ev, ...formData } : ev
        )
      );
      setEditingId(null);
    } else {
      const newEvent: VolunteerEvent = {
        id: Date.now(),
        ...formData,
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    setFormData(EMPTY_FORM);
    setShowForm(false);
  };

  const handleEdit = (event: VolunteerEvent) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description  
    });
    setEditingId(event.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="main-page">
      {/* Header */}
      <header className="org-header">
        <div className="org-header-info">
          <div>
            <h1 className="org-message">Share Your Event Today!</h1>
          </div>
        </div>
        <button
          className="new-event-button"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData(EMPTY_FORM);
          }}
        >
          + New Event
        </button>
      </header>

      {showForm && (
        <div className="form-section">
          <div className="signup-card">
            <h2 className="signup-title">
              {editingId !== null ? "Edit Event" : "Create New Event"}
            </h2>
            <p className="signup-subtitle">
              {editingId !== null
                ? "Update the details for this volunteer opportunity"
                : "Fill in the details for your new volunteer opportunity"}
            </p>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Park Cleanup Day"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="e.g. Downtown Community Center"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the volunteer opportunity..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="signup-button">
                  {editingId !== null ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>  
        </div>
      )};

      {/* Events Section */}
      <section className="events-section">
        <h2 className="section-heading">
          Your Events
          <span className="event-count">{events.length}</span>
        </h2>

        {events.length === 0 ? (
          <div className="empty-state">
            <p>No events yet. Create your first volunteer opportunity!</p>
            <button
              className="signup-button"
              onClick={() => setShowForm(true)}
            >
              + Create Event
            </button>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div className="volunteer-card" key={event.id}>
                <div className="card-header">
                  <h3 className="card-title">{event.title}</h3>
                  <div className="card-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="card-meta">
                  <span className="meta-item">
                    <span className="meta-icon">📅</span>
                    {formatDate(event.date)}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">⏰</span>
                    {event.time}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">📍</span>
                    {event.location}
                  </span>
                </div>

                <p className="card-description">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default OrganizationMainPage;