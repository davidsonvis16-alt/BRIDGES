import { LayoutGrid, Utensils, ShoppingBasket, Coffee, Pill, Package, LucideIcon } from 'lucide-react';

export interface Category {
  id: 'all' | 'food' | 'groceries' | 'coffee' | 'pharmacy' | 'courier';
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'Everything', icon: LayoutGrid },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'groceries', label: 'Groceries', icon: ShoppingBasket },
  { id: 'coffee', label: 'Coffee & bakery', icon: Coffee },
  { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
  { id: 'courier', label: 'Send a package', icon: Package },
];
