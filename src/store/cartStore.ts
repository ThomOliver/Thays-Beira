import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  imageUrl: string;
  price: number | null;
  quantity: number;
  type?: "original" | "print";
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  decreaseQuantity: (id: string, type?: "original" | "print") => void;
  updateQuantity: (id: string, quantity: number, type?: "original" | "print") => void;
  removeFromCart: (id: string, type?: "original" | "print") => void;
  clearCart: () => void;
  subtotal: () => number;
  totalItems: () => number;
  hasItem: (id: string, type?: "original" | "print") => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      subtotal: () =>
        get().items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0),

      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      hasItem: (id, type) =>
        get().items.some((i) => i.id === id && (type ? i.type === type : true)),

      addToCart: (item) =>
        set((state) => {
          const qty = Math.max(item.quantity ?? 1, 1);
          const existing = state.items.find(
            (i) => i.id === item.id && i.type === item.type
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.type === item.type
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: qty }] };
        }),

      decreaseQuantity: (id, type) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && (type ? i.type === type : true)
              ? { ...i, quantity: Math.max(i.quantity - 1, 1) }
              : i
          ),
        })),

      updateQuantity: (id, quantity, type) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && (type ? i.type === type : true)
              ? { ...i, quantity: Math.max(quantity, 1) }
              : i
          ),
        })),

      removeFromCart: (id, type) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && (type ? i.type === type : true))
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);
