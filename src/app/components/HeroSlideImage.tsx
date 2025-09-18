import { Artwork } from "@/types";
import Image from "next/image";

interface HeroSlideProps {
  art: Artwork;
  priority?: boolean;
}

const HeroSlideImage = ({ art, priority = false }: HeroSlideProps) => {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src={art.imageUrl}
        alt={art.title}
        fill
        sizes="100vw"
        priority={priority}
        placeholder="empty"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
        <h2 className="text-3xl font-bold">{art.title}</h2>
        {art.description && (
          <p className="text-sm mt-2 max-w-lg">{art.description}</p>
        )}
      </div>
    </div>
  );
};

HeroSlideImage.displayName = "HeroSlideImage";
export default HeroSlideImage;
