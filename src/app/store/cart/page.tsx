"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

const CartPage = () => {
  const { items, removeFromCart, clearCart } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + (item.price ?? 0) * item.quantity,
    0
  );

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

      <div className="mt-8 flex justify-between items-center">
        <span className="text-2xl font-bold">Total: R$ {total.toFixed(2)}</span>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Limpar
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90">
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
