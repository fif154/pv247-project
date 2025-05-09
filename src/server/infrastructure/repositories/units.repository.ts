import { db } from '@/db';
import { units } from '@/db/schema';
import { IUnitsRepository } from '@/server/application/repositories/units.repository.interface';
import { Unit } from '@/server/entities/models/unit';

export class UnitsRepository implements IUnitsRepository {
  async listUnits(): Promise<Unit[]> {
    return db.select().from(units).all();
  }
}
