import Image from "next/image";
import { useRouter } from "next/router";
import { title } from "process";
import { memo, useCallback } from "react";

export type Movie = {
  title: string;
  year: string;
  url: string;
  id: string;
};

function Movies(props: Movie) {
  const router = useRouter();

  const navigate = useCallback(() => {
    const params = new URLSearchParams(props);
    const query = params.toString();

    router.push("/movie?" + query);
  }, [props, router]);

  return (
    <div
      className="p-2 bg-maasstricht-blue rounded-lg w-full hover:cursor-pointer"
      onClick={navigate}
    >
      <Image
        src={props.url}
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
