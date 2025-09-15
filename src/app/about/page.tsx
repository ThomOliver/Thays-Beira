"use client";

import { useArtistData } from "@/hooks/useArtistData";
import { ArtistAbout } from "../components/ArtistAbout";
import { useArtistStore } from "@/store/artistStore";
import { PageState } from "../components/PageStateProps";

const Abouth = () => {
   const { slug } = useArtistStore();
   const { artist, loading, error } = useArtistData(slug);
   if (loading) return <PageState type="loading" message="Carregando..." />;
   if (error || !artist) return <PageState type="error" message="Artista não encontrado." />;

  return (
    <div className="min-h-screen bg-bg dark:bg-bg text-text dark:text-text p-0">
      <p>Sobre mim</p>
       <ArtistAbout artist={artist} />
   </div>
  );
};

export default Abouth;
