"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArtistBySlug } from "@/services/artistService";
import { Artwork } from "@/types";
import { useArtistStore } from "@/store/artistStore";
import ArtworkDetails from "@/app/components/ArtworkDetails";
import ArtworkLoader from "@/app/components/ArtworkLoader";
import ArtworkNotFound from "@/app/components/ArtworkNotFound";

export default function ObraPage() {
  const { artworkId } = useParams();
  const { slug, setLoading, setError } = useArtistStore();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoadingLocal] = useState(true);

  useEffect(() => {
    if (!slug || !artworkId) return;

    const fetchArtwork = async () => {
      try {
        setLoading(true);
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

  if (loading) return <ArtworkLoader message="Carregando loja..." />;
  if (!artwork) return <ArtworkNotFound />;

  return <ArtworkDetails artwork={artwork} />;
}
