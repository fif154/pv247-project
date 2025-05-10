import { Transaction } from '@/db';
import { CreateGroup, EditGroup, Group } from '@/server/entities/models/group';

export interface IGroupsRepository {
  getGroup(id: string): Promise<Group | undefined>;
  editGroup(group: EditGroup, tx?: Transaction): Promise<Group | undefined>;
  removeGroup(id: string, tx?: Transaction): Promise<boolean>;
  createGroup(input: CreateGroup, tx?: Transaction): Promise<Group>;
}
