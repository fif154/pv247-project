import { ITransactionManagerService } from '@/server/application/services/transaction-manager.service.interface';
import { Meal } from '@/server/entities/models/meal';
import { DateRange } from 'react-day-picker';

export const copyMealsToDateRangeController =
  (
    copyMealsToDateRangeUseCase: (
      mealPlanId: string,
      sourceDateRange: DateRange,
      targetDateRange: DateRange,
      randomize?: boolean
    ) => Promise<Meal[]>,
    transactionManager: ITransactionManagerService
  ) =>
  async (
    mealPlanId: string,
    sourceDateRange: DateRange,
    targetDateRange: DateRange,
    randomize: boolean = false
  ) => {
    return transactionManager.startTransaction(async (tx) => {
      try {
        return await copyMealsToDateRangeUseCase(
          mealPlanId,
          sourceDateRange,
          targetDateRange,
          randomize
        );
      } catch (error) {
        console.error('Error copying meals to date range:', error);
        tx.rollback();
      }
    });
  };

export type ICopyMealsToDateRangeController = ReturnType<
  typeof copyMealsToDateRangeController
>;
