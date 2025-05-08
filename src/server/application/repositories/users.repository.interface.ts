import { ITransaction } from '@/server/entities/models/transaction.interface';
import { CreateUser, User } from '@/server/entities/models/user';

export interface IUsersRepository {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(input: CreateUser, tx?: ITransaction): Promise<User>;
}
