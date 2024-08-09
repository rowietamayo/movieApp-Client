import PropTypes from "prop-types";
import React, { useState } from "react";

const MovieContext = React.createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    let fetchUrl = "https://movieapp-api-lms1.onrender.com/movies/getMovies";

    fetch(fetchUrl, {})
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Error finding movies") {
          setMovies([]);
        } else {
          setMovies(data.movies);
        }
      });
  };

  return (
    <MovieContext.Provider value={{ movies, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieContext;
