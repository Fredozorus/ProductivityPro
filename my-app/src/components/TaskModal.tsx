'use client';

import { useState } from 'react';
import { CategoryType } from '@/types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskName: string, xp: number) => void;
  category: CategoryType;
  categoryName: string;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  category,
  categoryName,
}: TaskModalProps) {
  const [taskName, setTaskName] = useState('');
  const [xp, setXp] = useState(10);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.trim()) {
      onSubmit(taskName.trim(), xp);
      setTaskName('');
      setXp(10);
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Add {categoryName} Task
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Complete a task to earn XP
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Name
            </label>
            <input
              id="taskName"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
              placeholder="What did you accomplish?"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="xp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              XP Points
            </label>
            <input
              id="xp"
              type="number"
              value={xp}
              onChange={(e) => setXp(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
              min="1"
              step="5"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!taskName.trim()}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
