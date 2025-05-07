import { createModule } from "@evyweb/ioctopus";

import { DI_SYMBOLS } from "../types";
import { GroupsRepository } from "@/server/infrastructure/repositories/groups.repository";

export function createGroupsModule() {
    const groupsModule = createModule();

    groupsModule.bind(DI_SYMBOLS.IGroupsRepository).toClass(GroupsRepository, []);

    return groupsModule;
}
