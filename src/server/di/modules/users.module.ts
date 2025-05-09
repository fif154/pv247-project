import { createModule } from '@evyweb/ioctopus';

import { UsersRepository } from '@/server/infrastructure/repositories/users.repository';
import { DI_SYMBOLS } from '../types';

export function createUsersModule() {
  const usersModule = createModule();

  usersModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository, []);

  return usersModule;
}
