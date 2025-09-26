"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArtistBySlug } from "@/services/artistService";
import { Exhibition } from "@/types";
import { useArtistStore } from "@/store/artistStore";
import ExhibitionDetails from "@/app/components/ExhibitionDetails";
import ArtworkLoader from "@/app/components/ArtworkLoader";
import ArtworkNotFound from "@/app/components/ArtworkNotFound";
import { useTranslation } from "react-i18next";

export default function ExhibitionPage() {
  const { t } = useTranslation("common");
  const { exhibitionId } = useParams();
  const { slug, setLoading, setError } = useArtistStore();
  const [exhibition, setExhibition] = useState<Exhibition | null>(null);
  const [loading, setLoadingLocal] = useState(true);

  useEffect(() => {
    if (!slug || !exhibitionId) return;

    const fetchExhibition = async () => {
      try {
        setLoading(true);
        const data = await getArtistBySlug(slug);

        const found = (data.exhibitions as Exhibition[]).find(
          (ex) => ex.id === exhibitionId
        );
        setExhibition(found || null);
      } catch (error) {
        console.error("Erro ao carregar exposição:", error);
        setError?.("Não foi possível carregar a exposição.");
      } finally {
        setLoading(false);
        setLoadingLocal(false);
      }
    };

    fetchExhibition();
  }, [slug, exhibitionId, setLoading, setError]);

  if (loading) return <ArtworkLoader message={t("Loading")} />;
  if (!exhibition) return <ArtworkNotFound />;

  return <ExhibitionDetails exhibition={exhibition} />;
}
