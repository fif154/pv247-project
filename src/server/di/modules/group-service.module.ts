import { createModule } from '@evyweb/ioctopus';

import { GroupService } from '@/server/infrastructure/services/group.service';
import { DI_SYMBOLS } from '../types';

export function createGroupServiceModule() {
  const groupServiceModule = createModule();

  groupServiceModule
    .bind(DI_SYMBOLS.IGroupService)
    .toClass(GroupService, [
      DI_SYMBOLS.IGroupMembersRepository,
      DI_SYMBOLS.IGroupsRepository,
    ]);

  return groupServiceModule;
}
