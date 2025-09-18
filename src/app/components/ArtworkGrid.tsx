"use client";

import { Artwork } from "@/types";
import ArtworkCard from "./ArtworkCard";

interface ArtworkGridProps {
  title: string;
  artworks: Artwork[];
}

const ArtworkGrid = ({ title, artworks }: ArtworkGridProps) => {
  if (artworks.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <ArtworkCard key={art.id} art={art} />
        ))}
      </div>
    </div>
  );
};
export default ArtworkGrid;