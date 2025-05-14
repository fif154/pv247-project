'use server';

import { getInjection } from '@/server/di/container';

export const listMealTypes = async () => {
  const listTypesController = getInjection('IListMealTypesController');
  return await listTypesController();
};
