import React, { useEffect, useState, createContext } from 'react'
import MovieCard from '../SearchMoveiCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const SearchMovieContext = createContext();

const Search = () => {
    const API_KEY = 'fabec8c77ed73fe8077c142850c1091e';
    const API_BASE_URL = 'https://api.themoviedb.org/3';


    const [searchItem, setSearchItem] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieList, setMovieList] = useState([])


    const getMovie = (searchItem) => {
      let url = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      if (searchItem) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchItem}&api_key=${API_KEY}`
      } 
    
        fetch(url)
        .then(response => response.json())
        .then(data => {console.log(data);
          if (data.results.length > 0) {
            setMovieList(data.results);
            setSelectedMovie(data.results[0]);
          }})
        .catch(err => console.error(err));} 
  
  
  useEffect(() => {
    getMovie(searchItem)
  }, [searchItem])
  useEffect(() => {
    getMovie('')
  }, [])

 const handleChange = (e) => {
    e.preventDefault()
    setSearchItem(e.target.value)
 }
 const handleSubmit = () => {  
    getMovie(searchItem)
 }
  return (
<>
    <div className='search-box'>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='Search movie here'
          onChange={handleChange}/>
        <button type="submit">Search</button>
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
    
    
        <button>Watch Trailer</button>
    </div>
    <div className='movie-section'>
    {movieList.map(
        (movie) => (
        <MovieCard key={movie.id} movie={movie} id={movie.id} setSelectedMovie={setSelectedMovie} />
        ))}
    </div>
</>
  )
}
export default Search
