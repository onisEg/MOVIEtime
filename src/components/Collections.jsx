import React,{ useState , useEffect}  from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Collections() {
  const [trendingMovies, setTrendingMovie] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    callback(data.results.slice(0, 10));
  }
  // console.log(getTrending("movie", setTrendingMovie));
  useEffect(() => {
    getTrending("movie", setTrendingMovie);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPerson);
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr mb-4 w-25"></div>
            <h2 className="h3">
              Trending <br /> Movies
              <br /> To Watch Right Now{" "}
            </h2>
            <p className="text-muted">Top Trending Movies by Day </p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
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

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr mb-4 w-25"></div>
            <h2 className="h3">
              Trending <br /> tv
              <br /> To Watch Right Now{" "}
            </h2>
            <p className="text-muted">Top Trending tv by Day </p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
        {trendingTv.map((tv, i) => (
          <div key={i} className="col-md-2">
            <div className="tv">
              <img
                className="w-100"
                src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                alt=""
              />
              <h3 className="h6 my-2">{tv.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div className="">
            <div className="brdr mb-4 w-25"></div>
            <h2 className="h3">
              Trending <br /> peaple
              <br /> To Watch Right Now{" "}
            </h2>
            <p className="text-muted">Top Trending peaple by Day </p>

            <div className="brdr mt-4"></div>
          </div>
        </div>
        {trendingPerson.map((person, i) => (
          <div key={i} className="col-md-2">
            <div className="person">
              <img
                className="w-100"
                src={"https://image.tmdb.org/t/p/w500" + person.profile_path}
                alt=""
              />
              <h3 className="h6 my-2">{person.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
