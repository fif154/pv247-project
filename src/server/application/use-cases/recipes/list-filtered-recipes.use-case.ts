import { z } from 'zod';
import { IRecipesRepository } from '../../repositories/recipes.repository.interface';
import { IGroupService } from '../../services/group.service.interface';
import { auth } from '@/auth';
import { NotFoundError } from '@/server/entities/errors/common';

export const listFilteredRecipesSchema = z.object({
  search: z.string().optional(),
  sort: z.enum(['name-asc', 'name-desc', 'newest', 'oldest']).optional(),
});

export type ListFilteredRecipesInput = z.infer<
  typeof listFilteredRecipesSchema
>;

export const listFilteredRecipesUseCase =
  (recipesRepository: IRecipesRepository, groupService: IGroupService) =>
  async (input: ListFilteredRecipesInput = {}) => {
    const { search, sort } = input;

    // Get user session and groupId
    const session = await auth();
    const user = session?.user;

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!user.groupId) {
      throw new NotFoundError('User is not in a group');
    }

    // Verify user is in group
    await groupService.verifyUserInGroup(user.id, user.groupId);

    // Get recipes for the user's group
    const recipes = await recipesRepository.listRecipes(user.groupId);

    let filtered = recipes;

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchLower) ||
          (recipe.description &&
            recipe.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting if provided
    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'newest':
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case 'oldest':
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          default:
            return a.name.localeCompare(b.name);
        }
      });
    }

    return filtered;
  };

export type IListFilteredRecipesUseCase = ReturnType<
  typeof listFilteredRecipesUseCase
>;
