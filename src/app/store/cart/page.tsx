"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { CartItemCard } from "@/app/components/cart/CartItemCard";
import { FreteCalculator } from "@/app/components/cart/FreteCalculator";
import { CartSummary } from "@/app/components/cart/CartSummary";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { items, clearCart, subtotal, totalItems } = useCart();
  const { t } = useTranslation("common");
  const [frete, setFrete] = useState<{ valor: string; prazo: string } | null>(null);

  const valorFrete = frete ? Number(frete.valor.replace(",", ".")) : 0;

  const handleCheckout = () => {
    const phoneNumber = "5541996413931";
    const message = `${t("WhatsMensage")}\n\n${items
      .map(
        (item) =>
          `• ${item.title} (${item.type ?? "padrão"}) - ${item.quantity}x R$ ${
            item.price?.toFixed(2) ?? "Consultar"
          }`
      )
      .join("\n")}\n\nSubtotal: R$ ${subtotal.toFixed(2)}\nFrete: R$ ${
      frete?.valor ?? "0,00"
    } (Prazo: ${frete?.prazo ?? "0"} dias)\n${t("Total")}: R$ ${(subtotal + valorFrete).toFixed(2)}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl">{t("YourCartIsEmpty")} 🛒</p>
      </div>
    );
  }

  return (
    <section className="p-6 min-h-screen bg-bg text-text">
      <h1 className="text-3xl font-bold mb-6">{t("Cart")} ({totalItems} {t("Items")})</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <CartItemCard key={item.id + "-" + item.type} item={item} />
        ))}
      </div>

      <FreteCalculator onChange={setFrete} />

      <CartSummary
        subtotal={subtotal}
        frete={valorFrete}
        onClear={clearCart}
        onCheckout={handleCheckout}
      />
    </section>
  );
};

export default CartPage;
