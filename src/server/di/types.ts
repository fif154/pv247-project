import { IIngredientsRepository } from '../application/repositories/ingredients.repository.interface';
import { IUsersRepository } from '../application/repositories/users.repository.interface';
import { IAuthenticationService } from '../application/services/authentication.service.interface';
import { IRegisterUseCase } from '../application/use-cases/auth/register.use-case';
import { ISignInUseCase } from '../application/use-cases/auth/sign-in.use-case';
import { ICreateIngredientUseCase } from '../application/use-cases/ingredients/create-ingredient.use-case';
import { IDeleteIngredientUseCase } from '../application/use-cases/ingredients/delete-ingredient.use-case';
import { IGetIngredientUseCase } from '../application/use-cases/ingredients/get-ingredient.use-case';
import { IListIngredientsUseCase } from '../application/use-cases/ingredients/list-ingredients.use-case';
import { IUpdateIngredientUseCase } from '../application/use-cases/ingredients/update-ingredient.use-case';
import { ICreateRecipeUseCase } from '../application/use-cases/recipes/create-recipe.use-case';
import { IDeleteRecipeUseCase } from '../application/use-cases/recipes/delete-recipe.use-case';
import { IGetRecipeUseCase } from '../application/use-cases/recipes/get-recipe.use-case';
import { IListRecipesUseCase } from '../application/use-cases/recipes/list-recipes.use-case';
import { IUpdateRecipeUseCase } from '../application/use-cases/recipes/update-recipe.use-case';
import { IRegisterController } from '../controllers/auth/register.controller';
import { ISignInController } from '../controllers/auth/sign-in.controller';
import { ICreateIngredientController } from '../controllers/ingredients/create-ingredient.controller';
import { IDeleteIngredientController } from '../controllers/ingredients/delete-ingredient.controller';
import { IGetIngredientController } from '../controllers/ingredients/get-ingredient.controller';
import { IListIngredientsController } from '../controllers/ingredients/list-ingredients.controller';
import { IUpdateIngredientController } from '../controllers/ingredients/update-ingredient.controller';
import { ICreateRecipeController } from '../controllers/recipes/create-recipe.controller';
import { IDeleteRecipeController } from '../controllers/recipes/delete-recipe.controller';
import { IGetRecipeController } from '../controllers/recipes/get-recipe.controller';
import { IListRecipesController } from '../controllers/recipes/list-recipes.controller';
import { IUpdateRecipeController } from '../controllers/recipes/update-recipe.controller';


export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),

  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  IIngredientsRepository: Symbol.for('IIngredientsRepository'),

  // Use Cases
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  IRegisterUseCase: Symbol.for('IRegisterUseCase'),
  ICreateIngredientUseCase: Symbol.for('ICreateIngredientUseCase'),
  IUpdateIngredientUseCase: Symbol.for('IUpdateIngredientUseCase'),
  IDeleteIngredientUseCase: Symbol.for('IDeleteIngredientUseCase'),
  IListIngredientsUseCase: Symbol.for('IListIngredientsUseCase'),
  IGetIngredientUseCase: Symbol.for('IGetIngredientUseCase'),
  ICreateRecipeUseCase: Symbol.for('ICreateRecipeUseCase'),
  IUpdateRecipeUseCase: Symbol.for('IUpdateRecipeUseCase'),
  IDeleteRecipeUseCase: Symbol.for('IDeleteRecipeUseCase'),
  IListRecipesUseCase: Symbol.for('IListRecipesUseCase'),
  IGetRecipeUseCase: Symbol.for('IGetRecipeUseCase'),

  // Controllers
  ISignInController: Symbol.for('ISignInController'),
  IRegisterController: Symbol.for('IRegisterController'),
  ICreateIngredientController: Symbol.for('ICreateIngredientController'),
  IUpdateIngredientController: Symbol.for('IUpdateIngredientController'),
  IDeleteIngredientController: Symbol.for('IDeleteIngredientController'),
  IListIngredientsController: Symbol.for('IListIngredientsController'),
  IGetIngredientController: Symbol.for('IGetIngredientController'),
  ICreateRecipeController: Symbol.for('ICreateRecipeController'),
  IUpdateRecipeController: Symbol.for('IUpdateRecipeController'),
  IDeleteRecipeController: Symbol.for('IDeleteRecipeController'),
  IListRecipesController: Symbol.for('IListRecipesController'),
  IGetRecipeController: Symbol.for('IGetRecipeController'),

  // Repositories
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  IUsersRepository: IUsersRepository;
  IIngredientsRepository: IIngredientsRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  IRegisterUseCase: IRegisterUseCase;
  ICreateIngredientUseCase: ICreateIngredientUseCase;
  IUpdateIngredientUseCase: IUpdateIngredientUseCase;
  IDeleteIngredientUseCase: IDeleteIngredientUseCase;
  IListIngredientsUseCase: IListIngredientsUseCase;
  IGetIngredientUseCase: IGetIngredientUseCase;
  ICreateRecipeUseCase: ICreateRecipeUseCase;
  IUpdateRecipeUseCase: IUpdateRecipeUseCase;
  IDeleteRecipeUseCase: IDeleteRecipeUseCase;
  IListRecipesUseCase: IListRecipesUseCase;
  IGetRecipeUseCase: IGetRecipeUseCase;

  // Controllers
  ISignInController: ISignInController;
  IRegisterController: IRegisterController;
  ICreateIngredientController: ICreateIngredientController;
  IUpdateIngredientController: IUpdateIngredientController;
  IDeleteIngredientController: IDeleteIngredientController;
  IListIngredientsController: IListIngredientsController;
  IGetIngredientController: IGetIngredientController;
  ICreateRecipeController: ICreateRecipeController;
  IUpdateRecipeController: IUpdateRecipeController;
  IDeleteRecipeController: IDeleteRecipeController;
  IListRecipesController: IListRecipesController;
  IGetRecipeController: IGetRecipeController;
}
