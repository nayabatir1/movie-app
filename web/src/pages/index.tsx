import { Montserrat } from "next/font/google";
import { useState } from "react";
import Cookies from "js-cookie";
import EmptyList from "../components/emptyList";
import Movies from "../components/movies";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AUTH_TOKEN_KEY } from "../utils/constant";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useGetMovies } from "./movie/movie.queries";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const MoviesData = [
  {
    title: "Movie 1",
    year: "2002",
    url: "https://picsum.photos/200/300",
    id: "1",
  },
  {
    title: "Movie 1",
    year: "2002",
    url: "https://picsum.photos/200/300",
    id: "2",
  },
  {
    title: "Movie 1",
    year: "2002",
    url: "https://picsum.photos/200/300",
    id: "3",
  },
  {
    title: "Movie 1",
    year: "2002",
    url: "https://picsum.photos/200/300",
    id: "4",
  },
];

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
}) => {
  const token = req.cookies?.[AUTH_TOKEN_KEY] || null;

  if (!token)
    return {
      redirect: {
        destination: "/signin",
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

export default function Home() {
  const [page, setPage] = useState(1);

  const { t } = useTranslation("common");

  const movies = useGetMovies(page);

  const router = useRouter();

  const logout = () => {
    Cookies.remove(AUTH_TOKEN_KEY);

    router.replace("/signin", undefined, { locale: router.locale });
  };

  const addMovie = () => {
    router.push("/movie", undefined, { locale: router.locale });
  };

  if (!movies.data?.data.docs.length)
    return (
      <section
        className={`${montserrat.className} p-20 h-screen flex items-center justify-center`}
      >
        <EmptyList />
      </section>
    );

  return (
    <section className={`${montserrat.className} p-20`}>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <h2>{t("my_movies")}</h2>
          <Image
            src="/plus.svg"
            width={30}
            height={30}
            alt="plus"
            className="hover:cursor-pointer"
            onClick={addMovie}
          />
        </div>

        <div className="flex items-center">
          <div
            className="h-max flex gap-2 hover:cursor-pointer"
            onClick={logout}
          >
            <span>{t("logout")}</span>
            <Image src="/logout.svg" width={15} height={15} alt="plus" />
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 auto-rows-max  gap-10">
        {movies.data?.data.docs.map((movie) => (
          <Movies {...movie} key={movie.id} />
        ))}
      </div>

      <div className="flex justify-center gap-3 items-center mt-10">
        {movies.data?.data.pagination.hasPrevPage && (
          <span onClick={() => setPage((i) => i - 1)}>{t("prev")}</span>
        )}
        {!!movies.data?.data.docs.length && (
          <span className="py-1 px-3   bg-green rounded">{page}</span>
        )}

        {movies.data?.data.pagination.hasNextPage && (
          <>
            <span>{movies.data?.data.pagination.currentPage + 1}</span>
            <span onClick={() => setPage((i) => i + 1)}>{t("next")}</span>
          </>
        )}
      </div>
    </section>
  );
}
