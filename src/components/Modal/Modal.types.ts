export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  movieData?: {
    id: number;
    dateOfCreation: string;
    title: string;
    genre: string;
    year: number;
    director: string;
    actors: string[];
    annotation: string;
    image: string;
  };
}
