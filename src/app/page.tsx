"use client";

import { useEffect } from "react";
import { useArtistStore } from "@/store/artistStore";
import { getArtistBySlug } from "@/services/artistService";
import { Artwork, Category } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CategoriesSection = ({
  categories,
  artworks,
  artistSlug,
}: {
  categories: Category[];
  artworks: Artwork[];
  artistSlug: string;
}) => {
  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold mb-4">Categorias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => {
          const artwork = artworks.find(
            (art) => art.categoryId === category.id && art.position === 1
          );

          return (
            <Link
              key={category.id}
              href={`/artista/${artistSlug}/categoria/${encodeURIComponent(category.id)}`}
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
                {artwork ? (
                  <>
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                      <p className="text-sm opacity-90">{artwork.title}</p>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

const ArtistPortfolioPage = () => {
  const artistSlug = "thays-beira";
  const { artist, setArtist, setLoading, loading, setError } = useArtistStore();

  useEffect(() => {
    setLoading(true);
    getArtistBySlug(artistSlug)
      .then((data) => {
        setArtist(data);
      })
      .catch(() => {
        setError("Não foi possível carregar os dados do artista.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [artistSlug, setArtist, setLoading, setError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl animate-pulse">Carregando...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-500">Artista não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-0">
      
      {artist.artworks && artist.artworks.length > 0 && (
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
          {artist.artworks.map((art) => (
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
      )}

      {/* Dados do artista */}
      <header className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8 mt-8">
        <div className="flex-shrink-0 w-48 h-48 lg:w-1/2 lg:h-auto">
          <img
            src={artist.profilePic || "https://placehold.co/800x1000"}
            alt={artist.name}
            className="w-full h-full object-cover shadow-lg rounded-full lg:rounded-none"
          />
        </div>

        <div className="lg:w-1/2 text-center lg:text-left p-8">
          <h1 className="text-5xl font-extrabold mb-4">
            Sobre {artist.name}
          </h1>
          <p className="text-xl leading-relaxed">{artist.bio}</p>
        </div>
      </header>

      {/* Categorias */}
      {artist.categories && artist.artworks && (
        <CategoriesSection
          categories={artist.categories}
          artworks={artist.artworks}
          artistSlug={artistSlug}
        />
      )}
    </div>
  );
};

export default ArtistPortfolioPage;
