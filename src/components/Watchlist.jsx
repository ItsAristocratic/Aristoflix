import React from 'react'
import { useSelector } from 'react-redux';
import Moviecard from '../Moviecard';
import { useState, useEffect } from 'react';
const Watchlist = () => {
    const [inWatchlist, setInWatchlist] = useState(true);
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWJlYzhjNzdlZDczZmU4MDc3YzE0Mjg1MGMxMDkxZSIsIm5iZiI6MTcyMDg5MDU4NS42ODk4NDEsInN1YiI6IjY2ODdjYThmNmQyNTY4ZGYwZjZmNWFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CGMLAoA60MXeaHucMeZ9iNHDhCpPKsGy3kWFo8kuqJY'
        }
      };
    const [movieList, setMovieList] = useState([]);
    const lists = useSelector(store => store.movieList.items);
    useEffect(() => {
        const getMovie = async () => {
            try {
                const fetchedMovies = await Promise.all(lists.map(async (id) => {
                    const url = `https://api.themoviedb.org/3/movie/${id.movieId}?api_key=fabec8c77ed73fe8077c142850c1091e&append_to_response=videos`;
                    const response = await fetch(url, options);
                    const data = await response.json();
                    return data;
                }));
                setMovieList(fetchedMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
            if(lists.length > 0) {
                getMovie();
                console.log(movieList)
            }
        }, [lists]);
    
return (
    <div style={{backgroundColor: '#111', display: 'flex', flexDirection: 'column'}}>
    <h2 style={{marginTop: '10vh'}}>WATCHLATER</h2>
    <div className='movie-section'>
      
      {movieList.length > 0 ? (
        movieList.map((movie) => (
            <Moviecard key={movie.id} movie={movie} inWatchlist={inWatchlist}/>
        ))
    ) : (
        <h3>No movies to watch later</h3>
    )}
    </div>
    </div>
  )
}

export default Watchlist
