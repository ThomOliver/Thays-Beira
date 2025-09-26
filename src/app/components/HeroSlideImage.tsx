"use client";

import { Artwork } from "@/types";
import { getFieldByLang } from "@/utils/i18n";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface HeroSlideProps {
  art: Artwork;
  priority?: boolean;
}

const HeroSlideImage = ({ art, priority = false }: HeroSlideProps) => {
  const { i18n } = useTranslation();

  return (
    <div className="relative w-full h-[500px]">
      <Image
        src={art.imageUrl}
        alt={getFieldByLang(art, "title", i18n.language)} 
        fill
        sizes="100vw"
        priority={priority}
        placeholder="empty"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
        <h2 className="text-3xl font-bold">
          {getFieldByLang(art, "title", i18n.language)}
        </h2>
        {getFieldByLang(art, "description", i18n.language) && (
          <p className="text-sm mt-2 max-w-lg">
            {getFieldByLang(art, "description", i18n.language)}
          </p>
        )}
      </div>
    </div>
  );
};

HeroSlideImage.displayName = "HeroSlideImage";
export default HeroSlideImage;
