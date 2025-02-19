// services/api.ts
import { Product } from '@/types';

const BASE_URL = 'https://dummyjson.com';

export interface ApiResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export const apiService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products?limit=100`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data: ApiResponse<Product> = await response.json();
    return data.products || [];
  },

  async getProduct(id: string): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    const data: ApiResponse<Product> = await response.json();
    return data.products || [];
  }
};