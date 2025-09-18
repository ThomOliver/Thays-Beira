"use client";

import { Artwork } from "@/types";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface HeroSliderProps {
  artworks: Artwork[];
}

const HeroSlider = ({ artworks }: HeroSliderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = useMemo(() => {
    if (!artworks || artworks.length <= 1) return [];
    return artworks.slice(1).map((art) => (
      <SwiperSlide key={art.id}>
        <div className="relative w-full h-[500px]">
          <Image
            src={art.imageUrl}
            alt={art.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            placeholder="empty"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
            <h2 className="text-3xl font-bold">{art.title}</h2>
            {art.description && (
              <p className="text-sm mt-2 max-w-lg">{art.description}</p>
            )}
          </div>
        </div>
      </SwiperSlide>
    ));
  }, [artworks]);

  if (!artworks || artworks.length === 0) return null;

  const firstArt = artworks[0];

  return (
    <>
      <div className="relative w-full h-[500px]">
        <Image
          src={firstArt.imageUrl}
          alt={firstArt.title}
          fill
          sizes="100vw"
          priority
          placeholder="empty"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
          <h2 className="text-3xl font-bold">{firstArt.title}</h2>
          {firstArt.description && (
            <p className="text-sm mt-2 max-w-lg">{firstArt.description}</p>
          )}
        </div>
      </div>

      {mounted && artworks.length > 1 && (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-full h-[500px] mt-[-500px]"
        >
          <SwiperSlide key={firstArt.id}>
            <div className="relative w-full h-[500px]">
              <Image
                src={firstArt.imageUrl}
                alt={firstArt.title}
                fill
                sizes="100vw"
                priority
                placeholder="empty"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
                <h2 className="text-3xl font-bold">{firstArt.title}</h2>
                {firstArt.description && (
                  <p className="text-sm mt-2 max-w-lg">{firstArt.description}</p>
                )}
              </div>
            </div>
          </SwiperSlide>

          {slides}
        </Swiper>
      )}
    </>
  );
};

HeroSlider.displayName = "HeroSlider";
export default HeroSlider;
