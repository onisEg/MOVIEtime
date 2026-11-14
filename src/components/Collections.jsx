import React, { useState, useEffect } from "react";
import { getTrending } from "../api/tmdb";
import MediaGrid, { Spinner } from "./MediaGrid";

const SECTIONS = [
  { type: "movie", label: "Movies", link: (m) => `/moviedetalis/${m.id}` },
  { type: "tv", label: "TV Shows" },
  { type: "person", label: "People" },
];

function TrendingRow({ type, label, link }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getTrending(type)
      .then((results) => setItems(results.slice(0, 10)))
      .catch(() => setItems([]));
  }, [type]);

  return (
    <div className="row py-4">
      <div className="col-12 col-md-4 d-flex align-items-center mb-3">
        <div>
          <div className="brdr mb-4 w-25"></div>
          <h2 className="h3">
            Trending <br /> {label}
            <br /> To Watch Right Now
          </h2>
          <p className="text-muted">Top trending {label.toLowerCase()} this week</p>
          <div className="brdr mt-4"></div>
        </div>
      </div>
      {items === null ? (
        <div className="col-12 col-md-8">
          <Spinner />
        </div>
      ) : (
        <MediaGrid items={items} getLink={link} colClass="col-6 col-sm-4 col-md-2" />
      )}
    </div>
  );
}

export default function Collections() {
  return (
    <div className="pb-5">
      {SECTIONS.map((s) => (
        <TrendingRow key={s.type} {...s} />
      ))}
    </div>
  );
}
