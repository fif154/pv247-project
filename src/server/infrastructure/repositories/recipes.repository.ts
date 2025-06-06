import { db, Transaction } from '@/db';
import { recipes } from '@/db/schema';
import { IRecipesRepository } from '@/server/application/repositories/recipes.repository.interface';
import { Recipe } from '@/server/entities/models/recipe';
import { and, eq, inArray, isNull } from 'drizzle-orm';

export class RecipesRepository implements IRecipesRepository {
  async createRecipe(
    input: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Recipe> {
    const [recipe] = await db.insert(recipes).values(input).returning();
    return recipe;
  }

  async getRecipeById(id: string, tx?: Transaction): Promise<Recipe | null> {
    const invoker = tx ?? db;
    const recipe = await invoker.query.recipes.findFirst({
      where: and(eq(recipes.id, id), isNull(recipes.deletedAt)),
      with: {
        ingredients: {
          with: {
            ingredient: true,
            unit: true,
          },
        },
      },
    });

    return recipe || null;
  }

  async getRecipesByIds(ids: string[], tx?: Transaction): Promise<Recipe[]> {
    const invoker = tx ?? db;

    const result = await invoker.query.recipes.findMany({
      where: and(isNull(recipes.deletedAt), inArray(recipes.id, ids)),
      with: {
        ingredients: {
          with: {
            ingredient: true,
          },
        },
      },
    });
    return result;
  }

  async getRecipeByName(name: string, groupId: string): Promise<Recipe | null> {
    const [recipe] = await db
      .select()
      .from(recipes)
      .where(
        and(
          eq(recipes.name, name),
          eq(recipes.groupId, groupId),
          isNull(recipes.deletedAt)
        )
      )
      .limit(1);
    return recipe || null;
  }

  async updateRecipe(
    id: string,
    input: Partial<Omit<Recipe, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>>
  ): Promise<Recipe> {
    const [recipe] = await db
      .update(recipes)
      .set(input)
      .where(and(eq(recipes.id, id), isNull(recipes.deletedAt)))
      .returning();
    return recipe;
  }

  async deleteRecipe(id: string): Promise<void> {
    await db
      .update(recipes)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(recipes.id, id));
  }

  async listRecipes(groupId: string): Promise<Recipe[]> {
    const result = await db.query.recipes.findMany({
      where: and(isNull(recipes.deletedAt), eq(recipes.groupId, groupId)),
      with: {
        ingredients: {
          with: {
            ingredient: true,
            unit: true,
          },
        },
      },
    });

    return result;
  }
}
