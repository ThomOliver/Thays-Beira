"use client";

import Image from "next/image";
import { Artwork } from "@/types";
import { useTranslation } from "react-i18next";
import { getFieldByLang } from "@/utils/i18n";

interface Category {
  namePt: string;
  nameEn: string;
  nameEs: string;
  nameCn: string;
}

interface ArtworkCardProps {
  art: Artwork;
  type: "original" | "print";
  category?: Category | undefined;
  onSelect: () => void;
}

const ArtworkCard = ({ art, type, category, onSelect }: ArtworkCardProps) => {
  const { i18n, t } = useTranslation("common");

  const isOriginal = type === "original";
  const isSoldOut =
    isOriginal ? art.isSold || (art.amount ?? 0) <= 0 : (art.amountPrint ?? 0) <= 0;

  const translatedTitle = getFieldByLang(art, "title", i18n.language);
  const translatedCategoryName = category ? getFieldByLang(category, "name", i18n.language) : "";

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg 
        ${isOriginal ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700 border border-dashed border-gray-400"}`}
    >
      <button onClick={onSelect} className="w-full">
        <Image
          src={art.imageUrl}
          alt={isOriginal ? translatedTitle : `${translatedTitle} (${t("Print")})`}
          width={400}
          height={300}
          className={`w-full h-64 object-cover ${!isOriginal ? "opacity-90" : ""}`}
        />
      </button>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">
          {translatedTitle} {!isOriginal && <span className="text-xs">({t("Print")})</span>}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {isOriginal ? translatedCategoryName : `${t("Print")} • ${translatedCategoryName}`}
        </p>

        <div className="flex justify-between items-center">
          <span className={`font-bold text-xl ${!isOriginal ? "text-blue-600" : ""}`}>
            {isOriginal
              ? art.isSold
                ? t("Sold")
                : art.price
                ? `R$ ${art.price.toFixed(2)}`
                : t("OnRequest")
              : `R$ ${art.pricePrint?.toFixed(2)}`}
          </span>

          {isSoldOut ? (
            <span className="px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed">
              {t("OutOfStock")}
            </span>
          ) : (
            <button
              onClick={onSelect}
              className={`px-4 py-2 rounded-lg ${
                isOriginal ? "bg-secondary" : "bg-blue-500"
              } text-white hover:opacity-90 transition`}
            >
              {t("SeeMore")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
