import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { IRegisterUseCase } from '@/server/application/use-cases/auth/register.use-case';
import { InputParseError } from '@/server/entities/errors/common';
import { z } from 'zod';

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});
export type RegisterInput = z.infer<typeof inputSchema>;

export const registerController =
  (
    registerUseCase: IRegisterUseCase,
    transactionManagerService: ITransactionManagerService
  ) =>
  async (input: unknown, githubRegister = false) => {
    const { data, error } = inputSchema.safeParse(input);

    if (error) {
      throw new InputParseError('Invalid data', { cause: error });
    }

    return await transactionManagerService.startTransaction(async (tx) => {
      try {
        return await registerUseCase(data, tx, !githubRegister);
      } catch (error) {
        console.error('Error registering user', error);
        tx.rollback();
      }
    });
  };

export type IRegisterController = ReturnType<typeof registerController>;
