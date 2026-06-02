import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

function AddCreator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.url || !form.description)
      return alert("Name, URL, and description are required!");
    await supabase.from("creators").insert([form]);
    navigate("/");
  };

  return (
    <div style={{ paddingTop: "1rem" }}>
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Back to Creatorverse
      </button>
      <div className="form-card">
        <h1>✨ Add a Creator</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            placeholder="e.g. Parokya ni Edgar"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Channel / Page URL</label>
          <input
            name="url"
            placeholder="https://..."
            value={form.url}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="What are they known for?"
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            name="imageURL"
            placeholder="https://..."
            value={form.imageURL}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCreator;
