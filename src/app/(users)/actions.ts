'use server';

import { getInjection } from '@/server/di/container';

export const searchUsersByEmailAction = async (email: string) => {
  const controller = getInjection('ISearchUsersByEmailController');

  return await controller({ email });
};

export const editUserAction = async (data: {
  userId: string;
  name: string;
  email: string;
  image?: string | null;
}) => {
  const controller = getInjection('IEditUserController');

  return await controller(data);
};
