import { RegisterInput } from '@/server/controllers/auth/register.controller';
import { AuthenticationError } from '@/server/entities/errors/auth';
import { IGroupMembersRepository } from '../../repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '../../repositories/groups.repository.interface';
import { IUsersRepository } from '../../repositories/users.repository.interface';
import { IAuthenticationService } from '../../services/authentication.service.interface';

export const registerUseCase =
  (
    usersRepository: IUsersRepository,
    authenticationService: IAuthenticationService,
    groupsRepository: IGroupsRepository,
    groupMembersRepository: IGroupMembersRepository
  ) =>
  async (
    input: RegisterInput,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tx?: any,
    // This is here so that we can call the same use case when registering with
    // GitHub.
    shouldCreateUser = true
  ) => {
    const existingUser = await usersRepository.getUserByEmail(input.email, tx);

    if (existingUser && shouldCreateUser) {
      throw new AuthenticationError('User with this email already exists');
    }

    const passwordHash = await authenticationService.hashPassword(
      input.password ?? ''
    );

    let groupId = existingUser?.groupId;
    if (!groupId) {
      const defaultGroup = await groupsRepository.createGroup(
        {
          name: `${input.firstName ?? existingUser?.name}'s group`,
          description: 'This is your personal default group',
        },
        tx
      );
      groupId = defaultGroup.id;
    }

    let user = existingUser;
    if (shouldCreateUser) {
      user = await usersRepository.createUser(
        {
          email: input.email,
          passwordHash,
          name: `${input.firstName} ${input.lastName}`,
          groupId,
          // Reference income of adult
          calories: 2000,
          fats: 70,
          protein: 50,
          carbs: 270,
        },
        tx
      );
    } else {
      user = await usersRepository.updateUser(
        existingUser!.id,
        {
          groupId,
        },
        tx
      );
    }

    if (groupId !== existingUser?.groupId) {
      await groupMembersRepository.addUserToGroup(user!.id, groupId, tx);
    }

    return user;
  };

export type IRegisterUseCase = ReturnType<typeof registerUseCase>;
