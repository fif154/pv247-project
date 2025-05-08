import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import {
  CreateGroup,
  GroupWithMemberIds,
} from '@/server/entities/models/group';

export const createGroupWithMembersUseCase =
  (
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository
  ) =>
  async (
    group: CreateGroup,
    members: string[]
  ): Promise<GroupWithMemberIds | undefined> => {
    const createdGroup = await groupsRepository.createGroup(group);
    const groupMembers = await groupMembersRepository.addUsersToGroup(
      members,
      createdGroup.id
    );

    return {
      ...createdGroup,
      members: groupMembers.map((member) => member.userId),
    };
  };

export type ICreateGroupWithMembersUseCase = ReturnType<
  typeof createGroupWithMembersUseCase
>;
