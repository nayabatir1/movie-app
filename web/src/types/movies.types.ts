export interface AddMovieResponse {
  pagination: Pagination;
  docs: Movie[];
}

export interface Pagination {
  limit: number;
  currentPage: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Movie {
  id: string;
  title: string;
  year: string;
  fileId: string;
  createdAt: string;
  file: Image;
}

export interface Image {
  id: string;
  key: string;
  url: string;
}

export interface MoviePayload {
  title: string;
  year: string;
  fileId: string;
}
