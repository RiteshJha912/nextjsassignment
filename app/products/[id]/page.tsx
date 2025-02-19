// app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Toast } from '@/components/Toast';

export default function ProductDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const { 
    selectedProduct, 
    setSelectedProduct,
    quantity,
    incrementQuantity,
    decrementQuantity,
    resetQuantity
  } = useStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // In a real app, fetch from API
    // For demo, use static data
    setSelectedProduct({
      id: 1,
      title: 'Unicorn Sprinkles',
      description: 'A fluffy fresh cooked donut covered by a creamy strawberry flavour with rainbow sprinkles.',
      price: 7.8,
      rating: 4.0,
      category: 'donuts',
      images: ['/unicorn-sprinkles.jpg']
    });
    resetQuantity();
  }, []);

  if (!selectedProduct) return null;

  return (
    <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
      <button 
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      
      <img
        src={selectedProduct.images[0]}
        alt={selectedProduct.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">{selectedProduct.title}</h1>
        <div className="flex items-center">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{selectedProduct.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-400 mb-4">{selectedProduct.description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={decrementQuantity}
            className="bg-gray-800 p-2 rounded-full"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button 
            onClick={incrementQuantity}
            className="bg-gray-800 p-2 rounded-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xl font-bold">${selectedProduct.price}</span>
      </div>
      
      <button
        onClick={() => setShowToast(true)}
        className="w-full bg-yellow-400 text-black py-3 rounded-lg mt-8 font-medium"
      >
        Add to cart
      </button>
      
      {showToast && <Toast message="Added to cart" />}
    </div>
  );
}