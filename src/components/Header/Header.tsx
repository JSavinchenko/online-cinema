import {useDispatch, useSelector} from 'react-redux';
import styles from './Header.module.scss';
import {RootState} from '../../store/store';
import {setFilters, clearFilters, setSearchQuery} from '../../store/MovieSlice';
import {Modal} from '../Modal';
import {useState} from 'react';

export const Header = () => {
  const dispatch = useDispatch();

  // Получение фильтров и поискового запроса и
  const filters = useSelector((state: RootState) => state.movies.filters);
  const searchQuery = useSelector(
    (state: RootState) => state.movies.searchQuery,
  );

  // Локальное состояние для управления открытием/закрытием модалки
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Проверка наличия активных фильтров
  const hasFilters = Object.values(filters).some((filter) => filter !== null);

  // Функция для сброса всех фильтров и поискового запроса
  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(setSearchQuery(''));
  };

  // Обработчик изменения года, который обновляет фильтр
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value ? +e.target.value : null; // Преобразование введенного значения в число или null
    dispatch(setFilters({year})); // Установка фильтра по году
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchSection}>
        <h3>Поиск фильмов</h3>
        <input
          type='text'
          placeholder='Искать...'
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>
      <div className={styles.filterSection}>
        <div className={styles.dropdowns}>
          <select
            className={styles.dropdown}
            value={filters.genre || ''}
            onChange={(e) =>
              dispatch(setFilters({genre: e.target.value || null}))
            }
          >
            <option value=''>По жанру</option>
            <option value='Драма'>Драма</option>
            <option value='Комедия'>Комедия</option>
            <option value='Боевик'>Боевик</option>
            <option value='Фантастика'>Фантастика</option>
            <option value='Романтика'>Романтика</option>
            <option value='Экшн'>Экшн</option>
            <option value='Фэнтези'>Фэнтези</option>
          </select>
          <input
            type='number'
            className={styles.dropdown}
            value={filters.year || ''}
            onChange={handleYearChange}
            placeholder='По году'
          />
          <select
            className={styles.dropdown}
            value={filters.dateFilterType || ''}
            onChange={(e) =>
              dispatch(
                setFilters({
                  dateFilterType: e.target.value as
                    | 'creation'
                    | 'update'
                    | null,
                }),
              )
            }
          >
            <option value=''>По дате</option>
            <option value='creation'>Добавления</option>
            <option value='update'>Обновления</option>
          </select>
        </div>
        <div className={styles.actions}>
          <button className={styles.addButton} onClick={handleOpenModal}>
            Добавить фильм
          </button>
          {hasFilters && (
            <button className={styles.resetButton} onClick={handleClearFilters}>
              Сбросить фильтры
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal} isOpen={isModalOpen} mode={'add'} />
      )}
    </div>
  );
};
