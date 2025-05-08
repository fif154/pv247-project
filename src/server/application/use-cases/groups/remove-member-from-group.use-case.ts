import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';

export const removeMemberFromGroupUseCase =
  (groupMembersRepository: IGroupMembersRepository) =>
  async (data: { groupId: string; memberId: string }): Promise<boolean> => {
    const { groupId, memberId } = data;

    // Remove the member from the group
    const memberRemoved = await groupMembersRepository.removeUserFromGroup(
      memberId,
      groupId
    );

    if (!memberRemoved) {
      throw new Error('Failed to remove member from group.');
    }

    return true;
  };

export type IRemoveMemberFromGroupUseCase = ReturnType<
  typeof removeMemberFromGroupUseCase
>;
