import React, { useState, useEffect } from 'react';
import { createContext, useContext } from "react";
import { MovieContext } from '../App';

import './moviedetails.css'
import Youtube from 'react-youtube'
import { FaBookmark } from "react-icons/fa";

const MovieDetails = () => {
    const { selectedMovie } = useContext(MovieContext);
    const [movieDetails, setMovieDetails] = useState({});
    const [trailerSpecific, setTrailerSpecific] = useState(false);


    const [watchList, setWatchList] = useState([]);
    const addtowatchlist = () => {
        if (!Array.isArray(watchList)){
            setWatchList([])
        }
        {
            !watchList.includes(movieDetails.id) ? setWatchList([...watchList, movieDetails.id]) : null
        }
    }

    const renderTrailer = () => {
        const trailer = movieDetails.videos.results.find(vid => vid.name == 'Official Trailer')
        return (
            <Youtube 
            videoId={trailer.key} className='originaltrailer'/>
        )
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
                {movieDetails.videos && trailerSpecific ? renderTrailer(): null}
                <h2>{movieDetails.title} ({movieDetails.release_date && movieDetails.release_date.substring(0, 4)})</h2>
                <p>Age: {movieDetails.adult ? '18+' : '3+'} <span>&#8226;</span> Released: {movieDetails.release_date} 
                 <span> &#8226;</span> </p>
                <div className='ratings'>
                <div className="score">
                    <div className="innerscore"
                    ><div className="scorebar">
                         {Math.floor(movieDetails.
vote_average*10)}
{<p style={{fontSize: '0.5rem'}}>%</p>}
                    </div>
                    </div>
                </div>
                <h4>Avg Rating</h4>
                


                </div>
                <div>
                    <button onClick={addtowatchlist()}><FaBookmark /></button>
                    <button><a onClick={() => setTrailerSpecific(!trailerSpecific)}>Watch Trailer <span>&#11166;</span></a></button>
                </div>
                
                <h5>{movieDetails.overview}</h5>

            </div>
        </>
    );
};

export default MovieDetails;
