
import "../css/Register&Login.css";
import React, { useState } from "react";
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import  Joi  from 'joi';




export default function Register() {


  let navigate = useNavigate()

  const [isLoading, setLoading]=useState(false)
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    username: '',
    age: 0,
    email: '',
    password: ''
  });

  function getUserData(e){
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function validation() {
    let scheme = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().integer().min(18).max(80).required(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net", "org", "edu"] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    return scheme.validate(user, { abortEarly: false });
}
  async function sumbitRegistreForm(e) {
    e.preventDefault();  
    setLoading(true)
    let validationResult = validation();
    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setLoading(false)
    } else {
      
        let { data } = await axios.post(
          "https://aqarzone.com/anas/wp-json/myplugin/v1/login",
          user
        );
        console.log(data.message );
        if (data.status === "success") {
          navigate('/login')
          localStorage.setItem("userToken", data.user_id);
        } else {
          setError(data.message)
      }
      setLoading(false)
    }


  }
  return (
    <>
      <div className="row register ">
        <div className="col-md-7  info rounded col-sm-12 text-left d-flex align-items-center my-3 py-3">
          <div className="w-75 m-auto ">
            <h1 className="text-bold">
              Learn to Design <br></br> & Code Real Apps
            </h1>
            <p>
              Praesent euismod eget purus ut scelerisque. Donec vitae arcu
              dignissim, placerat nisi at, pulvinar ipsum.
            </p>
            <button className="btn rounded-pill">watch demo</button>
          </div>
        </div>
        <div className="col-md-5 col-sm-12 form rounded d-flex align-item-center my-5 py-5 ">
          <div className="container d-flex align-item-center ">
            <div>
              <h2>Join Over 52 Million Designer from around the world</h2>
              <p>
                Courses are designed in a way that they are easy to follow,
                latest in market, provide you support for questions and can earn
                you a certificate.
              </p>
              {errorList.map((error, i) => (
                <div key={i} className="alert alert-dark py-1">
                  {error.message}
                </div>
              ))}
              {error ? <div className=" alert alert-dark py-1">{error}</div> : ""}
              <form onSubmit={sumbitRegistreForm}>
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
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-transparent ">
                    <i className="fa-solid fa-image-portrait"></i>
                  </span>
                  <input
                    onChange={getUserData}
                    type="number"
                    className="form-control bg-transparent"
                    placeholder="Age"
                    name="age"
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text bg-transparent ">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    onChange={getUserData}
                    type="email"
                    className="form-control bg-transparent"
                    placeholder="E-mail"
                    name="email"
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
                  />
                </div>
                <button
                  className="btn w-100 rounded-pill fw-bold"
                  type="submit"
                >
                  {isLoading?<i className="fas fa-spinner fa-spin"></i>:"Sign Up"}
                  
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
