import { QuantifiedIngredient } from '@/server/application/services/ingredient.service.interface';

export class IngredientService {
  combine<T extends QuantifiedIngredient>(lines: T[]): T[] {
    const memo: Record<string, T> = {};

    for (const l of lines) {
      const key = `${l.ingredientId}-${l.unitId ?? ''}`;

      if (memo[key]) {
        memo[key].quantity += l.quantity;
      } else {
        memo[key] = { ...l };
      }
    }
    return Object.values(memo);
  }
}
