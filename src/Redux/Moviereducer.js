import { createSlice, configureStore } from "@reduxjs/toolkit";

const getInitialState = () => ({
  items: localStorage.getItem("movies") ? JSON.parse(localStorage.getItem("movies")) : [],
});

const movieSlice = createSlice({
  name: 'movieList',
  initialState: getInitialState(),
  reducers: {
    addToWatch: (state, action) => {
      const { movieId, movieName } = action.payload;
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      
      const existingMovie = state.items.find(item => item.movieId === movieId);
      
      if (existingMovie) {
        alert('Movie already exists');
      } else {
        state.items.push({ movieId, movieName });
        localStorage.setItem("movies", JSON.stringify(state.items));
      }
    },
    deleteMovie: (state, action) => {
      const { movieId } = action.payload;

      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      state.items = state.items.filter(item => item.movieId !== movieId);
      localStorage.setItem("movies", JSON.stringify(state.items));
    }
  }
});


export const { addToWatch, deleteMovie } = movieSlice.actions;
export default movieSlice.reducer;
