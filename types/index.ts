// types/index.ts

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  active?: boolean;
}