import { units } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type Unit = TModelWithRelations<'units'>;
export type CreateUnit = InferInsertModel<typeof units>;
