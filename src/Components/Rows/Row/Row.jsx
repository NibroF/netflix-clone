import React, { useState, useEffect } from 'react';
import "./row.css";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";

const API_KEY = "YOUR_TMDB_API_KEY_HERE"; 

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.log("Error fetching row movies:", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

 const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      return;
    }

    console.log("Clicked movie object:", movie);
    console.log("Movie ID:", movie?.id);
    console.log("API Key being used:", API_KEY);

    const isTvShow = movie?.first_air_date || movie?.name || movie?.original_name;
    let primaryType = isTvShow ? "tv" : "movie";
    let fallbackType = isTvShow ? "movie" : "tv";

    const primaryUrl = `https://api.themoviedb.org/3/${primaryType}/${movie.id}/videos?api_key=${API_KEY}`;
    console.log("Fetching primary URL:", primaryUrl);

    try {
      let res = await fetch(primaryUrl);
      let data = await res.json();
      console.log("Primary fetch response data:", data);

      if (!data.results || data.results.length === 0) {
        const fallbackUrl = `https://api.themoviedb.org/3/${fallbackType}/${movie.id}/videos?api_key=${API_KEY}`;
        console.log("Trying fallback URL:", fallbackUrl);
        res = await fetch(fallbackUrl);
        data = await res.json();
        console.log("Fallback fetch response data:", data);
      }

      if (data.results && data.results.length > 0) {
        const trailer =
          data.results.find(
            (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
          ) || data.results[0];

        if (trailer?.key) {
          console.log("FOUND TRAILER KEY:", trailer.key);
          setTrailerUrl(trailer.key);
        } else {
          alert("No YouTube video available for this item.");
        }
      } else {
        alert("No trailers found on TMDB for this title.");
      }
    } catch (err) {
      console.log("Error fetching trailer:", err);
    }
  };
  const opts = {
    height: '390',
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;