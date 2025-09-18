"use client";

import Image from "next/image";
import { CartItem } from "@/store/cartStore";
import { useCart } from "@/hooks/useCart";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const { removeFromCart } = useCart();

  return (
    <div
      key={item.id + "-" + item.type}
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
        {item.type && <p className="text-sm text-gray-400">Tipo: {item.type}</p>}
        <p className="text-gray-500">
          {item.quantity} x R$ {item.price?.toFixed(2) ?? "Consultar"}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item.id, item.type)}
        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Remover
      </button>
    </div>
  );
};
