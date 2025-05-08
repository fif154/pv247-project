import { ICreateIngredientUseCase } from "@/server/application/use-cases/ingredients/create-ingredient.use-case";
import { InputParseError } from "@/server/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(1000).nullable(),
    createdBy: z.string().min(1),
    imageUrl: z.string().url().nullable(),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fats: z.number().min(0),
    calories: z.number().min(0),
    baseMacroQuantity: z.number().min(0),
    deletedAt: z.string().nullable(),
});

export const createIngredientController =
    (createIngredientUseCase: ICreateIngredientUseCase) =>
    async (input: unknown) => {
        const result = inputSchema.safeParse(input);
        if (!result.success) {
            throw new InputParseError(result.error.message);
        }
        return await createIngredientUseCase(result.data);
    };

export type ICreateIngredientController = ReturnType<
    typeof createIngredientController
>;
