"use server";

import { getInjection } from "@/server/di/container";
import { Unit } from "@/server/entities/models/unit";

export async function listUnits(): Promise<Unit[]> {
    const listUnitsController = getInjection("IListUnitsController");
    return listUnitsController();
}
