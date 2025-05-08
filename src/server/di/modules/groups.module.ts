import { createModule } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from '../types';
import { GroupsRepository } from '@/server/infrastructure/repositories/groups.repository';
import { createGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { getGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';
import { getGroupWithMembersController } from '@/server/controllers/groups/get-group-with-members.controller';
import { createGroupWithMembersController } from '@/server/controllers/groups/create-group-with-members.controller';
import { editGroupUseCase } from '@/server/application/use-cases/groups/edit-group.use-case';
import { editGroupController } from '@/server/controllers/groups/edit-group.controller';
import { removeGroupUseCase } from '@/server/application/use-cases/groups/remove-group.use-case';
import { removeGroupController } from '@/server/controllers/groups/remove-group.controller';
import { removeMemberFromGroupUseCase } from '@/server/application/use-cases/groups/remove-member-from-group.use-case';
import { removeMemberFromGroupController } from '@/server/controllers/groups/remove-member-from-group.controller';

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
    .bind(DI_SYMBOLS.IEditGroupUseCase)
    .toHigherOrderFunction(editGroupUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveGroupUseCase)
    .toHigherOrderFunction(removeGroupUseCase, [
      DI_SYMBOLS.IGroupsRepository,
      DI_SYMBOLS.IGroupMembersRepository,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveMemberFromGroupUseCase)
    .toHigherOrderFunction(removeMemberFromGroupUseCase, [
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

  groupsModule
    .bind(DI_SYMBOLS.IEditGroupController)
    .toHigherOrderFunction(editGroupController, [DI_SYMBOLS.IEditGroupUseCase]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveGroupController)
    .toHigherOrderFunction(removeGroupController, [
      DI_SYMBOLS.IRemoveGroupUseCase,
    ]);

  groupsModule
    .bind(DI_SYMBOLS.IRemoveMemberFromGroupController)
    .toHigherOrderFunction(removeMemberFromGroupController, [
      DI_SYMBOLS.IRemoveMemberFromGroupUseCase,
    ]);

  return groupsModule;
}
