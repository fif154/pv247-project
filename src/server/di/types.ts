import { IGroupMembersRepository } from '../application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '../application/repositories/groups.repository.interface';
import { IUsersRepository } from '../application/repositories/users.repository.interface';
import { IAuthenticationService } from '../application/services/authentication.service.interface';
import { IRegisterUseCase } from '../application/use-cases/auth/register.use-case';
import { ISignInUseCase } from '../application/use-cases/auth/sign-in.use-case';
import { ICreateGroupWithMembersUseCase } from '../application/use-cases/groups/create-group-with-members.use-case';
import { IGetGroupWithMembersUseCase } from '../application/use-cases/groups/get-group-with-members.use-case';
import { ISearchUsersByEmailUseCase } from '../application/use-cases/users/search-users.use-case';
import { IRegisterController } from '../controllers/auth/register.controller';
import { ISignInController } from '../controllers/auth/sign-in.controller';
import { ICreateGroupWithMembersController } from '../controllers/groups/create-group-with-members.controller';
import { IGetGroupWithMembersController } from '../controllers/groups/get-group-with-members.controller';
import { ISearchUsersByEmailController } from '../controllers/users/search-users.controller';

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),

  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  IGroupsRepository: Symbol.for('IGroupsRepository'),
  IGroupMembersRepository: Symbol.for('IGroupMembersRepository'),

  // Use Cases
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  IRegisterUseCase: Symbol.for('IRegisterUseCase'),
  IGetGroupWithMembersUseCase: Symbol.for('IGetGroupWithMembersUseCase'),
  ICreateGroupWithMembersUseCase: Symbol.for('ICreateGroupWithMembersUseCase'),
  ISearchUsersByEmailUseCase: Symbol.for('ISearchUsersByEmailUseCase'),

  // Controllers
  ISignInController: Symbol.for('ISignInController'),
  IRegisterController: Symbol.for('IRegisterController'),
  IGetGroupWithMembersController: Symbol.for('IGetGroupWithMembersController'),
  ICreateGroupWithMembersController: Symbol.for(
    'ICreateGroupWithMembersController'
  ),
  ISearchUsersByEmailController: Symbol.for('ISearchUsersByEmailController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  IUsersRepository: IUsersRepository;
  IGroupsRepository: IGroupsRepository;
  IGroupMembersRepository: IGroupMembersRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  IRegisterUseCase: IRegisterUseCase;
  IGetGroupWithMembersUseCase: IGetGroupWithMembersUseCase;
  ICreateGroupWithMembersUseCase: ICreateGroupWithMembersUseCase;
  ISearchUsersByEmailUseCase: ISearchUsersByEmailUseCase;
  // Controllers
  ISignInController: ISignInController;
  IRegisterController: IRegisterController;
  IGetGroupWithMembersController: IGetGroupWithMembersController;
  ICreateGroupWithMembersController: ICreateGroupWithMembersController;
  ISearchUsersByEmailController: ISearchUsersByEmailController;
}
