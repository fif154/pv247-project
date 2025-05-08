import { AuthenticationError } from '@/server/entities/errors/auth';
import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';

export const signInUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService
  ) =>
  async (input: { email: string; password: string }) => {
    const existingUser = await usersRepository.getUserByEmail(input.email);

    if (!existingUser || !existingUser.passwordHash) {
      throw new AuthenticationError('User does not exist');
    }

    const validPassword = await authenticationService.validatePasswords(
      input.password,
      existingUser.passwordHash
    );

    if (!validPassword) {
      throw new AuthenticationError('Incorrect username or password');
    }

    return existingUser;
  };

export type ISignInUseCase = ReturnType<typeof signInUseCase>;
