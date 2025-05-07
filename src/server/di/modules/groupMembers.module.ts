import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types";
import { GroupMembersRepository } from "@/server/infrastructure/repositories/groupMembers.repository";

export function createGroupMembersModule() {
    const groupMembersModule = createModule();

    groupMembersModule.bind(DI_SYMBOLS.IGroupMembersRepository).toClass(GroupMembersRepository, []);

    return groupMembersModule;
}
