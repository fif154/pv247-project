import { CreateGroup, EditGroup, Group } from '@/server/entities/models/group';

export interface IGroupsRepository {
  getGroup(id: string): Promise<Group | undefined>;
  editGroup(group: EditGroup): Promise<Group | undefined>;
  removeGroup(id: string): Promise<boolean>;
  createGroup(input: CreateGroup): Promise<Group>;
}
