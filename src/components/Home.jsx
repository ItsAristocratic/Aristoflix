import React, { useState, useEffect, useContext } from 'react'
import MovieCard from '../Moviecard'
import Youtube from 'react-youtube';
import './Home.css'
import { IoArrowBackCircle } from "react-icons/io5";


const Home = ({ selectedMovie, movieList, setSelectedMovie, handleSubmit, handleChange, menuOpen }) => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [searchButton, setSearchButton] = useState('Search');
  

  const [movieDetails, setMovieDetails] = useState({});
  const [trailerSpecific, setTrailerSpecific] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${selectedMovie? selectedMovie.id : '1022789'}?&append_to_response=videos&api_key=fabec8c77ed73fe8077c142850c1091e`;
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
    renderTrailer()
}, [selectedMovie]); 

const renderTrailer = () => {
  const trailer = movieDetails.videos?.results.find(vid => vid.name == 'Official Trailer')
  return (
    <>
      <Youtube 
      videoId={trailer? trailer.key : null} className='originaltrailer'/>
      <button className='backTrailer' onClick={() => setTrailerSpecific(false)}><IoArrowBackCircle /></button>
      </>
  )
}
const buttonChange = () => {
  setSearchButton('Done!')
  setTimeout(() => {
    setSearchButton('Search')
  }, 1000);
  
 
}

  return (
    <div>
    <div className='contentbox'>
  
    <div className='search-box'>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='Search movie here'
          onChange={handleChange}/>
        <button onClick={buttonChange} type="button">{searchButton}</button>
      </form>
    </div>
    <div className='movie-overview'>
    {selectedMovie && selectedMovie.backdrop_path && (
        <>
            <img src={`https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path}`} alt={selectedMovie.title} />
            <div>
            <h1>{selectedMovie.title}</h1>
            <h4>{selectedMovie.overview}</h4>
            </div>
        </>
        
        )}
        <div className={movieDetails.videos && trailerSpecific ? 'container': null}>
          {movieDetails.videos && trailerSpecific ? renderTrailer(): null}
          
        </div>
        </div>

       <div style={{width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       <button className="trailer-button"style={{marginBottom: '20px'}}onClick={() => setTrailerSpecific(!trailerSpecific)}>Watch Trailer</button> 
       </div>
        
    </div>
    <div className='movie-section'>
    {movieList.map(
        (movie) => (
        <MovieCard key={movie.id} movie={movie} id={movie.id} setSelectedMovie={setSelectedMovie} inWatchlist={inWatchlist}/>
        ))}
    </div>
  </div>

    
  )
}

export default Home
