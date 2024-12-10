import {useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {MovieCard} from '../MovieCard';
import styles from './Movies.module.scss';

export const Movies = () => {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const filters = useSelector((state: RootState) => state.movies.filters);
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery,
  );

  const filteredMovies = movies
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
      <h2>Фильмы</h2>
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
            />
          ))
        ) : (
          <p className={styles['no-films']}>
            Нет фильмов, соответствующих выбранным фильтрам.
          </p>
        )}
      </div>
    </div>
  );
};
