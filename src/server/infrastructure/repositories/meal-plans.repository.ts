import { db, Transaction } from "@/db";
import { mealPlanMeals, mealPlans } from "@/db/schema";
import { IMealPlansRepository } from "@/server/application/repositories/meal-plans.repository.interface";
import { CreateMealPlan, MealPlan } from "@/server/entities/models/meal-plan";
import { and, eq, inArray, isNull } from "drizzle-orm";

export class MealPlansRepository implements IMealPlansRepository {
    async createMealPlan(
        input: CreateMealPlan,
        mealIds: string[],
        tx?: Transaction
    ): Promise<MealPlan> {
        const invoker = tx ?? db;
        const [mealPlan] = await invoker
            .insert(mealPlans)
            .values(input)
            .returning();

        if (mealIds.length) {
            const mealPlanMealsToCreate = mealIds.map((mealId) => ({
                mealPlanId: mealPlan.id,
                mealId,
            }));
            await invoker.insert(mealPlanMeals).values(mealPlanMealsToCreate);
        }

        return mealPlan;
    }

    async getMealPlanById(
        id: string,
        tx?: Transaction
    ): Promise<MealPlan | null> {
        const invoker = tx ?? db;
        const mealPlan = await invoker.query.mealPlans.findFirst({
            where: and(eq(mealPlans.id, id), isNull(mealPlans.deletedAt)),
            with: {
                meals: {
                    with: {
                        meal: {
                            with: {
                                additionalIngredients: {
                                    with: {
                                        ingredient: true,
                                        unit: true,
                                    },
                                },
                                recipe: true,
                            },
                        },
                    },
                },
            },
        });

        return mealPlan || null;
    }

    async getMealPlansByIds(
        ids: string[],
        tx?: Transaction
    ): Promise<MealPlan[]> {
        const invoker = tx ?? db;
        return invoker.query.mealPlans.findMany({
            where: and(isNull(mealPlans.deletedAt), inArray(mealPlans.id, ids)),
            with: {
                meals: {
                    with: {
                        meal: {
                            with: {
                                additionalIngredients: {
                                    with: {
                                        ingredient: true,
                                        unit: true,
                                    },
                                },
                                recipe: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async updateMealPlan(
        id: string,
        input: Partial<
            Omit<MealPlan, "id" | "createdBy" | "createdAt" | "updatedAt">
        >,
        mealIds?: string[],
        tx?: Transaction
    ): Promise<MealPlan> {
        const invoker = tx ?? db;
        const [mealPlan] = await invoker
            .update(mealPlans)
            .set(input)
            .where(and(eq(mealPlans.id, id), isNull(mealPlans.deletedAt)))
            .returning();

        if (mealIds) {
            await invoker
                .delete(mealPlanMeals)
                .where(eq(mealPlanMeals.mealPlanId, id));

            const mealPlanMealsToCreate = mealIds.map((mealId) => ({
                mealPlanId: id,
                mealId,
            }));
            await invoker.insert(mealPlanMeals).values(mealPlanMealsToCreate);
        }

        return mealPlan;
    }

    async deleteMealPlan(id: string, tx?: Transaction): Promise<void> {
        const invoker = tx ?? db;
        await invoker.delete(mealPlans).where(eq(mealPlans.id, id));
    }

    async listMealPlans(userId: string): Promise<MealPlan[]> {
        return db.query.mealPlans.findMany({
            // TODO: add check for groupId or userId
            where: isNull(mealPlans.deletedAt),
            with: {
                meals: {
                    with: {
                        meal: {
                            with: {
                                additionalIngredients: {
                                    with: {
                                        ingredient: true,
                                        unit: true,
                                    },
                                },
                                recipe: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
