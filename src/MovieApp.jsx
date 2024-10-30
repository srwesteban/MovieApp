import React, { useState } from "react";
import "./MovieApp.css";

export const MovieApp = () => {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);

  const urlBase = "https://api.themoviedb.org/3/search/movie?query=";
  const apiKey = "56d3bb2058c0a0193ae927bacad1e8d6";

  const fetcMovie = async () => {
    try {
      const response = await fetch(`${urlBase}${search}&api_key=${apiKey}&language=es-Es`);
      const data = await response.json();
      console.log(data.results);
      setMovieList(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetcMovie();
  };

  return (
    <div className="container">
      <h1 className="title">Aplicacion de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          placeholder="Escribe una pelicula"
          onChange={handleInputChange}
        />

        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
      {movieList &&
        <div className="movie-list">
          {movieList.map(movie => (
              <div key={movie.id} className="movie-card">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
              </div>
          ))}
        </div>
      }
    </div>
  );
};
