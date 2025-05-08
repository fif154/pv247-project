'use server';

import { getInjection } from '@/server/di/container';

export const searchUsersByEmailAction = async (email: string) => {
  const controller = getInjection('ISearchUsersByEmailController');

  return await controller({ email });
};
