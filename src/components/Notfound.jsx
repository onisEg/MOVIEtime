import React from "react";
import { Link } from "react-router-dom";

export default function Notfound() {
  return (
    <div className="text-center py-5 my-5">
      <h2 className="display-4 fw-bold">404</h2>
      <p className="text-muted">This page doesn’t exist.</p>
      <Link to="/home" className="btn btn-outline-light rounded-pill">
        Back to home
      </Link>
    </div>
  );
}
