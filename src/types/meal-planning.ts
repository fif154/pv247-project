import type { MealWithMacros } from '@/server/entities/models/meal';

export type MealsByDayType = Record<string, Record<string, MealWithMacros[]>>;

export const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;
