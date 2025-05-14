import { IEditMacrosUseCase } from '@/server/application/use-cases/users/edit-macros.use-case';
import { z } from 'zod';

const editMacrosInputSchema = z.object({
  userId: z.string(),
  fats: z.number(),
  protein: z.number(),
  carbs: z.number(),
  calories: z.number(),
});

export const editMacrosController =
  (editMacrosUseCase: IEditMacrosUseCase) => async (input: unknown) => {
    const data = editMacrosInputSchema.parse(input);
    const updatedUser = await editMacrosUseCase({
      userId: data.userId,
      fats: data.fats,
      protein: data.protein,
      carbs: data.carbs,
      calories: data.calories,
    });

    return updatedUser;
  };

export type IEditMacrosController = ReturnType<typeof editMacrosController>;
