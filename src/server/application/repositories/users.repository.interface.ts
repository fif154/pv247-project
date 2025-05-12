import { Transaction } from '@/db';
import { CreateUser, User } from '@/server/entities/models/user';

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string, tx?: Transaction): Promise<User | undefined>;
  getUsersByIds(ids: string[]): Promise<User[] | undefined>;
  createUser(input: CreateUser, tx?: Transaction): Promise<User>;
  searchUsersByEmail(email: string): Promise<User[] | undefined>;
  updateUser(
    id: string,
    input: Partial<CreateUser>,
    tx?: Transaction
  ): Promise<User | undefined>;
}
