import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from("creators")
        .select("*")
        .eq("id", Number(id));
      setForm(data[0]);
    };
    fetchCreator();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    await supabase.from("creators").update(form).eq("id", id);
    navigate(`/creator/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this creator?")) return;
    await supabase.from("creators").delete().eq("id", id);
    navigate("/");
  };

  return (
    <div style={{ paddingTop: "1rem" }}>
      <button className="btn-back" onClick={() => navigate(`/creator/${id}`)}>
        ← Back
      </button>
      <div className="form-card">
        <h1>✏️ Edit Creator</h1>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name || ""} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Channel / Page URL</label>
          <input name="url" value={form.url || ""} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            name="imageURL"
            value={form.imageURL || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            🗑️ Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/creator/${id}`)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditCreator;
