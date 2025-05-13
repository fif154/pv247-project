import { IListMealsForDayUseCase } from '@/server/application/use-cases/meals/list-meals-for-day.use-case';
import { z } from 'zod';

const listMealsForDayInputSchema = z.object({
  date: z.date(),
});

export const listMealsForDayController =
  (listMealsForDayUseCase: IListMealsForDayUseCase) => async (input: unknown) => {
    const data = listMealsForDayInputSchema.parse(input);
    return listMealsForDayUseCase(data);
  };

export type IListMealsForDayController = ReturnType<typeof listMealsForDayController>;
