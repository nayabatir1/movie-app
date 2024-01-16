import { memo, useCallback, useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { SubmitHandler, set, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { GetServerSideProps } from "next";
import { AUTH_TOKEN_KEY } from "../../utils/constant";
import { Movie } from "./types";
import { useAddMovie, useFileUpload, useUpdateMovie } from "./movie.queries";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

type MovieInfo = {
  title: string;
  year: string;
  file?: File | string;
};

const schema: yup.ObjectSchema<MovieInfo> = yup.object({
  title: yup.string().trim().required("Title is required"),
  year: yup
    .string()
    .trim()
    .length(4, "Invalid year")
    .required("Year is required"),
  file: yup
    .mixed<File | string>()
    .test("file", "Banner is required", (val) =>
      typeof val !== "string" ? !!val?.name : true
    )
    .test("size", "Photo must be under 5mb", (val) =>
      typeof val !== "string" && val?.size ? val.size / 1024 / 1024 <= 5 : true
    ),
});

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

let file: unknown;

function MovieDetails() {
  const [previewUrl, setPreviewURL] = useState<string | null>(null);

  const { t } = useTranslation("common");

  const router = useRouter();

  const { title, year, id, fileId, url } = router.query as unknown as Omit<
    Movie,
    "createdAt" | "file"
  > & { url: string };

  useEffect(() => {
    if (url) {
      setValue("file", url);
      setPreviewURL(url);
    }
  }, [url]);

  const addMovie = useAddMovie();
  const updateMovie = useUpdateMovie();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MovieInfo>({
    defaultValues: { title, year },
    resolver: yupResolver(schema),
  });

  const upload = useFileUpload();

  const onSubmit: SubmitHandler<MovieInfo> = async (data) => {
    let newfileId = fileId;

    if (typeof data.file !== "string") {
      const fd = new FormData();

      fd.append("file", data.file as File);

      const res = await upload.mutateAsync(fd);

      newfileId = res.data.id;
    }

    const payload = {
      id,
      title: data.title,
      year: data.year,
      fileId: newfileId,
    };

    if (id) await updateMovie.mutateAsync({ payload, id });
    else await addMovie.mutateAsync(payload);

    router.push("/", undefined, { locale: router.locale });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setValue("file", acceptedFiles[0]);

    const url = URL.createObjectURL(acceptedFiles[0]);

    setPreviewURL(url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className={`${montserrat.className} p-20`}>
      <h2>{t(title ? "edit" : "newMovie")}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-20 flex gap-10 lg:flex-row-reverse flex-col justify-end">
          <div className="flex flex-col lg:w-[500px] w-full ">
            <input
              {...register("title")}
              placeholder={t("title")}
              className="bg-dark-slate-gray p-2 rounded-lg  w-ful"
            />
            <p className="caption text-red mb-5">{errors.title?.message}</p>

            <input
              {...register("year")}
              placeholder={t("year")}
              className="bg-dark-slate-gray p-2 rounded-lg lg:w-7/12 w-full"
            />
            <p className="caption text-red mb-5">{errors.year?.message}</p>

            <div className="flex gap-3">
              <button
                type="button"
                className="w-full mt-5 py-4 rounded-lg border-white border-2"
                onClick={router.back}
                disabled={
                  upload.isLoading ||
                  updateMovie.isLoading ||
                  addMovie.isLoading
                }
              >
                {t("cancel")}
              </button>

              <button
                type="submit"
                className="bg-green w-full mt-5 py-4 rounded-lg"
                disabled={
                  upload.isLoading ||
                  updateMovie.isLoading ||
                  addMovie.isLoading
                }
              >
                {t("submit")}
              </button>
            </div>
          </div>

          <div>
            <div
              {...getRootProps()}
              className="border lg:w-[400px] w-full h-[400px] rounded-lg border-dashed flex flex-col justify-center items-center gap-y-5 relative overflow-hidden bg-[url('/img/hero-pattern.svg')]"
              style={{
                backgroundImage: `url("${previewUrl}")`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <input {...getInputProps()} {...register("file")} />
              <Image
                src="/download.svg"
                width={15}
                height={15}
                alt="download"
              />
              <p className="text-center body-small ">
                {title ? t("dropNew") : t("dropUpdate")}
              </p>
            </div>
            <p className="caption text-red mb-5 text-center">
              {errors.file?.message}
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default memo(MovieDetails);
