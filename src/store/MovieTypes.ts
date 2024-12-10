export interface Movie {
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
}

export interface MovieState {
  movies: Movie[];
  favorites: Movie[];
  error: string | null;
  searchQuery: string;
  filters: {
    genre: string | null;
    year: number | null;
    dateFilterType?: 'creation' | 'update' | null;
    dateOfCreation: string | null;
    dateOfUpdate: string | null;
  };
}
