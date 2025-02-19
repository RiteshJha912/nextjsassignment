//components/ProductCard.jsx
import { Product } from '@/types';
import { Star } from 'lucide-react';
import Link from 'next/link';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
    <div className="bg-secondaryBg rounded-lg p-4 transition-transform hover:scale-105 w-[143px] h-[213px] ml-[13px] mb-[10px]">
        
        <img
         src={product.images[0] || product.thumbnail}
         alt={product.title}
         className="w-[95px] h-[77px] object-contain rounded-lg mb-2 mx-auto"
          />


        <div className="flex items-center mb-1 h-[17px]">
        <Star className="w-4 h-[17px] text-yellow-400 fill-yellow-400" />
        <span className="ml-1 text-white text-[12px] leading-[17px]">{product.rating}</span>
        </div>

        <h3 className="text-[14px] font-normal text-white truncate">
          {product.title}
        </h3>
        <p className="text-[12px] font-normal text-[#CAC7C2] truncate">
         {product.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-[14px] font-bold text-white">
            ${product.price}
          </span>
          <button className="text-yellow-400 hover:text-yellow-300 text-[16px] w-[16px] h-[16px] flex items-center justify-center leading-[12px]">+</button>

        </div>
      </div>
    </Link>
  );
}
