import { groups } from '@/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { User } from 'next-auth';
import { TModelWithRelations } from '../utils';

type GroupWithoutRelations = InferSelectModel<typeof groups>;
export type Group = TModelWithRelations<'groups'>;
export type CreateGroup = InferInsertModel<typeof groups>;
export type EditGroup = Omit<Group, 'createdAt' | 'deletedAt' | 'updatedAt'>;

export type GroupWithMembers = GroupWithoutRelations & {
  members: User[];
};

export type GroupWithMemberIds = GroupWithoutRelations & {
  members: string[];
};
