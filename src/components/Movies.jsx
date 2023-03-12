import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Movies() {


  const [trendingMovies, setTrendingMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let nums = new Array(13).fill(1).map((elem, index) => index + 1);

  async function getTrending(pageNumber ) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );
    setTrendingMovie(data.results);
    setCurrentPage(pageNumber)
  }

  // console.log(getTrending("movie", setTrendingMovie));
  useEffect(() => {
        getTrending(1)
  }, []);

  return (
    <>
      {trendingMovies ? (
        <div className="row">
          {trendingMovies.map((movie, i) => (
            <div key={i} className="col-md-2">
              <div className="movie">
                <Link to={`/moviedetalis/${movie.id}`}>
                  <img
                    className="w-100"
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                  />
                  <h3 className="h6 my-2">{movie.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-5x fa-spin"></i>
        </div>
      )}
      <nav aria-label="Page navigation py-5 my-5 ">
        <ul class="pagination d-flex justify-content-center ">
          <li onClick={() => getTrending(currentPage - 1)} className="page-item" >
            <a className="page-link bg-transparent text-white">Prev</a>
          </li>

          {nums.map((pageNum) => (
            <li onClick={() => getTrending(pageNum)} key={pageNum} className="page-item" >
              <a className="page-link bg-transparent text-white">{pageNum}</a>
            </li>
          ))}

          <li onClick={() => getTrending(currentPage + 1)} className="page-item">
            <a className="page-link bg-transparent text-white">Next</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
