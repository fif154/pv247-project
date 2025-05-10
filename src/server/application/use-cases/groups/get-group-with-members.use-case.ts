import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IUsersRepository } from '@/server/application/repositories/users.repository.interface';
import { GroupWithMembers } from '@/server/entities/models/group';

export const getGroupWithMembersUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository,
    usersRepository: IUsersRepository
  ) =>
  async (groupId: string): Promise<GroupWithMembers | undefined> => {
    const group = await groupsRepository.getGroup(groupId);
    const members = await groupMembersRepository.getGroupUsers(groupId);

    if (!group || !members) {
      return undefined;
    }

    const users = await usersRepository.getUsersByIds(members);

    if (!users) {
      return undefined;
    }

    return {
      ...group,
      members: users,
    };
  };

export type IGetGroupWithMembersUseCase = ReturnType<
  typeof getGroupWithMembersUseCase
>;
