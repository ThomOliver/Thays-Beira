"use client";

import Image from "next/image";
import { Artwork } from "@/types";
import ArtworkInfoRow from "./ArtworkInfoRow";
import ArtworkActions from "./ArtworkActions";
import { formatCurrency } from "@/utils/formatters";
import { getFieldByLang } from "@/utils/i18n";
import { useTranslation } from "react-i18next";

interface ArtworkDetailsProps {
  artwork: Artwork;
}

export default function ArtworkDetails({ artwork }: ArtworkDetailsProps) {
  const { i18n, t } = useTranslation("common");

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex-1 order-1">
          <Image
            src={artwork.imageUrl}
            alt={getFieldByLang(artwork, "title", i18n.language)}
            width={800}
            height={600}
            className="rounded-lg object-cover shadow-lg w-full h-auto"
            priority
          />
        </div>

        <div className="flex-1 order-2 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            {getFieldByLang(artwork, "title", i18n.language)}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <ArtworkInfoRow label={t("Year")} value={artwork.ano} />

            <ArtworkInfoRow
              label={t("Material")}
              value={getFieldByLang(artwork, "material", i18n.language)}
            />

            <ArtworkInfoRow
              label={t("Dimensions")}
              value={
                getFieldByLang(artwork, "description", i18n.language) ||
                artwork.metric
              }
            />

            <ArtworkInfoRow
              label={t("Price")}
              value={formatCurrency(artwork.price)}
            />

            <div className="flex items-center gap-2">
              <span className="font-medium">{t("Status")}:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                ${artwork.isSold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
              >
                {artwork.isSold ? t("Sold") : t("Available")}
              </span>
            </div>

            {artwork.isPrint && (
              <ArtworkInfoRow
                label={t("Print")}
                value={`${formatCurrency(artwork.pricePrint)} (${artwork.amountPrint} un.)`}
              />
            )}
          </div>

          <div>
            <ArtworkActions artwork={artwork} />
          </div>
        </div>
      </div>
    </div>
  );
}
