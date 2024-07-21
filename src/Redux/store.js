import {configureStore} from '@reduxjs/toolkit';
import Moviereducer from './Moviereducer';

export const store = configureStore({
    reducer: {
        movieList: Moviereducer,
    },
});