import { useMutation, useQuery } from "react-query";
import { onApiError } from "../../utils/helper";
import {
  addMovie,
  getAllMovies,
  updateMovie,
  uploadFile,
} from "./movie.request";
import { MoviePayload } from "./types";

export const useGetMovies = (page: number) =>
  useQuery({
    queryKey: ["movies", page],
    queryFn: async () => {
      const query = {
        limit: "8",
        page: page.toString(),
        sortOrder: "desc",
        sortBy: "createdAt",
      };

      const searchParam = new URLSearchParams(query);

      return getAllMovies(searchParam.toString());
    },
    onError: onApiError,
  });

export const useFileUpload = () =>
  useMutation({
    mutationFn: async (formData: FormData) => uploadFile(formData),
    onError: onApiError,
  });

export const useAddMovie = () =>
  useMutation({
    mutationFn: async (payload: MoviePayload) => addMovie(payload),
    onError: onApiError,
  });

export const useUpdateMovie = () =>
  useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: MoviePayload;
      id: string;
    }) => updateMovie(payload, id),
    onError: onApiError,
  });
