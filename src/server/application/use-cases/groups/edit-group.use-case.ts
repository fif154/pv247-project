import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { GroupWithMemberIds } from '@/server/entities/models/group';

export const editGroupUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository
  ) =>
  async (
    data: {
      groupId: string;
      name: string;
      description: string | null;
      members: string[];
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ): Promise<GroupWithMemberIds | undefined> => {
    const { groupId, name, description, members } = data;

    // Update the group details
    const updatedGroup = await groupsRepository.editGroup(
      {
        id: groupId,
        name,
        description,
      },
      tx
    );

    if (!updatedGroup) {
      throw new Error('Failed to update group.');
    }

    // Get current group members (including soft-deleted ones)
    const currentMembers = await groupMembersRepository.getGroupUsers(groupId);

    if (!currentMembers) {
      throw new Error('Failed to fetch current group members.');
    }

    // Determine members to add and remove
    const membersToAdd = members.filter((id) => !currentMembers.includes(id));
    const membersToRemove = currentMembers.filter(
      (id) => !members.includes(id)
    );

    // Handle members to add
    for (const memberId of membersToAdd) {
      const isSoftDeleted =
        await groupMembersRepository.isUserSoftDeletedInGroup(
          memberId,
          groupId
        );

      if (isSoftDeleted) {
        // Undelete the user if they were soft deleted
        await groupMembersRepository.undeleteUserFromGroup(
          memberId,
          groupId,
          tx
        );
      } else {
        // Add the user if they are completely new
        await groupMembersRepository.addUsersToGroup([memberId], groupId, tx);
      }
    }

    // Remove members
    if (membersToRemove.length > 0) {
      await groupMembersRepository.removeUsersFromGroup(
        membersToRemove,
        groupId,
        tx
      );
    }

    // Return the updated group with members
    const updatedMembers = await groupMembersRepository.getGroupUsers(groupId);

    return {
      ...updatedGroup,
      members: updatedMembers || [],
    };
  };

export type IEditGroupUseCase = ReturnType<typeof editGroupUseCase>;
