import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase
        .from("creators")
        .select("*")
        .eq("id", Number(id));
      setCreator(data[0]);
    };
    fetchCreator();
  }, [id]);

  if (!creator)
    return <p style={{ color: "#378ADD", padding: "2rem" }}>Loading...</p>;

  return (
    <div style={{ paddingTop: "1rem" }}>
      <button className="btn-back" onClick={() => navigate("/")}>
        ← Back to Creatorverse
      </button>
      <div className="view-card">
        {creator.imageURL && <img src={creator.imageURL} alt={creator.name} />}
        <div className="view-card-body">
          <h1>{creator.name}</h1>
          <a
            href={creator.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#378ADD", fontSize: "14px" }}
          >
            {creator.url} ↗
          </a>
          <p>{creator.description}</p>
          <div className="view-actions">
            <button
              className="btn btn-secondary"
              onClick={() => navigate(`/edit/${creator.id}`)}
            >
              ✏️ Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCreator;
