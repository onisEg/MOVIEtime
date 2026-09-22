import "../css/Register&Login.css";
import React, { useState } from "react";
import { login, DEMO_USER } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

export default function Login(props) {
  let navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function validation() {
    let scheme = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }
  async function submitRegisterForm(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setErrorList([]);
    let validationResult = validation();
    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setLoading(false);
    } else {
      try {
        const data = await login(user);
        if (data.status === "success") {
          props.saveUserData();
          navigate("/home");
        } else {
          setError(data.message);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
      setLoading(false);
    }
  }
  return (
    <>
      <div className="row  ">
        <div className="login d-flex align-items-center justify-content-center ">
          <div className="col-md-4  col-sm-12 form rounded text-center border-white">
            <div className="container py-5">
              <div>
                <h2 className=" pb-3">Login to your account</h2>
                <p className="small text-muted">
                  Demo account: <strong>{DEMO_USER.username}</strong> /{" "}
                  <strong>{DEMO_USER.password}</strong>
                </p>

                {errorList.map((error, i) => (
                  <div key={i} className="alert alert-warning">
                    {error.message}
                  </div>
                ))}
                {error ? (
                  <div className="alert alert-warning">{error}</div>
                ) : (
                  ""
                )}
                <form onSubmit={submitRegisterForm}>
                  <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent ">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      onChange={getUserData}
                      type="text"
                      className="form-control bg-transparent"
                      placeholder="Username"
                      name="username"
                      autoComplete="username"
                    />
                  </div>

                  <div className="input-group mb-3">
                    <span className="input-group-text bg-transparent ">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      onChange={getUserData}
                      type="password"
                      className="form-control bg-transparent"
                      placeholder="**********"
                      name="password"
                      autoComplete="current-password"
                    />
                  </div>

                  <button
                    className="btn w-100 rounded-pill fw-bold"
                    type="submit"
                  >
                    {isLoading ? (
                      <i className="fas fa-spinner fa-spin text-light"></i>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
