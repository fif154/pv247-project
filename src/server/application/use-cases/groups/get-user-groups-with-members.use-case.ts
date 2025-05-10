import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IUsersRepository } from '@/server/application/repositories/users.repository.interface';
import { GroupWithMembers } from '@/server/entities/models/group';

export const getUserGroupsWithMembersUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository,
    usersRepository: IUsersRepository
  ) =>
  async (userId: string): Promise<GroupWithMembers[]> => {
    const groupIds = await groupMembersRepository.getUserGroups(userId);

    if (!groupIds || groupIds.length === 0) {
      return [];
    }

    const groupsWithMembers = await Promise.all(
      groupIds.map(async (groupId) => {
        const group = await groupsRepository.getGroup(groupId);
        const members = await groupMembersRepository.getGroupUsers(groupId);

        if (!group || !members) {
          return null;
        }

        const users = await usersRepository.getUsersByIds(members);

        if (!users) {
          return null;
        }

        return {
          ...group,
          members: users,
        };
      })
    );

    return groupsWithMembers.filter((g) => g !== null) ?? [];
  };

export type IGetUserGroupsWithMembersUseCase = ReturnType<
  typeof getUserGroupsWithMembersUseCase
>;
