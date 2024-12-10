import React, {useState} from 'react';
import styles from './Modal.module.scss';
import {useDispatch} from 'react-redux';
import {addMovie, updateMovie} from '../../store/MovieSlice';
import {ModalProps} from './Modal.types';

export const Modal = ({isOpen, onClose, mode, movieData}: ModalProps) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();

  const [errors, setErrors] = useState<{
    title?: boolean;
    genre?: boolean;
    director?: boolean;
    actors?: boolean;
  }>({});

  const [formData, setFormData] = useState(
    movieData || {
      title: '',
      genre: '',
      year: new Date().getFullYear(),
      director: '',
      actors: '',
      annotation: '',
      image:
        'https://png.pngtree.com/png-vector/20190317/ourlarge/pngtree-blank-paper-note-pad-vector-design-png-image_848407.jpg',
      dateOfCreation: '',
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'actors' ? value.split(',') : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: {
      title?: boolean;
      genre?: boolean;
      director?: boolean;
      actors?: boolean;
    } = {};

    // Проверяем обязательные поля
    if (!formData.title) validationErrors.title = true;
    if (!formData.genre) validationErrors.genre = true;
    if (!formData.director) validationErrors.director = true;

    // Проверка actors
    if (
      !formData.actors ||
      (typeof formData.actors === 'string' && formData.actors.trim() === '') ||
      (Array.isArray(formData.actors) && formData.actors.length === 0)
    ) {
      validationErrors.actors = true;
    }

    // Если есть ошибки, то обновляем состояние ошибок
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const normalizedData = {
      ...formData,
      actors:
        typeof formData.actors === 'string'
          ? formData.actors.split(',').map((actor) => actor.trim())
          : formData.actors,
    };

    if (mode === 'add') {
      dispatch(
        addMovie({
          ...normalizedData,
          year: Number(formData.year),
          image:
            'https://png.pngtree.com/png-vector/20190317/ourlarge/pngtree-blank-paper-note-pad-vector-design-png-image_848407.jpg',
        }),
      );
    } else if (mode === 'edit' && movieData?.id) {
      dispatch(
        updateMovie({
          id: movieData.id,
          ...normalizedData,
          dateOfUpdate: new Date().toISOString(),
          dateOfCreation: movieData.dateOfCreation,
          image: formData.image,
        }),
      );
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.header}>
          {mode === 'add' ? 'Добавить фильм' : 'Редактировать фильм'}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='title'
            value={formData.title}
            placeholder='Название'
            onChange={handleChange}
            className={errors.title ? styles.error : ''}
          />
          <input
            type='text'
            name='genre'
            value={formData.genre}
            placeholder='Жанр'
            onChange={handleChange}
            className={errors.genre ? styles.error : ''}
          />
          <input
            type='number'
            name='year'
            value={formData.year}
            placeholder='Год'
            onChange={handleChange}
          />
          <input
            type='text'
            name='director'
            value={formData.director}
            placeholder='Режиссер'
            onChange={handleChange}
            className={errors.director ? styles.error : ''}
          />
          <input
            type='text'
            name='actors'
            value={
              Array.isArray(formData.actors)
                ? formData.actors.join(', ')
                : formData.actors
            }
            placeholder='Актеры (через запятую)'
            onChange={handleChange}
            className={errors.actors ? styles.error : ''}
          />
          <textarea
            name='annotation'
            value={formData.annotation}
            placeholder='Аннотация'
            onChange={handleChange}
          ></textarea>
          <div className={styles.actions}>
            <button type='submit'>
              {mode === 'add' ? 'Добавить' : 'Сохранить'}
            </button>
            <button type='button' onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
