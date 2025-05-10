/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/auth';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IGroupService } from '../../services/group.service.interface';

export const removeMemberFromGroupUseCase =
  (
    groupMembersRepository: IGroupMembersRepository,
    groupService: IGroupService
  ) =>
  async (
    data: { groupId: string; memberId: string },
    tx?: any
  ): Promise<boolean> => {
    const { groupId, memberId } = data;

    const user = (await auth())?.user;
    if (!user) {
      throw new Error('User not found');
    }

    await groupService.verifyUserInGroup(user.id, groupId);

    // Remove the member from the group
    const memberRemoved = await groupMembersRepository.removeUserFromGroup(
      memberId,
      groupId,
      tx
    );

    if (!memberRemoved) {
      throw new Error('Failed to remove member from group.');
    }

    return true;
  };

export type IRemoveMemberFromGroupUseCase = ReturnType<
  typeof removeMemberFromGroupUseCase
>;
