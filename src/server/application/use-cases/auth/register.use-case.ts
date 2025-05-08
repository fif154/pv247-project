import { AuthenticationError } from "@/server/entities/errors/auth";
import { IUsersRepository } from "../../repositories/users.repository.interface";
import { IAuthenticationService } from "../../services/authentication.service.interface";

export const registerUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService,
  ) =>
  async (input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const existingUser = await usersRepository.getUserByEmail(input.email);

    if (existingUser) {
      throw new AuthenticationError("User with this email already exists");
    }

    const passwordHash = await authenticationService.hashPassword(
      input.password,
    );

    const newUser = await usersRepository.createUser({
      email: input.email,
      passwordHash,
      name: `${input.firstName} ${input.lastName}`,
    });

    return newUser;
  };

export type IRegisterUseCase = ReturnType<typeof registerUseCase>;
