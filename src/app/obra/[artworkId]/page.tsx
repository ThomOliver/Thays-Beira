"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { getArtistBySlug } from "@/services/artistService";
import { Artwork } from "@/types";
import { useArtistStore } from "@/store/artistStore";

export default function ObraPage() {
  const { artworkId } = useParams();
  const router = useRouter();
  const { slug, setLoading, setError } = useArtistStore(); // apenas setters usados

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoadingLocal] = useState(true);

  useEffect(() => {
    if (!slug || !artworkId) return;

    const fetchArtwork = async () => {
      try {
        setLoading(true); // Zustand loading
        const data = await getArtistBySlug(slug);
        const found = (data.artworks as Artwork[]).find(
          (art) => art.id === artworkId
        );
        setArtwork(found || null);
      } catch (error) {
        console.error("Erro ao carregar obra:", error);
        setError?.("Não foi possível carregar a obra.");
      } finally {
        setLoading(false);
        setLoadingLocal(false);
      }
    };

    fetchArtwork();
  }, [slug, artworkId, setLoading, setError]);

  console.log("URL da imagem:", artwork?.imageUrl);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl animate-pulse">Carregando obra...</p>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg opacity-75">Obra não encontrada.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-20">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Voltar
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Imagem convertida para Next/Image */}
<div className="w-full">
  <Image
    src={artwork.imageUrl}
    alt={artwork.title}
    width={800}
    height={600}
    className="rounded-lg object-cover shadow-lg w-full h-auto"
    priority
  />
</div>

        {/* Informações */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">{artwork.title}</h1>
          {artwork.description && (
            <p className="mt-4 text-lg opacity-80 leading-relaxed">
              {artwork.description}
            </p>
          )}
          {artwork.price && (
            <p className="mt-6 text-2xl font-semibold text-green-600 dark:text-green-400">
              Preço: R$ {Number(artwork.price).toLocaleString("pt-BR")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
