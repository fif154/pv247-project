import { ingredients } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { TModelWithRelations } from '../utils';

export type Ingredient = TModelWithRelations<'ingredients'>;
export type CreateIngredient = InferInsertModel<typeof ingredients>;
