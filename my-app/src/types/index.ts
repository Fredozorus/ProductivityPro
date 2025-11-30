export type CategoryType = 'health' | 'work' | 'house';

export interface Task {
  id: string;
  name: string;
  xp: number;
  category: CategoryType;
  createdAt: Date;
}

export interface Category {
  id: CategoryType;
  name: string;
  description: string;
  totalXP: number;
  color: string;
}

export interface UserStats {
  totalXP: number;
  level: number;
  categories: {
    health: number;
    work: number;
    house: number;
  };
}
