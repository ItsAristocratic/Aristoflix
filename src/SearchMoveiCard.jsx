
import { useState } from "react";
import { createContext } from "react";
import { Link } from 'react-router-dom';


const Moviecard = ({ movie, setSelectedMovie }) => {
    
    const [movieActive, setMovieActive] = useState(false)
    const handleRemoveMovie = () => {
        // Example: Remove the movie from the list using setMovieList
        setSelectedMovie(movie);
    };
    const [mouseActive, setMouseActive] = useState(false)
    const activeMovie = () => {
        setMovieActive(!movieActive)
        
    }
    const mouseEnter = () => {
        setMouseActive(!mouseActive)
    }
    const addToWatchLater = () => {

    }
  return (
    <>
    <Link to={{ pathname: `/movie-details/${movie.id}`, state: { movieId: movie.id }}} > 
    <div onClick={handleRemoveMovie}>
       <div className={!movieActive ? "movie-box" : "movie-box-active"} key={movie.id}> 
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <p>{movie.title.length > 40 ? `${movie.title.substring(0, 30)}'...'`  : `${movie.title}`}</p>
            <button className="watchlater" onClick={addToWatchLater}>Watch Later</button>

        </div>
    </div>
    </Link>
    </>
  )
}

export default Moviecard
