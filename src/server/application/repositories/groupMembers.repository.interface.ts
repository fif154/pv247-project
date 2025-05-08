import { GroupMember } from '@/server/entities/models/groupMember';

export interface IGroupMembersRepository {
  getUserGroups(userId: string): Promise<string[] | undefined>;
  getGroupUsers(groupId: string): Promise<string[] | undefined>;
  removeUserFromAllGroups(userId: string): Promise<boolean>;
  removeUserFromGroup(userId: string, groupId: string): Promise<boolean>;
  removeAllUsersFromGroup(groupId: string): Promise<boolean>;
  addUserToGroup(userId: string, groupId: string): Promise<GroupMember>;
  addUsersToGroup(userIds: string[], groupId: string): Promise<GroupMember[]>;
}
