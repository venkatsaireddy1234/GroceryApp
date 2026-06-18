import { create } from "zustand";
import { products } from "../data/catalog";
import { Product, ProductCategory } from "../types";

interface ProductState {
  products: Product[];
  favorites: string[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: ProductCategory | "all";
  maxPrice: number;
  inStockOnly: boolean;
  loadProducts: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: ProductCategory | "all") => void;
  setMaxPrice: (price: number) => void;
  setInStockOnly: (enabled: boolean) => void;
  toggleFavorite: (productId: string) => void;
  clearFilters: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  favorites: ["banana", "sourdough"],
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "all",
  maxPrice: 15,
  inStockOnly: false,
  loadProducts: async () => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    set({ products, isLoading: false });
  },
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setInStockOnly: (inStockOnly) => set({ inStockOnly }),
  toggleFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)
        : [...state.favorites, productId],
    })),
  clearFilters: () =>
    set({
      searchTerm: "",
      selectedCategory: "all",
      maxPrice: 15,
      inStockOnly: false,
    }),
}));
