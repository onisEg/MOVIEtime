import React from "react";
import { Link } from "react-router-dom";
import { IMG_BASE } from "../api/tmdb";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 3"><rect width="2" height="3" fill="#222"/></svg>'
  );

// Responsive poster grid used by Movies, TV, People and Collections.
export default function MediaGrid({ items, getLink, colClass }) {
  return items.map((item) => {
    const img = item.poster_path || item.profile_path;
    const title = item.title || item.name;
    const card = (
      <>
        <img
          className="w-100 rounded"
          src={img ? IMG_BASE + img : PLACEHOLDER}
          alt={title}
          loading="lazy"
          style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
        />
        <h3 className="h6 my-2 text-truncate" title={title}>
          {title}
        </h3>
      </>
    );
    return (
      <div key={item.id} className={colClass || "col-6 col-sm-4 col-md-3 col-lg-2"}>
        <div className="movie mb-3">
          {getLink ? <Link to={getLink(item)}>{card}</Link> : card}
        </div>
      </div>
    );
  });
}

export function Spinner() {
  return (
    <div className="py-5 my-5 d-flex align-items-center justify-content-center">
      <i className="fas fa-spinner fa-3x fa-spin"></i>
    </div>
  );
}

export function ErrorMessage({ text = "Something went wrong. Please try again." }) {
  return <div className="alert alert-warning my-4">{text}</div>;
}
