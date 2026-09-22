import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie, IMG_BASE } from "../api/tmdb";
import { Spinner, ErrorMessage } from "./MediaGrid";
import "../css/Home.css";
import img1 from "../imgs/IMDB-icon.png";

export default function MovieDetalis() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);

  // Runs only when the id changes (before, it ran after every render
  // and kept sending requests to the API in a loop).
  useEffect(() => {
    let cancelled = false;
    setMovie(null);
    setError(false);
    getMovie(id)
      .then((data) => !cancelled && setMovie(data))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <ErrorMessage text="Couldn't load this movie." />;
  if (!movie) return <Spinner />;

  const genres = movie.genres?.map((g) => g.name).join(", ");

  return (
    <div className="row home py-4">
      <div className="col-md-6 order-2 order-md-1">
        <div className="mov-info d-flex flex-column align-items-start justify-content-center h-100">
          <div className="fw-normal Category">
            <span>
              <img src={img1} alt="IMDb" />
            </span>
            <span>{movie.vote_average?.toFixed(1)}</span>
            <span>
              {[movie.release_date?.slice(0, 4), genres, movie.runtime && `${movie.runtime} min`]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </div>
          <div className="title pt-2">
            <h2>{movie.title}</h2>
          </div>
          <div className="dic text-muted">
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 order-1 order-md-2 d-flex align-items-center mb-4 mb-md-0">
        <div className="moiveDetalisImg mx-auto" style={{ maxWidth: 360 }}>
          {movie.poster_path && (
            <img className="w-100 rounded" src={IMG_BASE + movie.poster_path} alt={movie.title} />
          )}
        </div>
      </div>
    </div>
  );
}
