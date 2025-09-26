"use client";

import Image from "next/image";
import { CartItem } from "@/store/cartStore";
import { useCart } from "@/hooks/useCart";
import { getFieldByLang } from "@/utils/i18n";
import { useTranslation } from "react-i18next";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const { removeFromCart } = useCart();
  const { i18n, t } = useTranslation();

  return (
    <div
      key={item.id + "-" + item.type}
      className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
    >
      <Image
        src={item.imageUrl}
        alt={getFieldByLang(item, "title", i18n.language)}
        width={100}
        height={80}
        className="rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{getFieldByLang(item, "title", i18n.language)}</h3>
        {item.type && <p className="text-sm text-gray-400">Tipo: {item.type}</p>}
        <p className="text-gray-500">
          {item.quantity} x R$ {item.price?.toFixed(2) ?? "Consultar"}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item.id, item.type)}
        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
       {t("Remove")}
      </button>
    </div>
  );
};
