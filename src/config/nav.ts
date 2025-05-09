import {
  CalendarDays,
  ChefHat,
  Home,
  Settings,
  Share2,
  ShoppingCart,
} from 'lucide-react';

export const navItems = [
  { icon: Home, label: 'Dashboard', href: '/auth/home' },
  { icon: CalendarDays, label: 'Meal Plans', href: '/auth/meal-plans' },
  { icon: ChefHat, label: 'Recipes', href: '/auth/recipes' },
  { icon: ShoppingCart, label: 'Grocery List', href: '/auth/grocery-lists' },
  { icon: Share2, label: 'Groups', href: '/auth/groups' },
  { icon: Settings, label: 'Settings', href: '/auth/settings' },
];
export type NavItem = (typeof navItems)[number];
