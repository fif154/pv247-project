import { ISignInUseCase } from '@/server/application/use-cases/auth/sign-in.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { z } from 'zod';

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInController =
  (signInUseCase: ISignInUseCase) => async (input: unknown) => {
    const { data, error } = inputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const user = await signInUseCase(data);

    return user;
  };

export type ISignInController = ReturnType<typeof signInController>;
