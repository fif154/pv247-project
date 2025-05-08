'use server';

import { createGroupWithMembersController } from '@/server/controllers/groups/create-group-with-members.controller';
import { getGroupWithMembersController } from '@/server/controllers/groups/get-group-with-members.controller';
import { getUserGroupsWithMembersController } from '@/server/controllers/groups/get-user-groups-with-members.controller';
import { getInjection } from '@/server/di/container';
import { createGroupWithMembersUseCase } from '@/server/application/use-cases/groups/create-group-with-members.use-case';
import { getGroupWithMembersUseCase } from '@/server/application/use-cases/groups/get-group-with-members.use-case';
import { getUserGroupsWithMembersUseCase } from '@/server/application/use-cases/groups/get-user-groups-with-members.use-case';

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
