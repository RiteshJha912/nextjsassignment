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
    <div className="flex gap-2 overflow-x-auto py-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeCategory === category.id
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-800 text-white'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}