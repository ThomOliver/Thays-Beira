"use client";

import { Artwork } from "@/types";
import { useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import HeroSlideImage from "./HeroSlideImage";

interface HeroSliderProps {
  artworks: Artwork[];
}

const HeroSlider = ({ artworks }: HeroSliderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!artworks || artworks.length === 0) return null;

  const firstArt = artworks[0];

  const slides = useMemo(() => {
    if (artworks.length <= 1) return [];
    return artworks.slice(1).map((art) => (
      <SwiperSlide key={art.id}>
        <HeroSlideImage art={art} />
      </SwiperSlide>
    ));
  }, [artworks]);

  return (
    <>

      <HeroSlideImage art={firstArt} priority />

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
            <HeroSlideImage art={firstArt} priority />
          </SwiperSlide>
          {slides}
        </Swiper>
      )}
    </>
  );
};

HeroSlider.displayName = "HeroSlider";
export default HeroSlider;
