import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { IGroupService } from '@/server/application/services/group.service.interface';
import { GroupAccessError } from '../../entities/errors/common';

export class GroupService implements IGroupService {
  constructor(
    private readonly groupMembersRepository: IGroupMembersRepository,
    private readonly groupsRepository: IGroupsRepository
  ) {}

  async verifyUserInGroup(userId: string, groupId: string): Promise<void> {
    const isInGroup = await this.isUserInGroup(userId, groupId);
    if (!isInGroup) {
      throw new GroupAccessError('User is not a member of this group');
    }
  }

  async isUserInGroup(userId: string, groupId: string): Promise<boolean> {
    const group = await this.groupsRepository.getGroup(groupId);
    if (!group) {
      return false;
    }

    const members =
      await this.groupMembersRepository.getGroupMembersByGroupId(groupId);
    return members.some((member) => member.userId === userId);
  }
}
