import { create } from "zustand";
import { CartItem, OrderStatus } from "../types";

interface CartState {
  items: CartItem[];
  orderStatus: OrderStatus;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  clearCart: () => void;
  checkout: (shouldFail?: boolean) => Promise<OrderStatus>;
  resetOrderStatus: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  orderStatus: OrderStatus.Idle,
  addItem: (productId) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return { items: [...state.items, { productId, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),
  decrementItem: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.productId === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ items: [] }),
  checkout: async (shouldFail = false) => {
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    const status = shouldFail ? OrderStatus.Failed : OrderStatus.Success;
    set({ orderStatus: status, items: shouldFail ? get().items : [] });
    return status;
  },
  resetOrderStatus: () => set({ orderStatus: OrderStatus.Idle }),
}));
