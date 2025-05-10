import { Transaction } from '@/db';
import { GroupMember } from '@/server/entities/models/groupMember';

export interface IGroupMembersRepository {
  getUserGroups(userId: string): Promise<string[] | undefined>;
  getGroupUsers(groupId: string): Promise<string[] | undefined>;
  removeUserFromAllGroups(userId: string, tx?: Transaction): Promise<boolean>;
  removeUserFromGroup(
    userId: string,
    groupId: string,
    tx?: Transaction
  ): Promise<boolean>;
  removeUsersFromGroup(
    userIds: string[],
    groupId: string,
    tx?: Transaction
  ): Promise<boolean>;
  removeAllUsersFromGroup(groupId: string, tx?: Transaction): Promise<boolean>;
  addUserToGroup(
    userId: string,
    groupId: string,
    tx?: Transaction
  ): Promise<GroupMember>;
  addUsersToGroup(
    userIds: string[],
    groupId: string,
    tx?: Transaction
  ): Promise<GroupMember[]>;
  isUserSoftDeletedInGroup(userId: string, groupId: string): Promise<boolean>;
  undeleteUserFromGroup(
    userId: string,
    groupId: string,
    tx?: Transaction
  ): Promise<GroupMember | undefined>;
}
