import {Movie} from '../../store/MovieTypes';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  movieData?: Movie;
}
