import Image from "next/image";
import { useRouter } from "next/router";
import { title } from "process";
import { memo, useCallback } from "react";
import { Movie } from "../pages/movie/types";

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
      <Image
        src={props.file.url}
        width={1000}
        height={600}
        layout="responsive"
        alt="album"
        className="rounded-lg"
      />

      <p className="body-large">{props.title}</p>
      <p className="body-small">{props.year}</p>
    </div>
  );
}

export default memo(Movies);
