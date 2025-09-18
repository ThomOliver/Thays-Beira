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

  const calcularFrete = async (cep: string) => {
    if (!cep) return;
    try {
      const res = await axios.post("/api/frete", { cepDestino: cep });
      setFrete(res.data);
      onChange(res.data);
    } catch {
      alert("Erro ao calcular frete");
    }
  };

  return (
    <div className="mt-6">
      <label className="block mb-2">Calcular frete:</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite seu CEP"
          className="px-3 py-2 border rounded-lg w-48"
          onBlur={(e) => calcularFrete(e.target.value)}
        />
      </div>
      {frete && (
        <p className="mt-2">
          Frete: R$ {frete.valor} — Prazo: {frete.prazo} dias
        </p>
      )}
    </div>
  );
};
