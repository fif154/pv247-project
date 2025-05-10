import { GroupService } from '@/server/infrastructure/services/group.service';
import { createModule } from '@evyweb/ioctopus';
import { GroupMembersRepository } from '../../infrastructure/repositories/groupMembers.repository';
import { GroupsRepository } from '../../infrastructure/repositories/groups.repository';
import { DI_SYMBOLS } from '../types';

export const createGroupModule = () => {
  const groupModule = createModule();

  groupModule
    .bind(DI_SYMBOLS.IGroupService)
    .toClass(GroupService, [
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IGroupsRepository,
    ]);

  groupModule
    .bind(DI_SYMBOLS.IGroupsRepository)
    .toClass(GroupsRepository, [DI_SYMBOLS.ITransactionManagerService]);

  groupModule
    .bind(DI_SYMBOLS.IGroupMembersRepository)
    .toClass(GroupMembersRepository, [DI_SYMBOLS.ITransactionManagerService]);

  return groupModule;
};
