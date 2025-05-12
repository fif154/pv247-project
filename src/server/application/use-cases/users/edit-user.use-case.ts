import { IUsersRepository } from '../../repositories/users.repository.interface';
import { User } from '@/server/entities/models/user';

export const editUserUseCase =
  (usersRepository: IUsersRepository) =>
  async (
    data: {
      userId: string;
      name: string;
      email: string;
      image?: string | null;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any
  ): Promise<User | undefined> => {
    const { userId, name, email, image } = data;

    // Update the group details
    const updatedUser = await usersRepository.updateUser(
      userId,
      {
        name,
        email,
        image,
      },
      tx
    );

    if (!updatedUser) {
      throw new Error('Failed to update user.');
    }

    return updatedUser;
  };

export type IEditUserUseCase = ReturnType<typeof editUserUseCase>;
