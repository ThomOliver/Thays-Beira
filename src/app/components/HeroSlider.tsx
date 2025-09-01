"use client";

import { Artwork } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export const HeroSlider = ({ artworks }: { artworks: Artwork[] }) => {
  if (!artworks.length) return null;

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className={`
        w-full h-[500px]
        [&_.swiper-button-next::after]:text-white 
        dark:[&_.swiper-button-next::after]:text-current
        [&_.swiper-button-prev::after]:text-white 
        dark:[&_.swiper-button-prev::after]:text-current
        [&_.swiper-pagination-bullet]:bg-white
        dark:[&_.swiper-pagination-bullet]:bg-gray-500
        [&_.swiper-pagination-bullet-active]:bg-gray-800
        dark:[&_.swiper-pagination-bullet-active]:bg-white
      `}
    >
      {artworks.map((art) => (
        <SwiperSlide key={art.id}>
          <div className="relative w-full h-[500px]">
            <img
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
              <h2 className="text-3xl font-bold">{art.title}</h2>
              {art.description && (
                <p className="text-sm mt-2 max-w-lg">{art.description}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
