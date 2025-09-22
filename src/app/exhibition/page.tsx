"use client";
import React from "react";
import { useArtistStore } from "@/store/artistStore";
import ExhibitionCard from "@/app/components/ExhibitionCard";

export default function ExhibitionsPage() {
  const artist = useArtistStore((s) => s.artist);

  if (!artist || !artist.exhibitions || artist.exhibitions.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-10 text-text">
        <h1 className="text-3xl font-bold mb-8 text-primary">Exposições</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Nenhuma exposição encontrada.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-text dark:text-text p-6">
      <h1 className="text-3xl font-bold mb-8 text-text mt-10">Exposições</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {artist.exhibitions.map((ex) => (
          <ExhibitionCard key={ex.id} ex={ex} />
        ))}
      </div>
    </main>
  );
}
