import { ApiResponse } from "../../types/common";
import http from "../../utils/http";
import { SignInForm, SinginResponse } from "./types";

export const signin = (payload: SignInForm) =>
  http.post<ApiResponse<SinginResponse>>("/auth/signin", payload);
