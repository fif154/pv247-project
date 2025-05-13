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

export const getUserAction = async (userId: string) => {
  const controller = getInjection('IGetUserController');
  return await controller({ userId });
};

export const editMacrosAction = async (data: {
  userId: string;
  fats: number;
  protein: number;
  carbs: number;
  calories: number;
}) => {
  const controller = getInjection('IEditMacrosController');

  return await controller(data);
};
