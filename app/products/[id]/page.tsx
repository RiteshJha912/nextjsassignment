// app/products/[id]/page.tsx
'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Toast } from '@/components/Toast';
import { apiService } from '@/services/api';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const product = await apiService.getProduct(resolvedParams.id);
        if (product) {
          setSelectedProduct(product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    resetQuantity();
  }, [resolvedParams.id, setSelectedProduct, resetQuantity]);

  if (loading) {
    return (
      <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
        <div className="flex justify-center items-center h-screen">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
      <button
        onClick={() => router.back()}
        className="mb-4 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <img
        src={selectedProduct.images[0] || selectedProduct.thumbnail}
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
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xl font-bold">${selectedProduct.price}</span>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-yellow-400 text-black py-3 rounded-lg mt-8 font-medium
                 hover:bg-yellow-500 transition-colors"
      >
        Add to cart
      </button>

      {showToast && <Toast message="Added to cart" />}
    </div>
  );
}