import { createModule } from '@evyweb/ioctopus';

import { createGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { editGroupUseCase } from '@/server/application/use-cases/groups/edit-group.use-case';
import { getGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';
import { getUserGroupsWithMembersUseCase } from '@/server/application/use-cases/groups/get-user-groups-with-members.use-case';
import { removeGroupUseCase } from '@/server/application/use-cases/groups/remove-group.use-case';
import { removeMemberFromGroupUseCase } from '@/server/application/use-cases/groups/remove-member-from-group.use-case';
import { createGroupWithMembersController } from '@/server/controllers/groups/create-group-with-members.controller';
import { editGroupController } from '@/server/controllers/groups/edit-group.controller';
import { getGroupWithMembersController } from '@/server/controllers/groups/get-group-with-members.controller';
import { getUserGroupsWithMembersController } from '@/server/controllers/groups/get-user-groups-with-members.controller';
import { removeGroupController } from '@/server/controllers/groups/remove-group.controller';
import { removeMemberFromGroupController } from '@/server/controllers/groups/remove-member-from-group.controller';
import { GroupsRepository } from '@/server/infrastructure/repositories/groups.repository';
import { DI_SYMBOLS } from '../types';

export function createGroupsModule() {
  const groupsModule = createModule();

  groupsModule.bind(DI_SYMBOLS.IGroupsRepository).toClass(GroupsRepository, []);

  groupsModule
    .bind(DI_SYMBOLS.IGetGroupWithMembersUseCase)
    .toHigherOrderFunction(getGroupWithMembersUseCase, [
      DI_SYMBOLS.IUsersRepository,
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.ICreateGroupWithMembersUseCase)
    .toHigherOrderFunction(createGroupWithMembersUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IEditGroupUseCase)
    .toHigherOrderFunction(editGroupUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveGroupUseCase)
    .toHigherOrderFunction(removeGroupUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveMemberFromGroupUseCase)
    .toHigherOrderFunction(removeMemberFromGroupUseCase, [
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IGroupService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IGetUserGroupsWithMembersUseCase)
    .toHigherOrderFunction(getUserGroupsWithMembersUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IUsersRepository,
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
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IEditGroupController)
    .toHigherOrderFunction(editGroupController, [
      DI_SYMBOLS.IEditGroupUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveGroupController)
    .toHigherOrderFunction(removeGroupController, [
      DI_SYMBOLS.IRemoveGroupUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveMemberFromGroupController)
    .toHigherOrderFunction(removeMemberFromGroupController, [
      DI_SYMBOLS.IRemoveMemberFromGroupUseCase,
      DI_SYMBOLS.ITransactionManagerService,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IGetUserGroupsWithMembersController)
    .toHigherOrderFunction(getUserGroupsWithMembersController, [
      DI_SYMBOLS.IGetUserGroupsWithMembersUseCase,
    ]);

  return groupsModule;
}
