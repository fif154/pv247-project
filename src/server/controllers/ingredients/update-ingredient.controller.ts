import { IUpdateIngredientUseCase } from "@/server/application/use-cases/ingredients/update-ingredient.use-case";
import { InputParseError } from "@/server/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(1000).nullable(),
    imageUrl: z.string().url().nullable(),
    protein: z.number().min(0),
    carbs: z.number().min(0),
    fats: z.number().min(0),
    calories: z.number().min(0),
    baseMacroQuantity: z.number().min(0),
});

export const updateIngredientController =
    (updateIngredientUseCase: IUpdateIngredientUseCase) =>
    async (id: string, input: unknown) => {
        const result = inputSchema.safeParse(input);
        if (!result.success) {
            throw new InputParseError(result.error.message);
        }
        return await updateIngredientUseCase(id, result.data);
    };

export type IUpdateIngredientController = ReturnType<
    typeof updateIngredientController
>;
