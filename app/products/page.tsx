// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { ProductCard } from '@/components/ProductCard';
import { CategoryTabs } from '@/components/CategoryTabs';

export default function ProductsPage() {
  const { products, setProducts } = useStore();
  const [activeCategory, setActiveCategory] = useState('donuts');
  
  useEffect(() => {
    // For this demo, we'll use static data instead of the dummyjson API
    // as we want to match the design exactly
    const demoProducts = [
      {
        id: 1,
        title: 'Unicorn Sprinkles',
        description: 'Strawberry creamy with rainbow sprinkles',
        price: 7.8,
        rating: 4.0,
        category: 'donuts',
        images: ['/unicorn-sprinkles.jpg']
      },
      // Add other products...
    ];
    setProducts(demoProducts);
  }, []);

  const categories = [
    { id: 'donuts', name: 'Donuts' },
    { id: 'ice-cream', name: 'Ice Cream' },
    { id: 'bomboloni', name: 'Bomboloni' },
  ];

  return (
    <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}