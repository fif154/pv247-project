import { createModule } from '@evyweb/ioctopus';

import { searchUsersByEmailUseCase } from '@/server/application/use-cases/users/search-users.use-case';
import { setCurrentGroupUseCase } from '@/server/application/use-cases/users/set-current-group.use-case';
import { searchUsersByEmailController } from '@/server/controllers/users/search-users.controller';
import { editUserUseCase } from '@/server/application/use-cases/users/edit-user.use-case';
import { editUserController } from '@/server/controllers/users/edit-user.controller';
import { setCurrentGroupController } from '@/server/infrastructure/controllers/users/set-current-group.controller';
import { UsersRepository } from '@/server/infrastructure/repositories/users.repository';
import { DI_SYMBOLS } from '../types';

export function createUsersModule() {
  const usersModule = createModule();

  usersModule
    .bind(DI_SYMBOLS.ISearchUsersByEmailUseCase)
    .toHigherOrderFunction(searchUsersByEmailUseCase, [
      DI_SYMBOLS.IUsersRepository,
    ]);
  usersModule
    .bind(DI_SYMBOLS.IEditUserUseCase)
    .toHigherOrderFunction(editUserUseCase, [DI_SYMBOLS.IUsersRepository]);

  usersModule
    .bind(DI_SYMBOLS.ISearchUsersByEmailController)
    .toHigherOrderFunction(searchUsersByEmailController, [
      DI_SYMBOLS.ISearchUsersByEmailUseCase,
    ]);
  usersModule
    .bind(DI_SYMBOLS.IEditUserController)
    .toHigherOrderFunction(editUserController, [DI_SYMBOLS.IEditUserUseCase]);

  usersModule
    .bind(DI_SYMBOLS.ISetCurrentGroupUseCase)
    .toHigherOrderFunction(setCurrentGroupUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IGroupsRepository,
    ]);

  usersModule
    .bind(DI_SYMBOLS.ISetCurrentGroupController)
    .toHigherOrderFunction(setCurrentGroupController, [
      DI_SYMBOLS.ISetCurrentGroupUseCase,
    ]);

  usersModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository, []);

  return usersModule;
}
