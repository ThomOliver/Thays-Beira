interface ArtworkInfoRowProps {
  label: string;
  value?: string | number | null;
}

export default function ArtworkInfoRow({ label, value }: ArtworkInfoRowProps) {
  if (!value) return null;
  return (
    <p className="flex justify-between border-b py-2 text-gray-700">
      <span className="font-medium">{label}:</span>
      <span>{value}</span>
    </p>
  );
}
