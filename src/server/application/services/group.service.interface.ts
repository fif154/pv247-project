export interface IGroupService {
  verifyUserInGroup(userId: string, groupId: string): Promise<void>;
  isUserInGroup(userId: string, groupId: string): Promise<boolean>;
}
