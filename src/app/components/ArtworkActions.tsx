import { Artwork } from "@/types";

export default function ArtworkActions({ artwork }: { artwork: Artwork }) {
  return (
    <div className="mt-8 flex gap-4">
      {!artwork.isSold && artwork.toSell && (
        <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Comprar
        </button>
      )}
      {artwork.isPrint && (
        <button className="px-6 py-2 border rounded-lg hover:bg-gray-100">
          Adquirir Print
        </button>
      )}
    </div>
  );
}
