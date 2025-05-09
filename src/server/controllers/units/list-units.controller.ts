import { IListUnitsUseCase } from '@/server/application/use-cases/units/list-units.use-case';
import { Unit } from '@/server/entities/models/unit';

export interface IListUnitsController {
  (): Promise<Unit[]>;
}

export const listUnitsController = (
  listUnitsUseCase: IListUnitsUseCase
): IListUnitsController => {
  return async () => {
    return listUnitsUseCase();
  };
};
