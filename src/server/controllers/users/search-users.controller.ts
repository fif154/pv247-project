import { ISearchUsersByEmailUseCase } from '@/server/application/use-cases/users/search-users.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { z } from 'zod';

const inputSchema = z.object({
  email: z.string().min(1),
});

export const searchUsersByEmailController =
  (searchUsersByEmailUseCase: ISearchUsersByEmailUseCase) =>
  async (input: unknown) => {
    const { data, error } = inputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    const users = await searchUsersByEmailUseCase(data.email);

    return users;
  };

export type ISearchUsersByEmailController = ReturnType<
  typeof searchUsersByEmailController
>;
