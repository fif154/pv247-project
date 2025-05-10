import { recipes } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type Recipe = TModelWithRelations<'recipes'>;
export type CreateRecipe = InferInsertModel<typeof recipes>;
