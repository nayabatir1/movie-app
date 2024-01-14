import { memo } from "react";
import { Montserrat } from "next/font/google";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { Movie } from "../components/movies";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

type MovieDetails = {
  title: string;
  year: string;
  url: string;
};

function MovieDetails() {
  const router = useRouter();

  const { title, year, id } = router.query as Movie;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieDetails>({ defaultValues: { title, year } });

  const onSubmit: SubmitHandler<MovieDetails> = (data) => console.log(data);

  return (
    <section className={`${montserrat.className} p-20`}>
      <h2>{title ? "Edit" : "Create a new movie"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-20 flex gap-10 lg:flex-row-reverse flex-col justify-end">
          <div className="flex flex-col lg:w-[500px] w-full ">
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className="bg-dark-slate-gray p-2 rounded-lg mb-5 w-full"
            />

            <input
              {...register("year", { required: true })}
              placeholder="Publishing year"
              className="bg-dark-slate-gray p-2 rounded-lg mb-5 lg:w-7/12 w-full"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="w-full mt-5 py-4 rounded-lg border-white border-2"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green w-full mt-5 py-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="border lg:w-[400px] w-full h-[400px] rounded-lg border-dashed flex flex-col justify-center items-center gap-y-5">
            <Image src="/download.svg" width={15} height={15} alt="download" />
            <p className="text-center body-small">
              {title ? "Drop other image here" : "Drop an image here"}
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default memo(MovieDetails);
