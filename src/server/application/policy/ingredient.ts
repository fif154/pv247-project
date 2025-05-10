import { Ingredient } from '@/server/entities/models/ingredient';
import { Session } from '@auth/core/types';

export const canViewIngredient = (
  ingredient: Ingredient,
  user: Session['user']
) => ingredient.createdBy === user.id;

export const canDeleteIngredient = (
  ingredient: Ingredient,
  user: Session['user']
) => ingredient.createdBy === user.id;

export const canEditIngredient = (
  ingredient: Ingredient | null,
  user: Session['user']
) => ingredient?.createdBy === user.id;
