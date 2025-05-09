import { listUnitsUseCase } from '@/server/application/use-cases/units/list-units.use-case';
import { listUnitsController } from '@/server/controllers/units/list-units.controller';
import { UnitsRepository } from '@/server/infrastructure/repositories/units.repository';
import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';

export const createUnitsModule = () => {
  const unitsModule = createModule();

  unitsModule.bind(DI_SYMBOLS.IUnitsRepository).toClass(UnitsRepository, []);
  unitsModule
    .bind(DI_SYMBOLS.IListUnitsUseCase)
    .toHigherOrderFunction(listUnitsUseCase, [DI_SYMBOLS.IUnitsRepository]);
  unitsModule
    .bind(DI_SYMBOLS.IListUnitsController)
    .toHigherOrderFunction(listUnitsController, [DI_SYMBOLS.IListUnitsUseCase]);

  return unitsModule;
};
