"use client";

import { useArtistData } from "@/hooks/useArtistData";
import { ArtistAbout } from "../components/ArtistAbout";
import { useArtistStore } from "@/store/artistStore";
import { PageState } from "../components/PageStateProps";
import { useTranslation } from "react-i18next";

const Abouth = () => {
   const { slug } = useArtistStore();
   const { t } = useTranslation("common");
   const { artist, loading, error } = useArtistData(slug);
   if (loading) return <PageState type="loading" message="Carregando..." />;
   if (error || !artist) return <PageState type="error" message="Artista não encontrado." />;

  return (
  <main className="min-h-screen text-text dark:text-text p-6">
      <p>{t("About")}</p>
       <ArtistAbout artist={artist} />
   </main>
  );
};

export default Abouth;
