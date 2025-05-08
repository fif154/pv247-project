/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';

export const removeGroupUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository
  ) =>
  async (groupId: string, tx?: any): Promise<boolean> => {
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
