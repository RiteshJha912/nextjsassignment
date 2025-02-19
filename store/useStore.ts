// store/useStore.ts

import { create } from 'zustand';
import { Product } from '@/types';

interface StoreState {
  products: Product[];
  selectedProduct: Product | null;
  quantity: number;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  resetQuantity: () => void;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  selectedProduct: null,
  quantity: 1,
  setProducts: (products) => set({ products }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  incrementQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
  decrementQuantity: () => set((state) => ({ quantity: Math.max(1, state.quantity - 1) })),
  resetQuantity: () => set({ quantity: 1 }),
}));