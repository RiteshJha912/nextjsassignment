// components/ProductCard.tsx
import { Product } from '@/types';
import { Star } from 'lucide-react';
import Link from 'next/link';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-gray-800 rounded-lg p-4 transition-transform hover:scale-105">
        <img
          src={product.images[0] || product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-lg mb-2"
        />
        <div className="flex items-center mb-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-white">{product.rating}</span>
        </div>
        <h3 className="text-white font-medium truncate">{product.title}</h3>
        <p className="text-gray-400 text-sm truncate">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-white">${product.price}</span>
          <button className="text-yellow-400 hover:text-yellow-300">+</button>
        </div>
      </div>
    </Link>
  );
}