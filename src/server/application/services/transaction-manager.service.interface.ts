import { ITransaction } from '@/server/entities/models/transaction.interface';

export interface ITransactionManagerService {
  startTransaction<T>(
    clb: (tx: ITransaction) => Promise<T>,
    parent?: ITransaction
  ): Promise<T>;
}
