import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import img1 from "../imgs/IMDB-icon.png";
import { getTrending, IMG_BASE } from "../api/tmdb";
import { Spinner } from "./MediaGrid";

// Shows this week's #1 trending movie as the hero.
export default function Home() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getTrending("movie")
      .then((results) => setMovie(results[0]))
      .catch(() => setMovie(false));
  }, []);

  if (movie === null) return <Spinner />;
  if (movie === false)
    return <p className="py-5 text-muted">Couldn't load trending movies.</p>;

  return (
    <div className="row home py-4">
      <div className="col-md-6 order-2 order-md-1">
        <div className="mov-info d-flex flex-column align-items-start justify-content-center height">
          <div className="fw-normal Category">
            <span>
              <img src={img1} alt="IMDb" />
            </span>
            <span>{movie.vote_average?.toFixed(1)}</span>
            <span>#1 trending this week · {movie.release_date?.slice(0, 4)}</span>
          </div>
          <div className="title pt-2">
            <h2>{movie.title}</h2>
          </div>
          <div className="dic text-muted">
            <p>{movie.overview}</p>
          </div>
          <Link to={`/moviedetalis/${movie.id}`} className="btn btn-outline-light rounded-pill">
            View details
          </Link>
        </div>
      </div>
      <div className="col-md-6 order-1 order-md-2 d-flex align-items-center mb-4 mb-md-0">
        {movie.poster_path && (
          <img
            className="rounded mx-auto d-block"
            style={{ maxWidth: 360, width: "100%" }}
            src={IMG_BASE + movie.poster_path}
            alt={movie.title}
          />
        )}
      </div>
    </div>
  );
}
