import { CreateGroup, Group } from '@/server/entities/models/group';

export interface IGroupsRepository {
  getGroup(id: string): Promise<Group | undefined>;
  editGroup(group: Group): Promise<Group | undefined>;
  removeGroup(id: string): Promise<boolean>;
  createGroup(input: CreateGroup): Promise<Group>;
}
