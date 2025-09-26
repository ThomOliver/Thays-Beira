"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getFieldByLang } from "@/utils/i18n";

interface ExhibitionCardProps {
  ex: {
    id: string;
    title: string;
    description?: string | null;
    imageUrl?: string | null;
    date: string;
  };
}

const ExhibitionCard = ({ ex }: ExhibitionCardProps) => {
  const { i18n } = useTranslation(); 

  return (
    <Link
      href={`/exhibition/${ex.id}`}
      className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-bg"
    >
      {ex.imageUrl && (
        <Image
          src={ex.imageUrl}
          alt={getFieldByLang(ex, "title", i18n.language)}
          width={400}
          height={320}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold">
          {getFieldByLang(ex, "title", i18n.language)}
        </h3>
        {ex.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {getFieldByLang(ex, "description", i18n.language)} 
          </p>
        )}
        <p className="text-xs mt-2 text-secondary">
          {new Date(ex.date).toLocaleDateString("pt-BR")}
        </p>
      </div>
    </Link>
  );
};

export default ExhibitionCard;
