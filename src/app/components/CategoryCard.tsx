"use client";

import { Category, Artwork } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { getFieldByLang } from "@/utils/i18n";
import { useTranslation } from "react-i18next";

interface CategoryCardProps {
  category: Category;
  artwork?: Artwork;
}

export const CategoryCard = ({ category, artwork }: CategoryCardProps) => {
  const { i18n } = useTranslation();

  return (
    <Link href={`/artwork?category=${encodeURIComponent(category.id)}`}>
      <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
        {artwork ? (
          <>
            <div className="relative w-full h-80">
              <Image
                src={artwork.imageUrl}
                alt={getFieldByLang(artwork, "title", i18n.language)}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL="/placeholder.jpg"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-semibold">
                {getFieldByLang(category, "name", i18n.language)}
              </h3>
              <p className="text-sm opacity-90">
                {getFieldByLang(artwork, "title", i18n.language)}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <h3 className="text-xl font-semibold">
              {getFieldByLang(category, "name", i18n.language)}
            </h3>
          </div>
        )}
      </div>
    </Link>
  );
};
