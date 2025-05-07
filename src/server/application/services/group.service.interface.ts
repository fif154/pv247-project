import { CreateGroup, GroupWithMemberIds, GroupWithMembers } from "@/server/entities/models/group";

export interface IGroupService {
    getGroupWithMembers(id: string) : Promise<GroupWithMembers | undefined>
    createGroupWithMembers(group: CreateGroup, members: string[]): Promise<GroupWithMemberIds | undefined>
}