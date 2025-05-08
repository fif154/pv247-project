import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '../types';
import { GroupsRepository } from '@/server/infrastructure/repositories/groups.repository';
import { createGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { getGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';
import { getGroupWithMembersController } from '@/server/controllers/groups/get-group-with-members.controller';
import { createGroupWithMembersController } from '@/server/controllers/groups/create-group-with-members.controller';

export function createGroupsModule() {
  const groupsModule = createModule();

  groupsModule.bind(DI_SYMBOLS.IGroupsRepository).toClass(GroupsRepository, []);

  groupsModule
    .bind(DI_SYMBOLS.IGetGroupWithMembersUseCase)
    .toHigherOrderFunction(getGroupWithMembersUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.ICreateGroupWithMembersUseCase)
    .toHigherOrderFunction(createGroupWithMembersUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IGetGroupWithMembersController)
    .toHigherOrderFunction(getGroupWithMembersController, [
      DI_SYMBOLS.IGetGroupWithMembersUseCase,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.ICreateGroupWithMembersController)
    .toHigherOrderFunction(createGroupWithMembersController, [
      DI_SYMBOLS.ICreateGroupWithMembersUseCase,
    ]);

  return groupsModule;
}
