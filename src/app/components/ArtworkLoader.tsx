interface ArtworkLoaderProps {
  message?: string; 
  fullScreen?: boolean; 
}

export default function ArtworkLoader({ message = "Carregando...", fullScreen = true }: ArtworkLoaderProps) {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "h-screen" : "h-full py-10"
      }`}
    >
      <p className="text-2xl animate-pulse">{message}</p>
    </div>
  );
}
