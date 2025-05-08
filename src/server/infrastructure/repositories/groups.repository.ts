import { db } from '@/db';
import { groups } from '@/db/schema';
import { IGroupsRepository } from '@/server/application/repositories/groups.repository.interface';
import { DatabaseOperationError } from '@/server/entities/errors/common';
import { CreateGroup, EditGroup, Group } from '@/server/entities/models/group';
import { and, eq, isNull } from 'drizzle-orm';

export class GroupsRepository implements IGroupsRepository {
  constructor() {}
  async getGroup(id: string): Promise<Group | undefined> {
    const query = db.query.groups.findFirst({
      where: and(eq(groups.id, id), isNull(groups.deletedAt)),
    });

    const group = await query.execute();

    return group;
  }

  async editGroup(group: EditGroup): Promise<Group | undefined> {
    const query = db
      .update(groups)
      .set(group)
      .where(and(eq(groups.id, group.id), isNull(groups.deletedAt)))
      .returning();

    const updatedGroup = await query.execute();

    return updatedGroup.at(0);
  }

  async removeGroup(id: string): Promise<boolean> {
    const query = db
      .update(groups)
      .set({ deletedAt: new Date().toISOString() })
      .where(and(eq(groups.id, id), isNull(groups.deletedAt)))
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
