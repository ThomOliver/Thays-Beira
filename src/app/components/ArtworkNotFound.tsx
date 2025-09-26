import { useTranslation } from "react-i18next";

export default function ArtworkNotFound() {
  const { t } = useTranslation("common");
  
  return (
    <div className="text-center mt-20">
      <p className="text-lg opacity-75">{t("WorkNotFound")}</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        {t("Back")}
      </button>
    </div>
  );
}
