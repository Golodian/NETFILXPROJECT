import React from "react";
import "./banner.css";
import { useState, useEffect } from "react";
import requests from "../../Utils/requests";
const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`)
      .then((req) => req.json())
      .then((data) => {
        const randomMovie =
          data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
      });
  }, []);
  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`, // Fallback if backdrop_path is undefined
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button play">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom"></div>
    </div>
  );
};

export default Banner;
