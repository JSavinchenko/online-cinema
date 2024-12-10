import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {MovieCard} from '../MovieCard';
import styles from './Movies.module.scss';
import {useState} from 'react';
import {toggleFavorite} from '../../store/MovieSlice';

export const Movies = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'movies' | 'favorites'>('movies');
  const movies = useSelector((state: RootState) => state.movies.movies);
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const filters = useSelector((state: RootState) => state.movies.filters);
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery,
  );

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  const filteredMovies = (activeTab === 'movies' ? movies : favorites)
    .filter((movie) => {
      const {genre, year, dateFilterType, dateOfCreation, dateOfUpdate} =
        filters;

      if (genre && movie.genre !== genre) {
        return false;
      }

      if (year && movie.year !== year) {
        return false;
      }

      if (dateFilterType === 'creation' && dateOfCreation) {
        const movieCreationDate = new Date(movie.dateOfCreation);
        const filterDate = new Date(dateOfCreation);
        if (movieCreationDate < filterDate) {
          return false;
        }
      }

      if (dateFilterType === 'update' && dateOfUpdate) {
        const movieUpdateDate = new Date(movie.dateOfUpdate);
        const filterDate = new Date(dateOfUpdate);
        if (movieUpdateDate < filterDate) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const {dateFilterType} = filters;

      if (dateFilterType === 'creation') {
        return (
          new Date(b.dateOfCreation).getTime() -
          new Date(a.dateOfCreation).getTime()
        );
      }

      if (dateFilterType === 'update') {
        return (
          new Date(b.dateOfUpdate).getTime() -
          new Date(a.dateOfUpdate).getTime()
        );
      }

      return 0;
    })
    .filter((movie) => {
      if (!searchQuery || searchQuery.length < 3) return true;
      const query = searchQuery.toLowerCase();
      return (
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.actors.some((actor) => actor.toLowerCase().includes(query)) ||
        movie.annotation?.toLowerCase().includes(query)
      );
    });

  return (
    <div className={styles['movies-container']}>
      <div className={styles['tab-buttons']}>
        <button
          className={`${styles.tab} ${activeTab === 'movies' ? styles.active : ''}`}
          onClick={() => setActiveTab('movies')}
        >
          Фильмы
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Избранное
        </button>
      </div>
      <div className={styles['movies-grid']}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              genre={movie.genre}
              year={movie.year}
              director={movie.director}
              actors={movie.actors}
              annotation={movie.annotation}
              image={movie.image}
              dateOfCreation={movie.dateOfCreation}
              dateOfUpdate={movie.dateOfUpdate}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        ) : (
          <p className={styles['no-films']}>
            {activeTab === 'movies'
              ? 'Нет фильмов, соответствующих выбранным фильтрам.'
              : 'Нет избранных фильмов.'}
          </p>
        )}
      </div>
    </div>
  );
};
