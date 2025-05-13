import { createModule } from '@evyweb/ioctopus';

import { searchUsersByEmailUseCase } from '@/server/application/use-cases/users/search-users.use-case';
import { setCurrentGroupUseCase } from '@/server/application/use-cases/users/set-current-group.use-case';
import { searchUsersByEmailController } from '@/server/controllers/users/search-users.controller';
import { editUserUseCase } from '@/server/application/use-cases/users/edit-user.use-case';
import { editUserController } from '@/server/controllers/users/edit-user.controller';
import { setCurrentGroupController } from '@/server/infrastructure/controllers/users/set-current-group.controller';
import { UsersRepository } from '@/server/infrastructure/repositories/users.repository';
import { DI_SYMBOLS } from '../types';
import { editMacrosUseCase } from '@/server/application/use-cases/users/edit-macros.use-case';
import { editMacrosController } from '@/server/controllers/users/edit-macros.controller';
import { getUserUseCase } from '@/server/application/use-cases/users/get-user.use-case';
import { getUserController } from '@/server/controllers/users/get-user.controller';

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

  usersModule
    .bind(DI_SYMBOLS.IEditMacrosUseCase)
    .toHigherOrderFunction(editMacrosUseCase, [DI_SYMBOLS.IUsersRepository]);

  usersModule
    .bind(DI_SYMBOLS.IEditMacrosController)
    .toHigherOrderFunction(editMacrosController, [
      DI_SYMBOLS.IEditMacrosUseCase,
    ]);

  usersModule
    .bind(DI_SYMBOLS.IGetUserUseCase)
    .toHigherOrderFunction(getUserUseCase, [DI_SYMBOLS.IUsersRepository]);

  usersModule
    .bind(DI_SYMBOLS.IGetUserController)
    .toHigherOrderFunction(getUserController, [DI_SYMBOLS.IGetUserUseCase]);

  usersModule.bind(DI_SYMBOLS.IUsersRepository).toClass(UsersRepository, []);

  return usersModule;
}
