import { db, Transaction } from '@/db';
import { users } from '@/db/schema';
import { IUsersRepository } from '@/server/application/repositories/users.repository.interface';
import { DatabaseOperationError } from '@/server/entities/errors/common';
import { CreateUser, EditUser, User } from '@/server/entities/models/user';
import { and, eq, inArray, isNull, like } from 'drizzle-orm';

export class UsersRepository implements IUsersRepository {
  constructor() {}
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
    try {
      const query = db.query.users.findFirst({
        where: eq(users.id, id),
      });

      const user = await query.execute();

      return user;
    } catch (err) {
      throw err;
    }
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const query = db.query.users.findFirst({
        where: eq(users.email, email),
      });

      const user = await query.execute();

      return user;
    } catch (err) {
      throw err;
    }
  }
  async createUser(input: CreateUser): Promise<User> {
    try {
      const newUser: CreateUser = input;
      const query = db.insert(users).values(newUser).returning();

      const [created] = await query.execute();

      if (created) {
        return created;
      } else {
        throw new DatabaseOperationError('Cannot create user.');
      }
    } catch (err) {
      throw err;
    }
  }

  async searchUsersByEmail(email: string): Promise<User[] | undefined> {
    try {
      const query = db
        .select()
        .from(users)
        .where(like(users.email, `%${email}%`)); // Dynamic search using LIKE

      const usersList = await query.execute();

      return usersList.length > 0 ? usersList : undefined;
    } catch (err) {
      throw err;
    }
  }

  async editUser(user: EditUser, tx?: Transaction): Promise<User | undefined> {
    const query = (tx ?? db)
      .update(users)
      .set(user)
      .where(and(eq(users.id, user.id), isNull(users.deletedAt)))
      .returning();

    const updatedUser = await query.execute();

    return updatedUser.at(0);
  }
}
