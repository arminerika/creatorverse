import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import Card from "../components/Card";

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    const { data } = await supabase.from("creators").select("*");
    setCreators(data || []);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      fetchCreators();
      return;
    }
    const { data } = await supabase
      .from("creators")
      .select("*")
      .ilike("name", `%${value}%`);
    setCreators(data || []);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>🌐 Creatorverse</h1>
        <div className="navbar-actions">
          <input
            className="search-input"
            type="text"
            placeholder="Search creators..."
            value={query}
            onChange={handleSearch}
          />
          <button className="btn btn-primary" onClick={() => navigate("/add")}>
            + Add Creator
          </button>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-clouds">
          <div
            className="cloud"
            style={{
              width: "140px",
              height: "45px",
              top: "20px",
              left: "40px",
            }}
          />
          <div
            className="cloud"
            style={{
              width: "90px",
              height: "30px",
              top: "35px",
              left: "160px",
            }}
          />
          <div
            className="cloud"
            style={{
              width: "180px",
              height: "50px",
              top: "15px",
              right: "30px",
            }}
          />
          <div
            className="cloud"
            style={{
              width: "100px",
              height: "32px",
              bottom: "25px",
              left: "80px",
              opacity: 0.5,
            }}
          />
          <div
            className="cloud"
            style={{
              width: "120px",
              height: "38px",
              bottom: "20px",
              right: "100px",
              opacity: 0.4,
            }}
          />
        </div>
        <h2>Your favorite creators, all in one place ☁️</h2>
        <p>Discover, follow, and celebrate the creators you love</p>
      </div>

      {creators.length === 0 ? (
        <div className="empty">
          <p>No creators found. Add some! ✨</p>
        </div>
      ) : (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowCreators;
