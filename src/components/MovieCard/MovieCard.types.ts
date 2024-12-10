export interface MovieCardProps {
  id: number;
  title: string;
  genre: string;
  year?: number;
  director: string;
  actors: string[];
  annotation?: string;
  dateOfCreation: string;
  dateOfUpdate: string;
  image: string;
  isFavorite?: boolean;
  onToggleFavorite: (id: number) => void;
}
