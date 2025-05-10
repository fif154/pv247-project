/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';

export const removeMemberFromGroupUseCase =
  (groupMembersRepository: IGroupMembersRepository, tx?: any) =>
  async (data: { groupId: string; memberId: string }): Promise<boolean> => {
    const { groupId, memberId } = data;

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
