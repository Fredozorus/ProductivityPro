'use client';

import { UserStats } from '@/types';
import { getLevelProgress, getXPForNextLevel } from '@/lib/utils';

interface StatsHeaderProps {
  stats: UserStats;
}

export default function StatsHeader({ stats }: StatsHeaderProps) {
  const progress = getLevelProgress(stats.totalXP);
  const nextLevelXP = getXPForNextLevel(stats.totalXP);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Level {stats.level}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.totalXP} / {nextLevelXP} XP
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalXP}</div>
          <div className="text-sm text-gray-500">Total XP</div>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
