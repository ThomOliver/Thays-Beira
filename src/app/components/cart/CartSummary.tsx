"use client";

import { useTranslation } from "react-i18next";

interface CartSummaryProps {
  subtotal: number;
  frete: number;
  onClear: () => void;
  onCheckout: () => void;
}

export const CartSummary = ({ subtotal, frete, onClear, onCheckout }: CartSummaryProps) => {
  const total = subtotal + frete;
  const { t } = useTranslation();
  return (
    <div className="mt-8 flex justify-between items-center">
      <span className="text-2xl font-bold">{t('Total')}: R$ {total.toFixed(2)}</span>
      <div className="flex gap-4">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          {t("Clean")}
        </button>
        <button
          onClick={onCheckout}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
        >
          {t("Checkout")}
        </button>
      </div>
    </div>
  );
};
