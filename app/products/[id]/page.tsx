// app/products/[id]/page.tsx
'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
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

  const [isPlusActive, setIsPlusActive] = useState(false);
  const [isMinusActive, setIsMinusActive] = useState(false);

  const handleIncrement = () => {
    incrementQuantity();
    setIsPlusActive(true);
    setTimeout(() => setIsPlusActive(false), 300); 
  };

  const handleDecrement = () => {
    decrementQuantity();
    setIsMinusActive(true);
    setTimeout(() => setIsMinusActive(false), 300); 
  };


  
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
      <div className="p-4 max-w-md mx-auto bg-[#171616] min-h-screen text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="p-4 max-w-md mx-auto bg-[#171616] min-h-screen text-white flex items-center justify-center">
        {error || 'Product not found'}
      </div>
    );
  }

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-[#171616] min-h-screen text-white flex flex-col">
      <button
        onClick={() => router.back()}
        className="mb-4 hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="w-[24px] h-[24px] top-[30px] left-[30px]" />
      </button>

      <div className="relative w-full">
        <img
          src={selectedProduct.images[0] || selectedProduct.thumbnail}
          alt={selectedProduct.title}
          className="w-full max-h-[400px] object-contain rounded-lg"
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-[24px] font-bold">{selectedProduct.title}</h1>
          <div className="flex items-center">
            <span className="text-yellow-400 text-[20px]">★</span>
            <span className="ml-1 text-[20px]">{selectedProduct.rating}</span>
          </div>

        </div>

        <p className="mb-6 mr-[40px]" style={{ color: "#FCF9F2" }}>
          {selectedProduct.description}
        </p>

        <div className="flex justify-between items-center">
  <div className="flex items-center gap-4">
    <button
      onClick={handleDecrement}
      className={`p-2 border-2 rounded-full transition-transform transform active:scale-90 
                  focus:outline-none focus-visible:outline-none ${
                    isMinusActive ? "border-[#F9D03F] text-[#F9D03F]" : "border-[#696969] text-[#696969]"
                  }`}
    >
      <Minus className="w-[10px] h-[10px]" />
    </button>

    <span className={`${isPlusActive || isMinusActive ? "text-[#F9D03F]" : "text-[#696969]"} text-lg`}>
      {quantity}
    </span>

    <button
      onClick={handleIncrement}
      className={`p-2 border-2 rounded-full transition-transform transform active:scale-90 
                  focus:outline-none focus-visible:outline-none ${
                    isPlusActive ? "border-[#F9D03F] text-[#F9D03F]" : "border-[#696969] text-[#696969]"
                  }`}
    >
      <Plus className="w-[10px] h-[10px]" />
    </button>
  </div>
  <span className="text-[25px] font-bold">${selectedProduct.price}</span>
</div>

      </div>

      <div className="fixed bottom-4 left-0 w-full px-[30px] flex justify-center">
      <button
        onClick={handleAddToCart}
        className="w-full max-w-md text-black py-3 text-[18px] font-medium transition-colors 
                  rounded-[12px] shadow-lg"
        style={{
          background: "linear-gradient(95.15deg, #F9D03F 17.18%, #E9B32A 71.35%)",
          boxShadow: "0px 4px 24px 4px #F9D14033"
        }}
      >
        Add to cart
      </button>
    </div>


{showToast && (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center">
    <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg">
      Added to cart
    </div>
  </div>
)}
    </div>
  );
}
