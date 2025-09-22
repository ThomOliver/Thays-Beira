import Image from "next/image";
import { Exhibition } from "@/types";

interface ExhibitionDetailsProps {
  exhibition: Exhibition;
}

export default function ExhibitionDetails({ exhibition }: ExhibitionDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 space-y-8">

      {exhibition.imageUrl && (
        <Image
          src={exhibition.imageUrl}
          alt={exhibition.title}
          width={1200}
          height={800}
          className="rounded-lg object-cover shadow-lg w-full h-auto"
          priority
        />
      )}


      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          {exhibition.title}
        </h1>

        {exhibition.description && (
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {exhibition.description}
          </p>
        )}

        <div className="text-sm text-secondary">
          <span className="font-medium">Data: </span>
          {new Date(exhibition.date).toLocaleDateString("pt-BR")}
        </div>
      </div>
    </div>
  );
}
