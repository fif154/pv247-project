import { auth } from '@/auth';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IUsersRepository } from '@/server/application/repositories/users.repository.interface';
import { GroupWithMembers } from '@/server/entities/models/group';
import { IGroupService } from '../../services/group.service.interface';

export const getGroupWithMembersUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository,
    usersRepository: IUsersRepository,
    groupService: IGroupService
  ) =>
  async (groupId: string): Promise<GroupWithMembers | undefined> => {
    const user = (await auth())?.user;

    if (!user) {
      throw new Error('User not found');
    }

    await groupService.verifyUserInGroup(user.id, groupId);

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
