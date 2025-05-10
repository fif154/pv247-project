import { groups } from '@/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { User } from 'next-auth';

export type CreateGroup = InferInsertModel<typeof groups>;
export type EditGroup = Omit<Group, 'createdAt' | 'deletedAt' | 'updatedAt'>;
export type Group = InferSelectModel<typeof groups>;

export type GroupWithMembers = Group & {
  members: User[];
};

export type GroupWithMemberIds = Group & {
  members: string[];
};
