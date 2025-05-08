import { createModule } from "@evyweb/ioctopus";

import { TransactionManagerService } from "@/server/infrastructure/services/transaction-manager.service";
import { DI_SYMBOLS } from "../types";

export function createTransactionManagerModule() {
  const transactionManagerModule = createModule();

  transactionManagerModule
    .bind(DI_SYMBOLS.ITransactionManagerService)
    .toClass(TransactionManagerService);

  return transactionManagerModule;
}
