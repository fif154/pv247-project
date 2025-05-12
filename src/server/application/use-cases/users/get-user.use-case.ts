import { IUsersRepository } from '../../repositories/users.repository.interface';
import { User } from '@/server/entities/models/user';

export const getUserUseCase =
  (usersRepository: IUsersRepository) =>
  async (data: { userId: string }): Promise<User | undefined> => {
    const { userId } = data;

    // Update the group details
    const user = await usersRepository.getUser(userId);

    if (!user) {
      throw new Error('Failed to get user.');
    }

    return user;
  };

export type IGetUserUseCase = ReturnType<typeof getUserUseCase>;
