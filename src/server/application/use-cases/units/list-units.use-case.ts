import { IUnitsRepository } from '@/server/application/repositories/units.repository.interface';
import { Unit } from '@/server/entities/models/unit';

export interface IListUnitsUseCase {
  (): Promise<Unit[]>;
}

export const listUnitsUseCase = (
  unitsRepository: IUnitsRepository
): IListUnitsUseCase => {
  return async () => {
    return unitsRepository.listUnits();
  };
};
