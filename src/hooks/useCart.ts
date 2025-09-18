import { useCartStore } from "@/store/cartStore";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const totalItems = useCartStore((state) => state.totalItems());

  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const hasItem = useCartStore((state) => state.hasItem);

  return {
    items,
    subtotal,
    totalItems,
    addToCart,
    decreaseQuantity,
    updateQuantity,
    removeFromCart,
    clearCart,
    hasItem,
  };
}
