import { useNavigate } from "react-router-dom";

function Card({ creator }) {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/creator/${creator.id}`)}>
      {creator.imageURL ? (
        <img src={creator.imageURL} alt={creator.name} />
      ) : (
        <div className="card-no-img" />
      )}
      <div className="card-body">
        <p className="card-name">{creator.name}</p>
        <a
          className="card-url"
          href={creator.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {creator.url}
        </a>
        <p className="card-desc">{creator.description}</p>
      </div>
    </div>
  );
}

export default Card;
