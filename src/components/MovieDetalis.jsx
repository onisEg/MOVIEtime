import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "../css/Home.css";
import img1 from "../imgs/IMDB-icon.png";

export default function MovieDetalis() {
  let params = useParams();
  const [movieDetalis, SetMovieDetalis] = useState({});

  async function getMovieDetails(id) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    SetMovieDetalis(data);
  }

  useEffect(() => {
    getMovieDetails(params.id);
  });

  return (
    <>
      {movieDetalis ?
        <div className="row home">
          <div className="col-md-6  ">
            <div className="mov-info d-flex flex-column align-items-start justify-content-center height">
              <div className="fw-normal Category">
                <span>
                  <img src={img1} alt="imdb" />
                </span>
                <span>{movieDetalis.vote_average?.toFixed(1)}</span>
                <span className="">
                  {movieDetalis.release_date?.slice(0, 4)} - Drama -
                  {movieDetalis.runtime} Min
                </span>
              </div>
              <div className="title pt-2">
                <h2 className="">{movieDetalis.title}</h2>
              </div>
              <div className="dic text-muted">
                <p>{movieDetalis.overview}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center ">
            <div className="">
              <div className="moiveDetalisImg mx-auto">
                <img
                  className="w-100"
                  src={
                    `https://image.tmdb.org/t/p/w500` + movieDetalis.poster_path
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>:        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-5x fa-spin"></i>
        </div>
      
    }

    </>
  );
}
