import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Movie, MovieState} from './MovieTypes';
import {initialMovies} from './InitialMovies';

const initialState: MovieState = {
  movies: initialMovies,
  error: null,
  searchQuery: '',
  filters: {
    genre: null,
    year: null,
    dateFilterType: null,
    dateOfCreation: null,
    dateOfUpdate: null,
  },
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (
      // Добавление фильма
      state,
      action: PayloadAction<
        Omit<Movie, 'id' | 'dateOfCreation' | 'dateOfUpdate'>
      >,
    ) => {
      state.movies.push({
        ...action.payload,
        id: Date.now(),
        dateOfCreation: new Date().toISOString(),
        dateOfUpdate: new Date().toISOString(),
      });
    },
    deleteMovie: (state, action: PayloadAction<number>) => {
      // Удаление фильма
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload,
      );
    },
    updateMovie: (state, action: PayloadAction<Movie>) => {
      // Редактирование фильма
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id,
      );
      if (index !== -1) {
        state.movies[index] = {
          ...state.movies[index],
          ...action.payload,
          dateOfUpdate: new Date().toISOString(),
        };
      }
    },
    setFilters: (
      // Установка параметров фильтрации
      state,
      action: PayloadAction<{
        genre?: string | null;
        year?: number | null;
        dateFilterType?: 'creation' | 'update' | null;
        dateOfCreation?: string | null;
        dateOfUpdate?: string | null;
      }>,
    ) => {
      state.filters = {...state.filters, ...action.payload};
    },
    clearFilters: (state) => {
      // Сброс параметров фильтрации
      state.filters = {
        genre: null,
        year: null,
        dateOfCreation: null,
        dateOfUpdate: null,
      };
    },
    setSearchQuery(state, action) {
      // Обновление значения в поисковом поле
      state.searchQuery = action.payload;
    },
  },
});

export const {
  addMovie,
  deleteMovie,
  updateMovie,
  setFilters,
  clearFilters,
  setSearchQuery,
} = movieSlice.actions;
export default movieSlice.reducer;
