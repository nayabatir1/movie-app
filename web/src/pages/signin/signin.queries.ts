import { useMutation } from "react-query";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { signin } from "./sigin.request";
import { SignInForm } from "./types";
import { AUTH_TOKEN_KEY } from "../../utils/constant";
import { onApiError } from "../../utils/helper";
import { useRouter } from "next/router";

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: SignInForm) => signin(payload),
    onSuccess: (res) => {
      Cookies.set(AUTH_TOKEN_KEY, res.data.token, {
        expires: dayjs().add(7, "days").toDate(),
      });

      router.replace("/", undefined, { locale: router.locale });
    },
    onError: onApiError,
  });
};
