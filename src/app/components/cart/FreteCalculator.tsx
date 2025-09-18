"use client";

import { useState } from "react";
import axios from "axios";

interface Frete {
  valor: string;
  prazo: string;
}

interface FreteCalculatorProps {
  onChange: (frete: Frete | null) => void;
}

export const FreteCalculator = ({ onChange }: FreteCalculatorProps) => {
  const [frete, setFrete] = useState<Frete | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);

  const calcularFrete = async () => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      setErro("Digite um CEP válido (8 dígitos).");
      setFrete(null);
      setAviso(null);
      onChange(null);
      return;
    }

    try {
      setErro(null);
      setAviso(null);
      setLoading(true);

      const res = await axios.post("/api/frete", { cepDestino: cepLimpo });

      if (res.data.erro) {
        setErro(res.data.erro);
        setFrete(null);
        setAviso(null);
        onChange(null);
        return;
      }

      const novoFrete = { valor: res.data.valor!, prazo: res.data.prazo! };
      setFrete(novoFrete);
      onChange(novoFrete);

      if (res.data.aviso) {
        setAviso(res.data.aviso);
      }
    } catch (error) {
      console.error(error);
      setErro("Erro ao calcular frete. Tente novamente.");
      setFrete(null);
      setAviso(null);
      onChange(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <label className="block mb-2 font-semibold">Calcular frete:</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          className="px-3 py-2 border rounded-lg w-48"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <button
          type="button"
          onClick={calcularFrete}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Calculando..." : "Calcular"}
        </button>
      </div>

      {erro && <p className="mt-2 text-red-500">{erro}</p>}

      {frete && (
        <div className="mt-2">
          <p className="text-green-700">
            Frete: R$ {frete.valor.replace(".", ",")} — Prazo: {frete.prazo} dias
          </p>
          {aviso && (
            <p className="text-sm text-gray-500 italic">Aviso: {aviso}</p>
          )}
        </div>
      )}
    </div>
  );
};
