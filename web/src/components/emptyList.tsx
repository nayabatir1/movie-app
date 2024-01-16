import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { memo } from "react";

function EmptyList() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const addMovie = () => {
    router.push("/movie", undefined, { locale: router.locale });
  };

  return (
    <div className="flex flex-col items-center">
      <h2>{t("emptyList")}</h2>
      <button
        className="bg-green  mt-5 py-4 rounded-lg w-[202px]"
        onClick={addMovie}
      >
        {t("addMovie")}
      </button>
    </div>
  );
}

export default memo(EmptyList);
