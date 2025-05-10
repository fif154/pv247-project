import { Transaction } from '@/db';
import { CreateUser, EditUser, User } from '@/server/entities/models/user';

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUsersByIds(ids: string[]): Promise<User[] | undefined>;
  createUser(input: CreateUser, tx?: Transaction): Promise<User>;
  searchUsersByEmail(email: string): Promise<User[] | undefined>;
  editUser(user: EditUser, tx?: Transaction): Promise<User | undefined>;
}
