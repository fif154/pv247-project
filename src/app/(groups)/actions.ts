'use server';

import { createGroupWithMembersController } from '@/server/controllers/groups/create-group-with-members.controller';
import { getGroupWithMembersController } from '@/server/controllers/groups/get-group-with-members.controller';
import { getUserGroupsWithMembersController } from '@/server/controllers/groups/get-user-groups-with-members.controller';
import { editGroupController } from '@/server/controllers/groups/edit-group.controller';
import { removeGroupController } from '@/server/controllers/groups/remove-group.controller';
import { removeMemberFromGroupController } from '@/server/controllers/groups/remove-member-from-group.controller';
import { getInjection } from '@/server/di/container';
import { createGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { getGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';
import { getUserGroupsWithMembersUseCase } from '@/server/application/use-cases/groups/get-user-groups-with-members.use-case';
import { editGroupUseCase } from '@/server/application/use-cases/groups/edit-group.use-case';
import { removeGroupUseCase } from '@/server/application/use-cases/groups/remove-group.use-case';
import { removeMemberFromGroupUseCase } from '@/server/application/use-cases/groups/remove-member-from-group.use-case';

export const createGroupWithMembersAction = async (data: {
  name: string;
  description?: string;
  members: string[];
}) => {
  const groupsRepository = getInjection('IGroupsRepository');
  const groupMembersRepository = getInjection('IGroupMembersRepository');
  const useCase = createGroupWithMembersUseCase(
    groupsRepository,
    groupMembersRepository
  );
  const controller = createGroupWithMembersController(useCase);

  return await controller(data);
};

export const getGroupWithMembersAction = async (groupId: string) => {
  const groupsRepository = getInjection('IGroupsRepository');
  const groupMembersRepository = getInjection('IGroupMembersRepository');
  const usersRepository = getInjection('IUsersRepository');
  const useCase = getGroupWithMembersUseCase(
    groupsRepository,
    groupMembersRepository,
    usersRepository
  );
  const controller = getGroupWithMembersController(useCase);

  return await controller({ groupId });
};

export const getUserGroupsWithMembersAction = async (userId: string) => {
  const groupsRepository = getInjection('IGroupsRepository');
  const groupMembersRepository = getInjection('IGroupMembersRepository');
  const usersRepository = getInjection('IUsersRepository');
  const useCase = getUserGroupsWithMembersUseCase(
    groupsRepository,
    groupMembersRepository,
    usersRepository
  );
  const controller = getUserGroupsWithMembersController(useCase);

  return await controller({ userId });
};

export const editGroupAction = async (data: {
  groupId: string;
  name: string;
  description?: string;
  members: string[];
}) => {
  const groupsRepository = getInjection('IGroupsRepository');
  const groupMembersRepository = getInjection('IGroupMembersRepository');
  const useCase = editGroupUseCase(groupsRepository, groupMembersRepository);
  const controller = editGroupController(useCase);

  return await controller(data);
};

export const removeGroupAction = async (groupId: string) => {
  const groupsRepository = getInjection('IGroupsRepository');
  const groupMembersRepository = getInjection('IGroupMembersRepository');
  const useCase = removeGroupUseCase(groupsRepository, groupMembersRepository);
  const controller = removeGroupController(useCase);

  return await controller({ groupId });
};

export const removeMemberFromGroupAction = async (data: {
  groupId: string;
  memberId: string;
}) => {
  const groupMembersRepository = getInjection('IGroupMembersRepository');
  const useCase = removeMemberFromGroupUseCase(groupMembersRepository);
  const controller = removeMemberFromGroupController(useCase);

  return await controller(data);
};
