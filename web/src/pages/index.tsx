import { Montserrat } from "next/font/google";
import { useState } from "react";
import EmptyList from "../components/emptyList";
import Movies, { Movie } from "../components/movies";
import Image from "next/image";

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

const hasPrev = false;
const currPage = 1;
const nextPage = 2;
const hasNext = true;

export default function Home() {
  const [movies, setMovies] = useState<Array<Movie>>(MoviesData);

  return (
    <section className={`${montserrat.className} p-20`}>
      {!!movies.length || <EmptyList />}

      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <h2>My movies</h2>
          <Image src="/plus.svg" width={30} height={30} alt="plus" />
        </div>

        <div className="flex gap-2 items-center">
          <span>Logout</span>
          <Image src="/logout.svg" width={15} height={15} alt="plus" />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 auto-rows-max  gap-10">
        {movies.map((movie) => (
          <Movies {...movie} key={movie.id} />
        ))}
      </div>

      <div className="flex justify-center gap-3 items-center mt-10">
        {hasPrev && <span>Prev</span>}
        <span className="py-1 px-3   bg-green rounded">{currPage}</span>
        <span>{nextPage}</span>
        {hasNext && <span>Next</span>}
      </div>
    </section>
  );
}
