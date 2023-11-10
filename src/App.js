import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

// A custom alert component that takes a message prop
const Alert = ({ message }) => {

  // A state to control the visibility of the alert
    const [show, setShow] = useState(false);
  
    // A function to close the alert
    const handleClose = () => {
      setShow(false);
    };
  
    // A side effect to show the alert when the message prop changes
    useEffect(() => {
      if (message) {
        setShow(true);
      }
    }, [message]);
  
     // Return the alert element if the show state is true
     return show ? (
      <div className="alert">
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
      </div>
    ) : null;
  };

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      // Check if the response is successful
      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        // If not, throw an error with the message from the API
        throw new Error(data.Error);
      }
    } catch (err) {
      // Catch any error and set the error state
      setError(err.message);
    }
  };



  
  //Function to add a enter function to the search bar
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>Movie Paradise</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyUp={(e) => handleEnter(e)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {/* Render the Alert component with the error state as the message prop */}
      {error ? <Alert message={error} /> : null}
    </div>
  );
};



  
export default App;
