import { db, Transaction } from '@/db';
import { users } from '@/db/schema';
import { IUsersRepository } from '@/server/application/repositories/users.repository.interface';
import { DatabaseOperationError } from '@/server/entities/errors/common';
import { CreateUser, User } from '@/server/entities/models/user';
import { eq, inArray, like } from 'drizzle-orm';

export class UsersRepository implements IUsersRepository {
  async getUsersByIds(ids: string[]): Promise<User[] | undefined> {
    try {
      const query = db.select().from(users).where(inArray(users.id, ids));
      const usersList = await query.execute();
      return usersList.length > 0 ? usersList : undefined;
    } catch (err) {
      throw err;
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    const query = db.query.users.findFirst({
      where: eq(users.id, id),
    });
    const user = await query.execute();
    return user;
  }

  async getUserByEmail(
    email: string,
    tx?: Transaction
  ): Promise<User | undefined> {
    const invoker = tx ?? db;
    const query = invoker.query.users.findFirst({
      where: eq(users.email, email),
    });
    const user = await query.execute();
    return user;
  }

  async createUser(input: CreateUser, tx?: Transaction): Promise<User> {
    const invoker = tx ?? db;
    const newUser: CreateUser = input;
    const query = invoker.insert(users).values(newUser).returning();
    const [created] = await query.execute();

    if (created) {
      return created;
    } else {
      throw new DatabaseOperationError('Cannot create user.');
    }
  }

  async searchUsersByEmail(email: string): Promise<User[] | undefined> {
    const query = db
      .select()
      .from(users)
      .where(like(users.email, `%${email}%`));
    const usersList = await query.execute();
    return usersList.length > 0 ? usersList : undefined;
  }

  async updateUser(
    id: string,
    input: Partial<CreateUser>,
    tx?: Transaction
  ): Promise<User | undefined> {
    const invoker = tx ?? db;
    const [updated] = await invoker
      .update(users)
      .set(input)
      .where(eq(users.id, id))
      .returning();

    return updated;
  }
}

export const usersRepository = new UsersRepository();
