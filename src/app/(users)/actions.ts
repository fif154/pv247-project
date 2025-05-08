'use server';

import { searchUsersByEmailController } from '@/server/controllers/users/search-users.controller';
import { getInjection } from '@/server/di/container';
import { searchUsersByEmailUseCase } from '@/server/application/use-cases/users/search-users.use-case';

export const searchUsersByEmailAction = async (email: string) => {
  const usersRepository = getInjection('IUsersRepository');
  const useCase = searchUsersByEmailUseCase(usersRepository);
  const controller = searchUsersByEmailController(useCase);

  return await controller({ email });
};
