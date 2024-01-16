import { Montserrat } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";

import { SignInForm } from "./types";
import { useSignin } from "./signin.queries";
import { GetServerSideProps } from "next";
import { AUTH_TOKEN_KEY } from "../../utils/constant";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password should be atleast 6 characters")
    .required("Year is required"),
  remember: yup.bool().default(false),
});

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const token = req.cookies?.[AUTH_TOKEN_KEY] || null;

  if (token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      token,
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};

export default function Signin() {
  const { t } = useTranslation("common");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ resolver: yupResolver(schema) });

  const signin = useSignin();

  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    await signin.mutateAsync(data);
  };

  return (
    <section
      className={`${montserrat.className} p-20 h-screen flex justify-center items-center`}
    >
      <div className="md:w-[300px] w-full">
        <h1 className="text-center mb-5">{t("signin")}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            placeholder={t("email")}
            className="bg-dark-slate-gray w-full p-2 rounded-lg"
          />
          <p className="caption text-red mb-5">{errors.email?.message}</p>

          <input
            {...register("password")}
            placeholder={t("password")}
            type="password"
            className="bg-dark-slate-gray w-full p-2 rounded-lg "
          />
          <p className="caption text-red mb-5">{errors.password?.message}</p>

          <div className="flex justify-center">
            <input {...register("remember")} type="checkbox" />
            <span className="body-small ml-2">{t("remember")}</span>
          </div>

          <button
            type="submit"
            className="bg-green w-full mt-5 py-4 rounded-lg"
          >
            {t("login")}
          </button>
        </form>
      </div>
    </section>
  );
}
