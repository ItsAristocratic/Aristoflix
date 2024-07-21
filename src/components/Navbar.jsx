import React, { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RiMenuFill } from "react-icons/ri";
import './Navbar.css';
import logo from '../assets/logo.png'


function Navbar({ menuOpen , setMenuOpen, genress, setgenres }) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWJlYzhjNzdlZDczZmU4MDc3YzE0Mjg1MGMxMDkxZSIsIm5iZiI6MTcyMDkzNzQzNi44NzYxMTMsInN1YiI6IjY2ODdjYThmNmQyNTY4ZGYwZjZmNWFiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.L8Rws-xb1pSLGSfFhOviSWtSuflvkp9ufIqyOobcfPE'
    }
  };
  const API_KEY = 'fabec8c77ed73fe8077c142850c1091e';
  const genres = {
    "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]
  }
 const genurl = (gen) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${gen.id}`
  console.log(url);
  fetch(url, options)
    .then(response => response.json())
    .then(response => setgenres(response))
    .catch(err => console.error(err));
    console.log(genress)
 
 }
  return (
    <>
    <nav className='Navbar'> 
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
        <a onClick={() => setMenuOpen(!menuOpen)}><RiMenuFill /></a>
        <img className='logo' src={logo} alt="logo" />
      </div>
      
      <div className="options">
        <Link to="/Aristoflix">Home</Link>
        <Link to="/Aristoflix/Watchlist">Watchlist</Link>
        <Link to="/Aristoflix/About">About</Link>
      </div>
    </nav>
    
      
        <>
        <nav className={menuOpen ? 'sidebar' : 'sidebarnone'}>
         <p>Categories</p>
         {genres.genres.map(gen => (
          <>
          <button key={gen.id} onClick={() => genurl(gen)} className='nav-button'>
          <p >{gen.name}</p>
          </button>
            
          </>
         ))}
        </nav>
        </>
    
    
    </>
  );
}

export default Navbar;