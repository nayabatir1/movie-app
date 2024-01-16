import Image from "next/image";
import { useRouter } from "next/router";
import { title } from "process";
import { memo, useCallback } from "react";
import { Movie } from "../types/movies.types";

function Movies(props: Movie) {
  const router = useRouter();

  const navigate = useCallback(() => {
    const { title, year, fileId, id, file } = props;
    const params = new URLSearchParams({
      title,
      year,
      fileId,
      id,
      url: file.url,
    });
    const query = params.toString();

    router.push("/movie?" + query, undefined, { locale: router.locale });
  }, [props, router]);

  return (
    <div
      className="p-2 bg-maasstricht-blue rounded-lg w-full hover:cursor-pointer"
      onClick={navigate}
    >
      <div className=" h-[200px] relative">
        <Image
          src={props.file.url}
          fill
          alt="album"
          className="rounded-lg object-cover"
        />
      </div>
      <p className="body-large">{props.title}</p>
      <p className="body-small">{props.year}</p>
    </div>
  );
}

export default memo(Movies);
