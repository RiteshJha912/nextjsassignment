// app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Toast } from '@/components/Toast';
import { apiService } from '@/services/api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const product = await apiService.getProduct(params.id);
      if (product) {
        setSelectedProduct(product);
      }
      setLoading(false);
      resetQuantity();
    };

    fetchProduct();
  }, [params.id, setSelectedProduct, resetQuantity]);

  if (loading) {
    return (
      <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
        <div className="flex justify-center items-center h-screen">
          Product not found
        </div>
      </div>
    );
  }

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