/*import React from "react";
import { useEffect, useState } from "react";
import requests from "../../../Utils/requests";
import "./row.css";
const Row = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:5173/api.themoviedb.org/3?api_key=9794969478795901de37ad05dc6ee7f7${requests.fetchNetflixOriginals}`
    )
      .then((res) => res.json())
      .then((data) => {
        const singleVideo = data.results;
        setVideos(singleVideo);
      });
  }, []);

  console.log(videos);
  return <div>row</div>;
};

export default Row;

import React, { useState, useEffect } from "react";

import requests from "../../../Utils/requests"; // Ensure this file exports valid endpoints

const Row = ({ original_name, fetchurl, isLargeRow }) => {
  const [videos, setVideos] = useState([]); // Initialize state for videos
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    //const API_KEY = process.env.VITE_API_KEY; // Use environment variable for API key
    const URL = `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}&api_key=9794969478795901de37ad05dc6ee7f7`;

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const singleVideo = data.results || [];
        setVideos(singleVideo);
      })
      .catch((err) => {
        console.error("Error fetching TMDB data:", err);
        setError(err.message);
      });
  }, []);

  console.log(videos);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video.id}>
              <h3>{video.name || video.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${video.backdrop_path}`}
                alt={video.name || video.title}
              />
              <p>{video.overview}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Row;*/

import React from "react";
import { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../Utils/axios";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        console.log(fetchUrl);

        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row_posters">
        {movies?.map((movie, i) => (
          <img
            key={i}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            onError={(e) =>(e.target.style.display="none")}          />
        ))}
      </div>
    </div>
  );
};

export default Row;
