import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  

  

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="">
              MOVIEtime
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {props.userData ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="home">
                        home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="books">
                        books
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="author">
                        author
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="sections">
                        sections
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>

              <ul className="navbar-nav me-end mb-2 mb-lg-0">
                <li className="nav-item order-lg-first order-last d-flex align-items-center my-3">
                  <i class="fa-brands fa-lg mx-1 fa-tiktok"></i>
                  <i class="fa-brands fa-lg mx-1 fa-linkedin"></i>
                  <i class="fa-brands fa-lg mx-1 fa-github"></i>
                  <i class="fa-brands fa-lg mx-1 fa-discord"></i>
                </li>
                {props.userData ? (
                  <li className="nav-item">
                    <span onClick={props.logOut} className="nav-link">
                      logout
                    </span>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="login">
                        login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="register">
                        register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
}
