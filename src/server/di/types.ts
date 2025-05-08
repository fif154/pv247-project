import { IGroupMembersRepository } from '../application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '../application/repositories/groups.repository.interface';
import { IIngredientsRepository } from '../application/repositories/ingredients.repository.interface';
import { IUsersRepository } from '../application/repositories/users.repository.interface';
import { IAuthenticationService } from '../application/services/authentication.service.interface';
import { IRegisterUseCase } from '../application/use-cases/auth/register.use-case';
import { ISignInUseCase } from '../application/use-cases/auth/sign-in.use-case';
import { ICreateGroupWithMembersUseCase } from '../application/use-cases/groups/create-group-with-members.use-case';
import { IEditGroupUseCase } from '../application/use-cases/groups/edit-group.use-case';
import { IGetGroupWithMembersUseCase } from '../application/use-cases/groups/get-group-with-members.use-case';
import { ISearchUsersByEmailUseCase } from '../application/use-cases/users/search-users.use-case';
import { IRegisterController } from '../controllers/auth/register.controller';
import { ISignInController } from '../controllers/auth/sign-in.controller';
import { ICreateGroupWithMembersController } from '../controllers/groups/create-group-with-members.controller';
import { IEditGroupController } from '../controllers/groups/edit-group.controller';
import { IGetGroupWithMembersController } from '../controllers/groups/get-group-with-members.controller';
import { ISearchUsersByEmailController } from '../controllers/users/search-users.controller';
import { IRemoveGroupUseCase } from '../application/use-cases/groups/remove-group.use-case';
import { IRemoveGroupController } from '../controllers/groups/remove-group.controller';
import { IRemoveMemberFromGroupUseCase } from '../application/use-cases/groups/remove-member-from-group.use-case';
import { IRemoveMemberFromGroupController } from '../controllers/groups/remove-member-from-group.controller';
import { ICreateIngredientUseCase } from '../application/use-cases/ingredients/create-ingredient.use-case';
import { IDeleteIngredientUseCase } from '../application/use-cases/ingredients/delete-ingredient.use-case';
import { IGetIngredientUseCase } from '../application/use-cases/ingredients/get-ingredient.use-case';
import { IListIngredientsUseCase } from '../application/use-cases/ingredients/list-ingredients.use-case';
import { IUpdateIngredientUseCase } from '../application/use-cases/ingredients/update-ingredient.use-case';
import { IRegisterController } from '../controllers/auth/register.controller';
import { ISignInController } from '../controllers/auth/sign-in.controller';
import { ICreateIngredientController } from '../controllers/ingredients/create-ingredient.controller';
import { IDeleteIngredientController } from '../controllers/ingredients/delete-ingredient.controller';
import { IGetIngredientController } from '../controllers/ingredients/get-ingredient.controller';
import { IListIngredientsController } from '../controllers/ingredients/list-ingredients.controller';
import { IUpdateIngredientController } from '../controllers/ingredients/update-ingredient.controller';

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),

  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  IGroupsRepository: Symbol.for('IGroupsRepository'),
  IGroupMembersRepository: Symbol.for('IGroupMembersRepository'),
  IIngredientsRepository: Symbol.for('IIngredientsRepository'),

  // Use Cases
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  IRegisterUseCase: Symbol.for('IRegisterUseCase'),
  IGetGroupWithMembersUseCase: Symbol.for('IGetGroupWithMembersUseCase'),
  ICreateGroupWithMembersUseCase: Symbol.for('ICreateGroupWithMembersUseCase'),
  ISearchUsersByEmailUseCase: Symbol.for('ISearchUsersByEmailUseCase'),
  IEditGroupUseCase: Symbol.for('IEditGroupUseCase'),
  IRemoveGroupUseCase: Symbol.for('IRemoveGroupUseCase'),
  IRemoveMemberFromGroupUseCase: Symbol.for('IRemoveMemberFromGroupUseCase'),
  ICreateIngredientUseCase: Symbol.for('ICreateIngredientUseCase'),
  IUpdateIngredientUseCase: Symbol.for('IUpdateIngredientUseCase'),
  IDeleteIngredientUseCase: Symbol.for('IDeleteIngredientUseCase'),
  IListIngredientsUseCase: Symbol.for('IListIngredientsUseCase'),
  IGetIngredientUseCase: Symbol.for('IGetIngredientUseCase'),

  // Controllers
  ISignInController: Symbol.for('ISignInController'),
  IRegisterController: Symbol.for('IRegisterController'),
  IGetGroupWithMembersController: Symbol.for('IGetGroupWithMembersController'),
  ICreateGroupWithMembersController: Symbol.for(
    'ICreateGroupWithMembersController'
  ),
  ISearchUsersByEmailController: Symbol.for('ISearchUsersByEmailController'),
  IEditGroupController: Symbol.for('IEditGroupController'),
  IRemoveGroupController: Symbol.for('IRemoveGroupController'),
  IRemoveMemberFromGroupController: Symbol.for(
    'IRemoveMemberFromGroupController'
  ),
  ICreateIngredientController: Symbol.for('ICreateIngredientController'),
  IUpdateIngredientController: Symbol.for('IUpdateIngredientController'),
  IDeleteIngredientController: Symbol.for('IDeleteIngredientController'),
  IListIngredientsController: Symbol.for('IListIngredientsController'),
  IGetIngredientController: Symbol.for('IGetIngredientController'),
  // Repositories
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  IUsersRepository: IUsersRepository;
  IGroupsRepository: IGroupsRepository;
  IGroupMembersRepository: IGroupMembersRepository;
  IIngredientsRepository: IIngredientsRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  IRegisterUseCase: IRegisterUseCase;
  IGetGroupWithMembersUseCase: IGetGroupWithMembersUseCase;
  ICreateGroupWithMembersUseCase: ICreateGroupWithMembersUseCase;
  ISearchUsersByEmailUseCase: ISearchUsersByEmailUseCase;
  IEditGroupUseCase: IEditGroupUseCase;
  IRemoveGroupUseCase: IRemoveGroupUseCase;
  IRemoveMemberFromGroupUseCase: IRemoveMemberFromGroupUseCase;
  ICreateIngredientUseCase: ICreateIngredientUseCase;
  IUpdateIngredientUseCase: IUpdateIngredientUseCase;
  IDeleteIngredientUseCase: IDeleteIngredientUseCase;
  IListIngredientsUseCase: IListIngredientsUseCase;
  IGetIngredientUseCase: IGetIngredientUseCase;

  // Controllers
  ISignInController: ISignInController;
  IRegisterController: IRegisterController;
  IGetGroupWithMembersController: IGetGroupWithMembersController;
  ICreateGroupWithMembersController: ICreateGroupWithMembersController;
  ISearchUsersByEmailController: ISearchUsersByEmailController;
  IEditGroupController: IEditGroupController;
  IRemoveGroupController: IRemoveGroupController;
  IRemoveMemberFromGroupController: IRemoveMemberFromGroupController;
  ICreateIngredientController: ICreateIngredientController;
  IUpdateIngredientController: IUpdateIngredientController;
  IDeleteIngredientController: IDeleteIngredientController;
  IListIngredientsController: IListIngredientsController;
  IGetIngredientController: IGetIngredientController;
}
