import { auth } from '@/auth';
import { IUsersRepository } from '@/server/application/repositories/users.repository.interface';
import { NotFoundError } from '@/server/entities/errors/common';
import { IGroupsRepository } from '../../repositories/groups.repository.interface';

export const setCurrentGroupUseCase =
  (usersRepository: IUsersRepository, groupsRepository: IGroupsRepository) =>
  async (groupId: string) => {
    const user = (await auth())?.user;
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // check if the group exists and if the user is a member of it
    const group = await groupsRepository.getGroup(groupId);
    if (!group || !group.members?.some((m) => m.userId === user.id)) {
      throw new NotFoundError('Group not found');
    }

    const updatedUser = await usersRepository.updateUser(user.id, {
      groupId,
    });

    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }

    return updatedUser;
  };

export type ISetCurrentGroupUseCase = ReturnType<typeof setCurrentGroupUseCase>;
