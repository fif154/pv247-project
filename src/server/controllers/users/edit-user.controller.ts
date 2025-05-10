import { z } from 'zod';
import { IEditUserUseCase } from '@/server/application/use-cases/users/edit-user.use-case';

const editUserInputSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const editUserController =
  (editUserUseCase: IEditUserUseCase) => async (input: unknown) => {
    const data = editUserInputSchema.parse(input);
    const updatedUser = await editUserUseCase({
      userId: data.userId,
      name: data.name,
      email: data.email,
    });

    return updatedUser;
  };

export type IEditUserController = ReturnType<typeof editUserController>;
