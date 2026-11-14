import React from "react";

// Simple pager: Prev · current window of pages · Next
export default function Pager({ page, totalPages, onChange }) {
  const last = Math.min(totalPages || 1, 500); // TMDB returns max 500 pages
  const start = Math.max(1, Math.min(page - 2, last - 4));
  const pages = [];
  for (let p = start; p <= Math.min(start + 4, last); p++) pages.push(p);

  const go = (p) => {
    if (p < 1 || p > last || p === page) return;
    onChange(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav aria-label="Pages" className="py-4 mb-5">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link bg-transparent text-white" onClick={() => go(page - 1)}>
            Prev
          </button>
        </li>
        {pages.map((p) => (
          <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
            <button
              className={`page-link ${p === page ? "" : "bg-transparent text-white"}`}
              onClick={() => go(p)}
            >
              {p}
            </button>
          </li>
        ))}
        <li className={`page-item ${page === last ? "disabled" : ""}`}>
          <button className="page-link bg-transparent text-white" onClick={() => go(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
