import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {deleteMovie} from '../../store/MovieSlice';
import styles from './MovieCard.module.scss';
import {Modal} from '../Modal';
import {MovieCardProps} from './MovieCard.types';

export const MovieCard = ({
  id,
  title,
  genre,
  year,
  director,
  actors,
  annotation,
  dateOfCreation,
  dateOfUpdate,
  image,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteMovie(id));
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div
        className={styles['movie-card']}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={image}
          alt={title}
          className={isHovered ? styles['hovered'] : ''}
        />
        <div className={styles.actions}>
          <button type='button' onClick={handleDelete}>
            X
          </button>
          <button
            type='button'
            onClick={handleEdit}
            className={styles.editButton}
          >
            ✎
          </button>
          <button
            className={`${styles.favorite} ${isFavorite ? styles.active : ''}`}
            onClick={() => onToggleFavorite(id)}
          >
            ♥
          </button>
        </div>
        <div className={styles.info}>
          <h3>{title}</h3>
          <div className={styles.details}>
            <p>
              {genre} | {year}
            </p>
            <p>Режиссер: {director}</p>
            <p>Актеры: {actors.join(', ')}</p>
            <p>{annotation}</p>
            <p>
              Дата добавления: {new Date(dateOfCreation).toLocaleDateString()}
            </p>
            <p>
              Дата обновления: {new Date(dateOfUpdate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={closeModal}
          mode='edit'
          movieData={{
            id,
            title,
            genre,
            year: year || new Date().getFullYear(),
            director,
            actors,
            annotation: annotation || '',
            image,
            dateOfCreation,
            dateOfUpdate,
          }}
        />
      )}
    </>
  );
};
