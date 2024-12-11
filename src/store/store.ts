import {configureStore} from '@reduxjs/toolkit';
import movieReducer from './MovieSlice';

export const store = configureStore({
  // Создаем хранилище редакс
  reducer: {
    movies: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
