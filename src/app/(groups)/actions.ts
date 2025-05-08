'use server';

import { getInjection } from '@/server/di/container';

export const createGroupWithMembersAction = async (data: {
  name: string;
  description?: string;
  members: string[];
}) => {
  const controller = getInjection('ICreateGroupWithMembersController');

  return await controller(data);
};

export const getGroupWithMembersAction = async (groupId: string) => {
  const controller = getInjection('IGetGroupWithMembersController');

  return await controller({ groupId });
};

export const getUserGroupsWithMembersAction = async (userId: string) => {
  const controller = getInjection('IGetUserGroupsWithMembersController');

  return await controller({ userId });
};

export const editGroupAction = async (data: {
  groupId: string;
  name: string;
  description?: string;
  members: string[];
}) => {
  const controller = getInjection('IEditGroupController');

  return await controller(data);
};

export const removeGroupAction = async (groupId: string) => {
  const controller = getInjection('IRemoveGroupController');

  return await controller({ groupId });
};

export const removeMemberFromGroupAction = async (data: {
  groupId: string;
  memberId: string;
}) => {
  const controller = getInjection('IRemoveMemberFromGroupController');

  return await controller(data);
};
