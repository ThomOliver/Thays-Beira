"use client";

import { Artwork } from "@/types";
import { getFieldByLang } from "@/utils/i18n";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ArtworkCardProps {
  art: Artwork;
}

const ArtworkCard = ({ art }: ArtworkCardProps) => {
  const { i18n } = useTranslation();
  return(
    <Link
      key={art.id}
      href={`/artwork/${art.id}`}
      className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Image
        src={art.imageUrl}
        alt={getFieldByLang(art, "title", i18n.language)} 
        width={400}
        height={320}
        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold">{getFieldByLang(art, "title", i18n.language)}</h3>
      </div>
    </Link>
)};

export default ArtworkCard;