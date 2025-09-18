import Image from "next/image";
import { Artwork } from "@/types";
import ArtworkInfoRow from "./ArtworkInfoRow";
import ArtworkActions from "./ArtworkActions";
import { formatCurrency } from "@/utils/formatters";

interface ArtworkDetailsProps {
  artwork: Artwork;
}

export default function ArtworkDetails({ artwork }: ArtworkDetailsProps) {
  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">

      <div className="flex flex-col lg:flex-row gap-10">

        <div className="flex-1 order-1">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            width={800}
            height={600}
            className="rounded-lg object-cover shadow-lg w-full h-auto"
            priority
          />
        </div>

        <div className="flex-1 order-2 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
            {artwork.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <ArtworkInfoRow label="Ano" value={artwork.ano} />
            <ArtworkInfoRow label="Material" value={artwork.material} />
            <ArtworkInfoRow
            label="Dimensões"
            value={artwork.description || artwork.metric}
            />

            {/* Preço da obra */}
            <ArtworkInfoRow
            label="Preço"
            value={formatCurrency(artwork.price)}
            />

            {/* Status com badge */}
            <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <span
                className={`px-2 py-1 rounded-full text-xs font-semibold
                ${artwork.isSold ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
            >
                {artwork.isSold ? "Vendido" : "Disponível"}
            </span>
            </div>

            {/* Preço do Print */}
            {artwork.isPrint && (
            <ArtworkInfoRow
                label="Print"
                value={`${formatCurrency(artwork.pricePrint)} (${artwork.amountPrint} un.)`}
            />
            )}
        </div>

        <div>
            <ArtworkActions artwork={artwork} />
        </div>
        </div>

      </div>
    </div>
  );
}
