import { db, Transaction } from '@/db';
import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';

export class TransactionManagerService implements ITransactionManagerService {
  public startTransaction<T>(
    clb: (tx: Transaction) => Promise<T>,
    parent?: Transaction
  ): Promise<T> {
    const invoker = parent ?? db;
    return invoker.transaction(clb);
  }
}
