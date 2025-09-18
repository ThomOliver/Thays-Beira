export default function ArtworkNotFound() {
  return (
    <div className="text-center mt-20">
      <p className="text-lg opacity-75">Obra não encontrada.</p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        Voltar
      </button>
    </div>
  );
}
