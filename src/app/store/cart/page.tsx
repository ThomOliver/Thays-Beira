"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import axios from "axios";

const CartPage = () => {
  const { items, removeFromCart, clearCart } = useCartStore();
  const [frete, setFrete] = useState<{ valor: string; prazo: string } | null>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

  const calcularFrete = async (cep: string) => {
    if (!cep) return;
    try {
      const res = await axios.post("/api/frete", { cepDestino: cep });
      setFrete(res.data);
    } catch (err) {
      alert("Erro ao calcular frete");
    }
  };

  const valorFrete = frete ? Number(frete.valor.replace(",", ".")) : 0;
  const total = subtotal + valorFrete;

  const handleCheckout = () => {
    const phoneNumber = "5541996413931";
    const message = `Olá! Gostaria de fazer o seguinte pedido:\n\n${items
      .map(
        (item) =>
          `• ${item.title} - ${item.quantity}x R$ ${
            item.price?.toFixed(2) ?? "Consultar"
          }`
      )
      .join("\n")}\n\nSubtotal: R$ ${subtotal.toFixed(2)}\nFrete: R$ ${
      frete?.valor ?? "0,00"
    } (Prazo: ${frete?.prazo ?? "0"} dias)\nTotal: R$ ${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl">Seu carrinho está vazio 🛒</p>
      </div>
    );
  }

  return (
    <section className="p-6 min-h-screen bg-bg text-text">
      <h1 className="text-3xl font-bold mb-6">Carrinho</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={100}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500">
                {item.quantity} x R$ {item.price?.toFixed(2) ?? "Consultar"}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      {/* Calcular Frete */}
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

      <div className="mt-8 flex justify-between items-center">
        <span className="text-2xl font-bold">
          Total: R$ {total.toFixed(2)}
        </span>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Limpar
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
