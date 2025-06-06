/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@/auth';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import {
  CreateGroup,
  GroupWithMemberIds,
} from '@/server/entities/models/group';

export function createGroupWithMembersUseCase(
  groupsRepository: IGroupsRepository,
  groupMembersRepository: IGroupMembersRepository
) {
  return async (
    group: CreateGroup,
    members: string[],
    tx?: any
  ): Promise<GroupWithMemberIds | undefined> => {
    const user = (await auth())?.user;

    const createdGroup = await groupsRepository.createGroup(
      { ...group, createdBy: user?.id },
      tx
    );
    const groupMembers = await groupMembersRepository.addUsersToGroup(
      members,
      createdGroup.id,
      tx
    );

    return {
      ...createdGroup,
      members: groupMembers.map((member) => member.userId),
    };
  };
}

export type ICreateGroupWithMembersUseCase = ReturnType<
  typeof createGroupWithMembersUseCase
>;
