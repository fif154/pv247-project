import { auth } from "@/auth";
import { IMealPlansRepository } from "@/server/application/repositories/meal-plans.repository.interface";
import { NotFoundError } from "@/server/entities/errors/common";

export const listMealPlansUseCase =
    (mealPlansRepository: IMealPlansRepository) => async () => {
        const user = (await auth())?.user;
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return mealPlansRepository.listMealPlans(user.id);
    };

export type IListMealPlansUseCase = ReturnType<typeof listMealPlansUseCase>;
