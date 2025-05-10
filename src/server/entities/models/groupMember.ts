import { groupMembers } from '@/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type CreateGroupMember = InferInsertModel<typeof groupMembers>;
export type GroupMember = InferSelectModel<typeof groupMembers>;
