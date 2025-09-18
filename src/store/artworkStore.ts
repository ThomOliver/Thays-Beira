import { create } from "zustand";
import { Artwork } from "@/types";

type SelectedArt = {
  art: Artwork;
  type: "original" | "print";
} | null;

interface ArtworkState {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedArt: SelectedArt;
  setSelectedArt: (art: SelectedArt) => void;
  quantity: number;
  setQuantity: (qtd: number) => void;
}

export const useArtworkStore = create<ArtworkState>((set) => ({
  selectedCategory: "all",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  selectedArt: null,
  setSelectedArt: (art) => set({ selectedArt: art }),
  quantity: 1,
  setQuantity: (qtd) => set({ quantity: qtd }),
}));
