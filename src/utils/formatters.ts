export const formatCurrency = (value: number | null): string => {
  if (value === null) return "Sob consulta";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
