"use client";

import { Artwork } from "@/types";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState, useMemo } from "react";

// Swiper só carrega quando for necessário
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface HeroSliderProps {
  artworks: Artwork[];
}

const HeroSlider = ({ artworks }: HeroSliderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!artworks || artworks.length === 0) return null;

  const firstArt = artworks[0];

  // Slides do Swiper (menos o primeiro)
  const slides = useMemo(
    () =>
      artworks.slice(1).map((art, index) => (
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
      )),
    [JSON.stringify(artworks)]
  );

  return (
    <>
      {/* Preload da primeira imagem */}
      <Head>
        <link rel="preload" as="image" href={firstArt.imageUrl} />
      </Head>

      {/* Primeiro slide renderizado estático (garante LCP rápido) */}
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

      {/* Swiper só carrega depois que o componente montar */}
      {mounted && artworks.length > 1 && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-[500px] mt-[-500px]" // sobrepõe no mesmo espaço
        >
          {/* Primeiro slide dentro do Swiper também */}
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

          {/* Demais slides */}
          {slides}
        </Swiper>
      )}
    </>
  );
};

export default HeroSlider;
