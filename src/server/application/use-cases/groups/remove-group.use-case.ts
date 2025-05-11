/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/auth';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

export const removeGroupUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository,
    groupService: IGroupService
  ) =>
  async (groupId: string, tx?: any): Promise<boolean> => {
    const user = (await auth())?.user;
    if (!user) {
      throw new Error('User not found');
    }

    await groupService.verifyUserInGroup(user.id, groupId);
    if (!(await groupService.canUserModifyGroup(user.id, groupId))) {
      throw new Error('User does not have permission to remove this group');
    }

    // Remove all users from the group
    const membersRemoved = await groupMembersRepository.removeAllUsersFromGroup(
      groupId,
      tx
    );

    if (!membersRemoved) {
      throw new Error('Failed to remove group members.');
    }

    // Soft-delete the group
    const groupRemoved = await groupsRepository.removeGroup(groupId, tx);

    if (!groupRemoved) {
      throw new Error('Failed to remove group.');
    }

    return true;
  };

export type IRemoveGroupUseCase = ReturnType<typeof removeGroupUseCase>;
