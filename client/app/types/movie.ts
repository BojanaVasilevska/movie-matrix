export type MovieId = string | { $oid: string };

export interface Movie {
  _id: MovieId;
  title: string;
  director: string;
  year: number;
  genre: string;
}

export interface EditingMovie extends Movie {
  _id: MovieId;
}
