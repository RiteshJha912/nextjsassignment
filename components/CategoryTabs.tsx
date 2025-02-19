//components/CategoryTabs.jsx
import { Category } from '@/types';

export function CategoryTabs({ 
  categories, 
  activeCategory, 
  onSelect 
}: { 
  categories: Category[];
  activeCategory: string;
  onSelect: (category: string) => void;
}) {
  return (
<div className="flex gap-[10px] overflow-x-auto py-2 custom-scroll mt-[14px] ml-[10px] mb-[14px]">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
            className={`px-4 py-2 rounded-[12px]  whitespace-nowrap text-[14px] font-normal ${
            activeCategory === category.id
              ? 'bg-yellow-400 text-black'
              : 'bg-customBg text-categoryTxt'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}