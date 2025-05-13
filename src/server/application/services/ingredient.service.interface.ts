export type QuantifiedIngredient = {
  ingredientId: string;
  unitId?: string | null;
  quantity: number;
  [key: string]: unknown;
};

export interface IIngredientService {
  combine<T extends QuantifiedIngredient>(lines: T[]): T[];
}
