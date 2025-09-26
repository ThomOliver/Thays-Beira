"use client";

import Image from "next/image";
import { Exhibition } from "@/types";
import { useTranslation } from "react-i18next";
import { getFieldByLang } from "@/utils/i18n";

interface ExhibitionDetailsProps {
  exhibition: Exhibition;
}

export default function ExhibitionDetails({ exhibition }: ExhibitionDetailsProps) {
  const { i18n, t } = useTranslation("common");

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 space-y-8">
      {exhibition.imageUrl && (
        <Image
          src={exhibition.imageUrl}
          alt={getFieldByLang(exhibition, "title", i18n.language)} 
          width={1200}
          height={800}
          className="rounded-lg object-cover shadow-lg w-full h-auto"
          priority
        />
      )}

      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {getFieldByLang(exhibition, "title", i18n.language)} 
        </h1>

        {exhibition.description && (
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {getFieldByLang(exhibition, "description", i18n.language)}
          </p>
        )}

        <div className="text-sm text-secondary">
          <span className="font-medium">{t("Date")}: </span>
          {new Date(exhibition.date).toLocaleDateString("pt-BR")}
        </div>
      </div>
    </div>
  );
}
