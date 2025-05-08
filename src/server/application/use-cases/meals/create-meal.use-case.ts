import { auth } from "@/auth";
import { IMealsRepository } from "@/server/application/repositories/meals.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";
import {
    CreateMeal,
    CreateMealAdditionalIngredient,
} from "@/server/entities/models/meal";

export const createMealUseCase =
    (mealsRepository: IMealsRepository) =>
    async (
        input: CreateMeal,
        additionalIngredients?: CreateMealAdditionalIngredient[],
        // TODO: remove any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tx?: any
    ) => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return mealsRepository.createMeal(
            {
                ...input,
                userId: user.id,
            },
            additionalIngredients,
            tx
        );
    };

export type ICreateMealUseCase = ReturnType<typeof createMealUseCase>;
