'use client';

import { Ingredient } from '@/server/entities/models/ingredient';
import { User } from 'next-auth';
import { useState } from 'react';
import { IngredientCard } from './ingredient-card';
import { IngredientModal } from './ingredient-modal';
import { CreateIngredientModal } from './create-ingredient-modal';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useCategoriesForFilter } from './hooks/use-categories-for-filter';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import { Input } from '../ui/input';

type IngredientsGridProps = {
  ingredients: Ingredient[];
  currentUser: User & { id: string };
};

export function IngredientsGrid({ ingredients, currentUser }: IngredientsGridProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { categories } = useCategoriesForFilter(ingredients);
  
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ingredient.category?.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenModal = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex-1">
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-64">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="coral" onClick={() => setCreateModalOpen(true)} className="md:w-auto">
          <Plus className="mr-2" /> Add Ingredient
        </Button>
      </div>

      {filteredIngredients.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No ingredients found</p>
          <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
            Add your first ingredient
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIngredients.map((ingredient) => (
            <IngredientCard 
              key={ingredient.id} 
              ingredient={ingredient} 
              onClick={() => handleOpenModal(ingredient)}
            />
          ))}
        </div>
      )}

      {selectedIngredient && (
        <IngredientModal
          ingredient={selectedIngredient}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          currentUser={currentUser}
        />
      )}

      <CreateIngredientModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}