import React, { useState, useEffect } from 'react';
import { createContext, useContext } from "react";
import { MovieContext } from '../App';
import { IoLanguage } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { addToWatch } from '../Redux/Moviereducer'
import { deleteMovie } from '../Redux/Moviereducer';

import './moviedetails.css'
import Youtube from 'react-youtube'
import { FaBookmark } from "react-icons/fa";

const MovieDetails = () => {
    const dispatch = useDispatch();
    const [watchLater, setWatchLater] = useState(false);
    const { selectedMovie } = useContext(MovieContext);
    const [movieDetails, setMovieDetails] = useState({});
    const [trailerSpecific, setTrailerSpecific] = useState(false);
    const [inrConvert, setinrConvert] = useState(false);


    const [watchList, setWatchList] = useState([]);

    const renderTrailer = () => {
        const trailer = movieDetails.videos.results.find(vid => vid.name == 'Official Trailer')
        return (
            <Youtube 
            videoId={trailer.key} className='originaltrailer'/>
        )
    }
    const addtowatchlist = () => {
        setWatchLater(prevWatchLater => !prevWatchLater); 
        if (!watchLater) {
            dispatch(addToWatch({
                movieId: movieDetails.id,
                movieName: movieDetails.title,
            }));
        } else {
            dispatch(deleteMovie({
                movieId: movieDetails.id,
                movieName: movieDetails.title,
            }));
        }

    }

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${selectedMovie.id}?&append_to_response=videos&api_key=fabec8c77ed73fe8077c142850c1091e`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovieDetails(data); 
                console.log(data)
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [selectedMovie]);
    

    return (
        <>
            <div className="content">
                <div className="vignete">
                    <img className="poster" src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`} alt="{movie.title}" />
                </div>
                <div className="movie-grid">
                <div>
                    <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt="{movie.title}"></img>
                </div>
                <div className='info'>
                {movieDetails.videos && trailerSpecific ? renderTrailer(): null}
                <h2>{movieDetails.title} ({movieDetails.release_date && movieDetails.release_date.substring(0, 4)})</h2>
                <p>Age: {movieDetails.adult ? '18+' : '3+'} <span>&#8226;</span> Released: {movieDetails.release_date} 
                 <span> &#8226;</span>  {movieDetails.genres && (
<>
            {movieDetails.genres.map(gen => gen.name).join(', ')}</>
        )}
                 <p style={{display: 'flex', alignItems: 'center', gap: '10px'}}>Language <IoLanguage />: {movieDetails.original_language} </p>
                 </p>
                <div className='ratings'>
                <div className="score">
                    <div className="innerscore"
                    ><div className="scorebar">
                         {Math.floor(movieDetails.
vote_average*10)}
{<p style={{fontSize: '0.5rem', color: 'black'}}>%</p>}
                    </div>
                    </div>
                </div>
                <h4>Avg Rating</h4>
                


                </div>
                <div className='cta-buttons'>
                    <button onClick={addtowatchlist}><FaBookmark /> Watch Later</button>
                    <button><a onClick={() => setTrailerSpecific(!trailerSpecific)}>Watch Trailer <span>&#11166;</span></a></button>
                </div>
                <h4 className='tagline'><i>{movieDetails.tagline}</i></h4>
                <h5>{movieDetails.overview}</h5>
                <div className="earnings">
                    {inrConvert ? <p>Budget: {movieDetails.budget ? (movieDetails.budget * 82).toLocaleString(undefined, {maximumFractionDigits:2}) : 'not provided'} Rs <spam style={{display: 'block'}}>(If 1$ = 82 Rupees)</spam></p> : <p>Budget: {movieDetails.revenue ? movieDetails.budget.toLocaleString(undefined, {maximumFractionDigits:3}) : 'not provided'} $</p>}


                    {inrConvert ? <p>Revenue: {movieDetails.revenue ? (movieDetails.revenue * 82).toLocaleString(undefined, {maximumFractionDigits:2}) : 'not provided'} Rs <spam style={{display: 'block'}}>(If 1$ = 82 Rupees)</spam></p> : <p>Revenue: {movieDetails.revenue ? movieDetails.revenue.toLocaleString(undefined, {maximumFractionDigits:3}) : 'not provided'} $</p>}


                    {inrConvert ? <p>Profit: {movieDetails.revenue && movieDetails.budget ? ((movieDetails.revenue * 82) - (movieDetails.budget * 82)).toLocaleString(undefined, {maximumFractionDigits:2}) : 'not provided'} Rs <spam style={{display: 'block'}}>(If 1$ = 82 Rupees and its just (Budget - Revenue) and does not tell wheather the movie was successfull or not)</spam></p> : <p>Profit: {movieDetails.revenue ? (movieDetails.revenue - movieDetails.budget).toLocaleString(undefined, {maximumFractionDigits:3}) : 'not provided'} $ <spam style={{display: 'block'}}>(Its just (Budget - Revenue) and does not tell wheather the movie was successfull or not)</spam></p>}
                    <button onClick={() => setinrConvert(!inrConvert)}>{!inrConvert ? 'Convert (Rs)' : 'Convert (Dollar)'}</button>
                </div>
                <div>
                   
                </div>

                </div>
                
                </div>
                
                

            </div>
        </>
    );
};

export default MovieDetails;
