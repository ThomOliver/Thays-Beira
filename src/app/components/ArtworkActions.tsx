"use client";

import { Artwork } from "@/types";
import { useArtworkStore } from "@/store/artworkStore";
import { useRouter } from "next/navigation";

export default function ArtworkActions({ artwork }: { artwork: Artwork }) {
  const { setPendingArt, setQuantity } = useArtworkStore();
  const router = useRouter();

  const handleClick = (type: "original" | "print") => {
    setPendingArt({ art: artwork, type });
    setQuantity(1);
    router.push("/store");
  };

  return (
    <div className="mt-8 flex gap-4">
      {!artwork.isSold && artwork.toSell && (
        <button
          onClick={() => handleClick("original")}
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Comprar
        </button>
      )}
      {artwork.isPrint && (
        <button
          onClick={() => handleClick("print")}
          className="px-6 py-2 border rounded-lg hover:bg-gray-100"
        >
          Adquirir Print
        </button>
      )}
    </div>
  );
}
