"use client";

import Image from "next/image";
import { Artwork } from "@/types";
import { useState } from "react";

type Props = {
  selectedArt: { art: Artwork; type: "original" | "print" } | null;
  onClose: () => void;
  onAddToCart: (item: {
    id: string;
    title: string;
    imageUrl: string;
    price: number | null;
  }) => void;
};

export default function ArtModal({ selectedArt, onClose, onAddToCart }: Props) {
  const [quantity, setQuantity] = useState(1);

  if (!selectedArt) return null;

  const max =
    selectedArt.type === "print"
      ? selectedArt.art.amountPrint ?? 0
      : selectedArt.art.amount ?? 0;

  const isAvailable =
    selectedArt.type === "print"
      ? (selectedArt.art.amountPrint ?? 0) > 0
      : !selectedArt.art.isSold &&
        selectedArt.art.toSell &&
        (selectedArt.art.amount ?? 0) > 0;

  const handleQuantityChange = (value: number) => {
    if (value < 1) setQuantity(1);
    else if (value > max) setQuantity(max);
    else setQuantity(value);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          ✖
        </button>

        <Image
          src={selectedArt.art.imageUrl}
          alt={selectedArt.art.title}
          width={500}
          height={400}
          className="w-full max-h-[400px] object-contain rounded-lg mb-4 bg-gray-100"
        />

        <h2 className="text-2xl font-bold mb-1">
          {selectedArt.art.title}{" "}
          {selectedArt.type === "print" && (
            <span className="text-sm text-blue-600">(Print)</span>
          )}
        </h2>

        <p className="text-xl font-semibold text-primary mb-4">
          {selectedArt.type === "print"
            ? `R$ ${selectedArt.art.pricePrint?.toFixed(2)}`
            : selectedArt.art.price
            ? `R$ ${selectedArt.art.price.toFixed(2)}`
            : "Sob consulta"}
        </p>

        {!isAvailable ? (
          <p className="text-red-500 font-medium mt-4">
            Produto indisponível.
          </p>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-medium">Quantidade:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={max}
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(Number(e.target.value))
                  }
                  className="w-16 text-center border-l border-r dark:bg-gray-800"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">Máx: {max}</span>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onAddToCart({
                    id:
                      selectedArt.type === "print"
                        ? selectedArt.art.id + "-print"
                        : selectedArt.art.id,
                    title:
                      selectedArt.art.title +
                      (selectedArt.type === "print" ? " (Print)" : ""),
                    imageUrl: selectedArt.art.imageUrl,
                    price:
                      selectedArt.type === "print"
                        ? selectedArt.art.pricePrint
                        : selectedArt.art.price,
                  });
                  onClose();
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 shadow-md"
              >
                Adicionar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
