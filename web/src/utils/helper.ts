import { toast } from "react-toastify";
import { ApiResponseError } from "./http";

export const onApiError = (error: ApiResponseError) => {
  toast.error(error.message);
};
