import { IGetUserUseCase } from '@/server/application/use-cases/users/get-user.use-case';
import { z } from 'zod';

const getuserInputSchema = z.object({
  userId: z.string(),
});

export const getUserController =
  (getUserUseCase: IGetUserUseCase) => async (input: unknown) => {
    const data = getuserInputSchema.parse(input);
    const user = await getUserUseCase({
      userId: data.userId,
    });

    return user;
  };

export type IGetUserController = ReturnType<typeof getUserController>;
