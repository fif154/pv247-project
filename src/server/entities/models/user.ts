import { users } from '@/db/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type User = InferSelectModel<typeof users>;
export type CreateUser = InferInsertModel<typeof users>;
export type UserInfo = Pick<User, 'id' | 'email'>;
export type EditUser = Pick<User, 'id' | 'email' | 'name'>;
