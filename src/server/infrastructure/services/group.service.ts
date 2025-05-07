import { IGroupMembersRepository } from "@/server/application/repositories/groupMembers.repository.interface";
import { IGroupsRepository } from "@/server/application/repositories/groups.repository.interface";
import { IUsersRepository } from "@/server/application/repositories/users.repository.interface";
import { IGroupService } from "@/server/application/services/group.service.interface";
import { getInjection } from "@/server/di/container";
import { CreateGroup, GroupWithMemberIds, GroupWithMembers } from "@/server/entities/models/group";

export class GroupService implements IGroupService {
    private readonly _groupRepository: IGroupsRepository;
    private readonly _groupMembersRepository: IGroupMembersRepository;
    private readonly _userRepository: IUsersRepository;
    constructor(
    ) {
        this._groupRepository = getInjection("IGroupsRepository");
        this._groupMembersRepository = getInjection("IGroupMembersRepository");
        this._userRepository = getInjection("IUsersRepository");
    }
    async getGroupWithMembers(id: string): Promise<GroupWithMembers | undefined> {
        const group = await this._groupRepository.getGroup(id);
        const members = await this._groupMembersRepository.getGroupUsers(id);
        if (group === undefined || members === undefined) {
            return undefined;
        }
        const users = await this._userRepository.getUsersByIds(members);
        if (users === undefined) {
            return undefined;
        }
        return {
            ...group,
            members: users,
        };
    }

    async createGroupWithMembers(group: CreateGroup, members: string[]): Promise<GroupWithMemberIds | undefined> {
        const createdGroup = await this._groupRepository.createGroup(group);
        const groupMembers = await this._groupMembersRepository.addUsersToGroup(members, createdGroup.id);
        return {
            ...createdGroup,
            members: groupMembers.map((member) => (member.userId)),
        };
    }
}