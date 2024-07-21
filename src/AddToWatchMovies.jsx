
import { useState, useEffect } from "react";
import { createContext } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addToWatch } from './Redux/Moviereducer'
import { deleteMovie } from './Redux/Moviereducer';


const Moviecard = ({ movie, setSelectedMovie, inWatchlist}) => {
    const [watchLater, setWatchLater] = useState(true);
    
    const dispatch = useDispatch();
    
    const [movieActive, setMovieActive] = useState(false)
    const handleRemoveMovie = () => {
        setSelectedMovie(movie);
    };
    const [mouseActive, setMouseActive] = useState(false)
    const activeMovie = () => {
        setMovieActive(!movieActive)
        
    }
    useEffect(() => {
       
    setWatchLater(inWatchlist);

    }, [inWatchlist]);
    const mouseEnter = () => {
        setMouseActive(!mouseActive)
    }
    const addToWatchLater = () => {
        setWatchLater(prevWatchLater => !prevWatchLater); 
        dispatch(deleteMovie({
            movieId: movie.id,
            movieName: movie.title,
        }));
        
    }
  return (
    <>
    <Link to={{ pathname: `/movie-details/${movie.id}`, state: { movieId: movie.id }}} >
    <div onClick={handleRemoveMovie}>
       <div className={!movieActive ? "movie-box" : "movie-box-active"} key={movie.id}> 
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <p>{movie.title.length > 40 ? `${movie.title.substring(0, 30)}'...'`  : `${movie.title}`}</p>
            

        </div>
    </div>
    </Link>
    <button className="watchlater" onClick={addToWatchLater}>{watchLater? "Remove" : 'Watch Later'}</button>
    </>
  )
}

export default Moviecard
