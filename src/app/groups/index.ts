'use server';

import { revalidatePath } from 'next/cache';
import { inArray, like } from 'drizzle-orm';

import { db } from '@/db';
import { Group, groupMembers, groups, User, users } from '@/db/schema';

export const fetchUsers = async ({
	query
}: {
	query: string;
}): Promise<User[]> => {
	const filteredUsers = await db
		.select()
		.from(users)
		.where(like(users.email, `${query}%`))
	revalidatePath('/server-action');
	return filteredUsers;
};


export const fetchUserGroups = async ({
	userId
}: {
	userId: string;
}): Promise<Group[]> => {
	const userGroupsIds = await db
		.select({ groupId: groupMembers.id })
		.from(groupMembers)
		.where(like(groupMembers.userId, userId))
	const userGroups = await db
		.select()
		.from(groups)
		.where(inArray(groups.id, userGroupsIds.map(g => g.groupId)))
	revalidatePath('/server-action');
	return userGroups;
};

