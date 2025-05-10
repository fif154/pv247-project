import { IUsersRepository } from '../../repositories/users.repository.interface';

export const searchUsersByEmailUseCase =
  (usersRepository: IUsersRepository) => async (email: string) => {
    if (!email || email.trim() === '') {
      throw new Error('Email must not be empty');
    }

    const users = await usersRepository.searchUsersByEmail(email);

    return users ?? [];
  };

export type ISearchUsersByEmailUseCase = ReturnType<
  typeof searchUsersByEmailUseCase
>;
