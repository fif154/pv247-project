import { db, Transaction } from '@/db';
import { groupMembers } from '@/db/schema';
import { IGroupMembersRepository } from '@/server/application/repositories/groupMembers.repository.interface';
import { DatabaseOperationError } from '@/server/entities/errors/common';
import { GroupMember } from '@/server/entities/models/groupMember';
import { and, eq, inArray, isNull } from 'drizzle-orm';

export class GroupMembersRepository implements IGroupMembersRepository {
  constructor() {}
  async getUserGroups(userId: string): Promise<string[] | undefined> {
    const query = db.query.groupMembers.findMany({
      where: and(
        eq(groupMembers.userId, userId),
        isNull(groupMembers.deletedAt)
      ),
    });

    const groups = await query.execute();

    return groups.map((g) => g.groupId);
  }
  async getGroupUsers(groupId: string): Promise<string[] | undefined> {
    const query = db.query.groupMembers.findMany({
      where: and(
        eq(groupMembers.groupId, groupId),
        isNull(groupMembers.deletedAt)
      ),
    });

    const users = await query.execute();

    return users.map((g) => g.userId);
  }
  async removeUserFromAllGroups(
    userId: string,
    tx?: Transaction
  ): Promise<boolean> {
    const query = (tx ?? db)
      .update(groupMembers)
      .set({ deletedAt: new Date().toISOString() })
      .where(
        and(eq(groupMembers.userId, userId), isNull(groupMembers.deletedAt))
      )
      .returning();

    const removed = await query.execute();

    return removed.length !== 0;
  }
  async removeUserFromGroup(
    userId: string,
    groupId: string,
    tx?: Transaction
  ): Promise<boolean> {
    const query = (tx ?? db)
      .update(groupMembers)
      .set({ deletedAt: new Date().toISOString() })
      .where(
        and(
          eq(groupMembers.userId, userId),
          eq(groupMembers.groupId, groupId),
          isNull(groupMembers.deletedAt)
        )
      )
      .returning();

    const removed = await query.execute();

    return removed.length !== 0;
  }
  async removeUsersFromGroup(
    userIds: string[],
    groupId: string,
    tx?: Transaction
  ): Promise<boolean> {
    const query = (tx ?? db)
      .update(groupMembers)
      .set({ deletedAt: new Date().toISOString() })
      .where(
        and(
          inArray(groupMembers.userId, userIds),
          eq(groupMembers.groupId, groupId),
          isNull(groupMembers.deletedAt)
        )
      )
      .returning();

    const removed = await query.execute();

    return removed.length !== 0;
  }
  async removeAllUsersFromGroup(
    groupId: string,
    tx?: Transaction
  ): Promise<boolean> {
    const query = (tx ?? db)
      .update(groupMembers)
      .set({ deletedAt: new Date().toISOString() })
      .where(
        and(eq(groupMembers.groupId, groupId), isNull(groupMembers.deletedAt))
      )
      .returning();

    const removed = await query.execute();

    return removed.length !== 0;
  }
  async addUserToGroup(
    userId: string,
    groupId: string,
    tx?: Transaction
  ): Promise<GroupMember> {
    const query = (tx ?? db)
      .insert(groupMembers)
      .values({ userId, groupId })
      .returning();

    const [created] = await query.execute();

    if (created) {
      return created;
    } else {
      throw new DatabaseOperationError('Cannot create group.');
    }
  }

  async addUsersToGroup(
    userIds: string[],
    groupId: string,
    tx?: Transaction
  ): Promise<GroupMember[]> {
    const values = userIds.map((userId) => ({ userId, groupId }));
    const query = (tx ?? db).insert(groupMembers).values(values).returning();

    const created = await query.execute();

    if (created.length > 0) {
      return created;
    } else {
      throw new DatabaseOperationError('Cannot create group.');
    }
  }
}
