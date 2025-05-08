import { db } from '@/db';
import { groups } from '@/db/schema';
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { DatabaseOperationError } from '@/server/entities/errors/common';
import { CreateGroup, Group } from '@/server/entities/models/group';
import { eq } from 'drizzle-orm';

export class GroupsRepository implements IGroupsRepository {
  constructor() {}
  async getGroup(id: string): Promise<Group | undefined> {
    const query = db.query.groups.findFirst({
      where: eq(groups.id, id),
    });

    const group = await query.execute();

    return group;
  }

  async editGroup(group: Group): Promise<Group | undefined> {
    const query = db
      .update(groups)
      .set(group)
      .where(eq(groups.id, group.id))
      .returning();

    const updatedGroup = await query.execute();

    return updatedGroup.at(0);
  }

  async removeGroup(id: string): Promise<boolean> {
    const query = db
      .update(groups)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(groups.id, id))
      .returning();

    const removed = await query.execute();

    return removed.length !== 0;
  }

  async createGroup(input: CreateGroup): Promise<Group> {
    const query = db.insert(groups).values(input).returning();

    const [created] = await query.execute();

    if (created) {
      return created;
    } else {
      throw new DatabaseOperationError('Cannot create group.');
    }
  }
}
