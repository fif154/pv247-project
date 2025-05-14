import { IUsersRepository } from '../../repositories/users.repository.interface';
import { User } from '@/server/entities/models/user';

export const editMacrosUseCase =
  (usersRepository: IUsersRepository) =>
  async (
    data: {
      userId: string;
      fats: number;
      protein: number;
      carbs: number;
      calories: number;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ): Promise<User | undefined> => {
    const { userId, fats, protein, carbs, calories } = data;

    // Update the group details
    const updatedUser = await usersRepository.updateUser(
      userId,
      {
        fats,
        protein,
        carbs,
        calories,
      },
      tx
    );

    if (!updatedUser) {
      throw new Error('Failed to update macros.');
    }

    return updatedUser;
  };

export type IEditMacrosUseCase = ReturnType<typeof editMacrosUseCase>;
