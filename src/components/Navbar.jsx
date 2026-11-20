import React from "react";
import { Link } from "react-router-dom";

const pages = [
  ["/home", "Home"], ["/collections", "Collections"], ["/movies", "Movies"],
  ["/author", "People"], ["/tv", "TV"],
];

export default function Navbar({ signedIn, logOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SceneShelf</Link>
        <div className="d-flex align-items-center gap-2 ms-auto order-lg-last">
          {signedIn ? (
            <button type="button" onClick={logOut} className="btn btn-outline-light btn-sm">Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-link text-light btn-sm">Login</Link>
              <Link to="/register" className="btn btn-outline-light btn-sm">Register</Link>
            </>
          )}
          <button className="navbar-toggler p-1" type="button" data-bs-toggle="collapse"
            data-bs-target="#catalogNav" aria-controls="catalogNav" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        <div className="collapse navbar-collapse" id="catalogNav">
          <ul className="navbar-nav">
            {pages.map(([path, label]) => (
              <li key={path} className="nav-item"><Link className="nav-link" to={path}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
