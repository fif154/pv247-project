import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { GroupWithMemberIds } from '@/server/entities/models/group';

export const editGroupUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository
  ) =>
  async (data: {
    groupId: string;
    name: string;
    description: string | null;
    members: string[];
  }): Promise<GroupWithMemberIds | undefined> => {
    const { groupId, name, description, members } = data;

    // Update the group details
    const updatedGroup = await groupsRepository.editGroup({
      id: groupId,
      name,
      description,
    });

    if (!updatedGroup) {
      throw new Error('Failed to update group.');
    }

    // Get current group members
    const currentMembers = await groupMembersRepository.getGroupUsers(groupId);

    if (!currentMembers) {
      throw new Error('Failed to fetch current group members.');
    }

    // Determine members to add and remove
    const membersToAdd = members.filter((id) => !currentMembers.includes(id));
    const membersToRemove = currentMembers.filter(
      (id) => !members.includes(id)
    );

    // Add new members
    if (membersToAdd.length > 0) {
      await groupMembersRepository.addUsersToGroup(membersToAdd, groupId);
    }

    // Remove members
    if (membersToRemove.length > 0) {
      await Promise.all(
        membersToRemove.map((userId) =>
          groupMembersRepository.removeUserFromGroup(userId, groupId)
        )
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
