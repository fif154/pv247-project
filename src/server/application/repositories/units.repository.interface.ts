import { Unit } from '@/server/entities/models/unit';

export interface IUnitsRepository {
  listUnits(): Promise<Unit[]>;
}
