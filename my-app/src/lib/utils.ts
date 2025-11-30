import { Task, UserStats, CategoryType } from '@/types';

// Calcule le niveau basé sur l'XP total (100 XP par niveau)
export const calculateLevel = (totalXP: number): number => {
  return Math.floor(totalXP / 100) + 1;
};

// Calcule l'XP nécessaire pour le prochain niveau
export const getXPForNextLevel = (totalXP: number): number => {
  const currentLevel = calculateLevel(totalXP);
  return currentLevel * 100;
};

// Calcule le pourcentage de progression vers le prochain niveau
export const getLevelProgress = (totalXP: number): number => {
  const currentLevelXP = (calculateLevel(totalXP) - 1) * 100;
  const xpInCurrentLevel = totalXP - currentLevelXP;
  return (xpInCurrentLevel / 100) * 100;
};

// Gestion du localStorage
const STORAGE_KEY = 'xp-tracker-tasks';

export const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    const tasks = JSON.parse(stored);
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
    }));
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Calcule les statistiques utilisateur
export const calculateStats = (tasks: Task[]): UserStats => {
  const categories = {
    health: 0,
    work: 0,
    house: 0,
  };

  let totalXP = 0;

  tasks.forEach((task) => {
    totalXP += task.xp;
    categories[task.category] += task.xp;
  });

  return {
    totalXP,
    level: calculateLevel(totalXP),
    categories,
  };
};
