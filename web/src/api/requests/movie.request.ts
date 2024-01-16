import { ApiResponse } from "../../types/common";
import http from "../../utils/http";
import {
  AddMovieResponse,
  Image,
  Movie,
  MoviePayload,
} from "../../types/movies.types";

export const getAllMovies = (query: string) =>
  http.get<ApiResponse<AddMovieResponse>>("/movie?" + query);

export const uploadFile = (payload: FormData) =>
  http.post<ApiResponse<Image>>("/file", payload, { hasFiles: true });

export const addMovie = (payload: MoviePayload) =>
  http.post<ApiResponse<Movie>>("/movie", payload);

export const updateMovie = (payload: MoviePayload, id: string) =>
  http.patch<ApiResponse<Movie>>("/movie/" + id, payload);
