import {
  CalendarDays,
  ChefHat,
  Home,
  Settings,
  Share2,
  ShoppingCart,
} from "lucide-react";

export const navItems = [
    { icon: Home, label: "Dashboard", href: "home" },
    { icon: CalendarDays, label: "Meal Plans", href: "meal-plans" },
    { icon: ChefHat, label: "Recipes", href: "recipes" },
    { icon: ShoppingCart, label: "Grocery List", href: "grocery" },
    { icon: Share2, label: "Groups", href: "groups" },
    { icon: Settings, label: "Settings", href: "settings" },
];
export type NavItem = (typeof navItems)[number];
