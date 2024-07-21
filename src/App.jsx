import React, { useState, useEffect, createContext, useContext } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails';
import Watchlist from './components/Watchlist';
import About from './components/About'

export const MovieContext = createContext();



function App() {
  
  const [genress, setgenre] = useState({})
  const [menuOpen, setMenuOpen] = useState(false)
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWJlYzhjNzdlZDczZmU4MDc3YzE0Mjg1MGMxMDkxZSIsIm5iZiI6MTcyMDg5MDU4NS42ODk4NDEsInN1YiI6IjY2ODdjYThmNmQyNTY4ZGYwZjZmNWFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGMLAoA60MXeaHucMeZ9iNHDhCpPKsGy3kWFo8kuqJY'
  }
};

const API_KEY = 'fabec8c77ed73fe8077c142850c1091e';
const API_BASE_URL = 'https://api.themoviedb.org/3';

    const [searchItem, setSearchItem] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieList, setMovieList] = useState([])


    const getMovie = (searchItem) => {
      console.log(genress);
      let url = `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      if (searchItem) {
        url = `https://api.themoviedb.org/3/search/movie?query=${searchItem}&api_key=${API_KEY}`
      }

      
        fetch(url, options)
        .then(response => response.json())
        .then(data => {console.log(data);
          if (searchItem) {
              setMovieList(data.results);
              setSelectedMovie(data.results[0]);
          }
          else if (genress && genress.results && genress.results.length > 0) {
            setMovieList(genress.results);
            setSelectedMovie(genress.results[0]);
          } else if (data.results.length > 0) {
            setMovieList(data.results);
            setSelectedMovie(data.results[0]);
          }})
        .catch(err => console.error(err));
      } 
    
       
        
      
    
      
        
  
  
  useEffect(() => {
    getMovie(searchItem)
  }, [searchItem, genress])
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
    <Router>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} genress={genress} setgenres={setgenre}/>
        <MovieContext.Provider value={{ selectedMovie, setSelectedMovie}}>
        
        <Routes>
          <Route exact path="/Aristoflix" element={<Home selectedMovie={selectedMovie} movieList={movieList} setSelectedMovie={setSelectedMovie} handleSubmit={handleSubmit} handleChange={handleChange} menuOpen={menuOpen}/>}>
            
          </Route>
          <Route path="/Aristoflix/search/*" element={<Search />}>
     
          </Route>
            <Route path="/Aristoflix/Watchlist" element={<Watchlist />}>
          </Route>
          <Route path="/Aristoflix/movie-details/:id" element={<MovieDetails />} />
          <Route path="/Aristoflix/About" element={<About />} />
          
        </Routes>
        </MovieContext.Provider>
    </Router>
    
    
    
      /*
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
        <MovieCard key={movie.id} movie={movie} id={movie.id} setSelectedMovie={setSelectedMovie}/>
        ))}
      
      </div>
      */
  )
}


export default App
