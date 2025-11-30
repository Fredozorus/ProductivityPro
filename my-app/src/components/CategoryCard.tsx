'use client';

import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200 text-left border border-gray-100 hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: category.color }}
        />
      </div>

      <p className="text-sm text-gray-500 mb-4">{category.description}</p>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold" style={{ color: category.color }}>
          {category.totalXP}
        </span>
        <span className="text-sm text-gray-400">XP</span>
      </div>
    </button>
  );
}
