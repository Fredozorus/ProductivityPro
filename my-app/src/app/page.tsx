'use client';

import { useState, useEffect } from 'react';
import CategoryCard from '@/components/CategoryCard';
import StatsHeader from '@/components/StatsHeader';
import TaskModal from '@/components/TaskModal';
import { Task, Category, UserStats, CategoryType } from '@/types';
import { loadTasks, saveTasks, calculateStats } from '@/lib/utils';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalXP: 0,
    level: 1,
    categories: { health: 0, work: 0, house: 0 },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('health');

  const categories: Category[] = [
    {
      id: 'health',
      name: 'Health',
      description: 'Exercise, nutrition, wellness',
      totalXP: stats.categories.health,
      color: '#22c55e',
    },
    {
      id: 'work',
      name: 'Work',
      description: 'Projects, learning, career',
      totalXP: stats.categories.work,
      color: '#3b82f6',
    },
    {
      id: 'house',
      name: 'House',
      description: 'Cleaning, organizing, maintenance',
      totalXP: stats.categories.house,
      color: '#ef4444',
    },
  ];

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
    setStats(calculateStats(loadedTasks));
  }, []);

  const handleCategoryClick = (categoryId: CategoryType) => {
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleAddTask = (taskName: string, xp: number) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      xp,
      category: selectedCategory,
      createdAt: new Date(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setStats(calculateStats(updatedTasks));
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <StatsHeader stats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
        category={selectedCategory}
        categoryName={selectedCategoryData?.name || ''}
      />
    </main>
  );
}
