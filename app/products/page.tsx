// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';
import { CategoryTabs } from '@/components/CategoryTabs';
import { apiService } from '@/services/api';
import { Product } from '@/types';

export default function ProductsPage() {
  const { products, setProducts } = useStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and initial products
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        // Fetch all products first to get initial data
        const allProducts = await apiService.getAllProducts();
        setProducts(allProducts);
        
        // Extract unique categories from products
        const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      } catch (err) {
        setError('Failed to load products');
        console.error('Initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []); // Only run on mount

  // Handle category changes
  useEffect(() => {
    const fetchProductsForCategory = async () => {
      if (!activeCategory) return;
      
      try {
        setLoading(true);
        const fetchedProducts = await apiService.getProductsByCategory(activeCategory);
        setProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products for category');
        console.error('Category products fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (activeCategory) {
      fetchProductsForCategory();
    }
  }, [activeCategory, setProducts]);

  // Format category name for display
  const formatCategoryName = (category: string): string => {
    return category
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedCategories = categories.map(category => ({
    id: category,
    name: formatCategoryName(category)
  }));

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
        <div className="flex justify-center items-center h-screen">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      
      {formattedCategories.length > 0 && (
        <CategoryTabs
          categories={formattedCategories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}