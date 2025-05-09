import { Recipe } from '@/server/entities/models/recipe';
import { Session } from '@auth/core/types';

export const canViewRecipe = (recipe: Recipe, user: Session['user']) => true;
// TODO: add check
// recipe.createdBy === user.id;

export const canDeleteRecipe = (recipe: Recipe, user: Session['user']) =>
  recipe.createdBy === user.id;

export const canEditRecipe = (recipe: Recipe | null, user: Session['user']) =>
  recipe?.createdBy === user.id;
