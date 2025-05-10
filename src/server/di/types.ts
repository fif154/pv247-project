import { IGroceryListItemsRepository } from '@/server/application/repositories/grocery-list-items.repository.interface';
import { IGroceryListsRepository } from '@/server/application/repositories/grocery-lists.repository.interface';
import { IMealPlansRepository } from '@/server/application/repositories/meal-plans.repository.interface';
import { IMealsRepository } from '@/server/application/repositories/meals.repository.interface';
import { IUnitsRepository } from '@/server/application/repositories/units.repository.interface';
import { IAddGroceryListItemsUseCase } from '@/server/application/use-cases/grocery-lists/add-grocery-list-items.use-case';
import { ICreateGroceryListUseCase } from '@/server/application/use-cases/grocery-lists/create-grocery-list.use-case';
import { IDeleteGroceryListItemUseCase } from '@/server/application/use-cases/grocery-lists/delete-grocery-list-item.use-case';
import { IGetGroceryListUseCase } from '@/server/application/use-cases/grocery-lists/get-grocery-list.use-case';
import { IListGroceryListsUseCase } from '@/server/application/use-cases/grocery-lists/list-grocery-lists.use-case';
import { IMarkAllItemsBoughtUseCase } from '@/server/application/use-cases/grocery-lists/mark-all-items-bought.use-case';
import { IUpdateGroceryListItemUseCase } from '@/server/application/use-cases/grocery-lists/update-grocery-list-item.use-case';
import { IUpdateGroceryListUseCase } from '@/server/application/use-cases/grocery-lists/update-grocery-list.use-case';
import { ICreateMealPlanUseCase } from '@/server/application/use-cases/meal-plans/create-meal-plan.use-case';
import { IListMealPlansUseCase } from '@/server/application/use-cases/meal-plans/list-meal-plans.use-case';
import { ICreateMealUseCase } from '@/server/application/use-cases/meals/create-meal.use-case';
import { IListMealsUseCase } from '@/server/application/use-cases/meals/list-meals.use-case';
import { IListUnitsUseCase } from '@/server/application/use-cases/units/list-units.use-case';
import { IAddGroceryListItemsController } from '@/server/controllers/grocery-lists/add-grocery-list-items.controller';
import { ICreateGroceryListController } from '@/server/controllers/grocery-lists/create-grocery-list.controller';
import { IDeleteGroceryListItemController } from '@/server/controllers/grocery-lists/delete-grocery-list-item.controller';
import { IGetGroceryListController } from '@/server/controllers/grocery-lists/get-grocery-list.controller';
import { IListGroceryListsController } from '@/server/controllers/grocery-lists/list-grocery-lists.controller';
import { IMarkAllItemsBoughtController } from '@/server/controllers/grocery-lists/mark-all-items-bought.controller';
import { IUpdateGroceryListController } from '@/server/controllers/grocery-lists/update-grocery-list.controller';
import { ICreateMealPlanController } from '@/server/controllers/meal-plans/create-meal-plan.controller';
import { IListMealPlansController } from '@/server/controllers/meal-plans/list-meal-plans.controller';
import { ICreateMealController } from '@/server/controllers/meals/create-meal.controller';
import { IListMealsController } from '@/server/controllers/meals/list-meals.controller';
import { IListUnitsController } from '@/server/controllers/units/list-units.controller';
import { IGroupMembersRepository } from '../application/repositories/groupMembers.repository.interface';
import { IGroupsRepository } from '../application/repositories/groups.repository.interface';
import { IIngredientCategoriesRepository } from '../application/repositories/ingredient-categories.repository.interface';
import { IIngredientsRepository } from '../application/repositories/ingredients.repository.interface';
import { IRecipesRepository } from '../application/repositories/recipes.repository.interface';
import { IUsersRepository } from '../application/repositories/users.repository.interface';
import { IAuthenticationService } from '../application/services/authentication.service.interface';
import { IGroceryListService } from '../application/services/grocery-list.service.interface';
import { ITransactionManagerService } from '../application/services/transaction-manager.service.interface';
import { IRegisterUseCase } from '../application/use-cases/auth/register.use-case';
import { ISignInUseCase } from '../application/use-cases/auth/sign-in.use-case';
import { ICreateGroupWithMembersUseCase } from '../application/use-cases/groups/create-group-with-members.use-case';
import { IEditGroupUseCase } from '../application/use-cases/groups/edit-group.use-case';
import { IGetGroupWithMembersUseCase } from '../application/use-cases/groups/get-group-with-members.use-case';
import { IGetUserGroupsWithMembersUseCase } from '../application/use-cases/groups/get-user-groups-with-members.use-case';
import { IRemoveGroupUseCase } from '../application/use-cases/groups/remove-group.use-case';
import { IRemoveMemberFromGroupUseCase } from '../application/use-cases/groups/remove-member-from-group.use-case';
import { ICreateCategoryUseCase } from '../application/use-cases/ingredient-categories/create-category.use-case';
import { IListCategoriesUseCase } from '../application/use-cases/ingredient-categories/list-categories.use-case';
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
import { ISearchUsersByEmailUseCase } from '../application/use-cases/users/search-users.use-case';
import { IRegisterController } from '../controllers/auth/register.controller';
import { ISignInController } from '../controllers/auth/sign-in.controller';
import { IUpdateGroceryListItemController } from '../controllers/grocery-lists/update-grocery-list-item.controller';
import { ICreateGroupWithMembersController } from '../controllers/groups/create-group-with-members.controller';
import { IEditGroupController } from '../controllers/groups/edit-group.controller';
import { IGetGroupWithMembersController } from '../controllers/groups/get-group-with-members.controller';
import { IGetUserGroupsWithMembersController } from '../controllers/groups/get-user-groups-with-members.controller';
import { IRemoveGroupController } from '../controllers/groups/remove-group.controller';
import { IRemoveMemberFromGroupController } from '../controllers/groups/remove-member-from-group.controller';
import { ICreateCategoryController } from '../controllers/ingredient-categories/create-category.controller';
import { IListCategoriesController } from '../controllers/ingredient-categories/list-categories.controller';
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
import { ICreateCategoryController } from '../controllers/ingredient-categories/create-category.controller';
import { IListCategoriesController } from '../controllers/ingredient-categories/list-categories.controller';
import { ICreateGroupWithMembersController } from '../controllers/groups/create-group-with-members.controller';
import { IEditGroupController } from '../controllers/groups/edit-group.controller';
import { IEditUserUseCase } from '../application/use-cases/users/edit-user.use-case';
import { IEditUserController } from '../controllers/users/edit-user.controller';
import { ISearchUsersByEmailController } from '../controllers/users/search-users.controller';

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  ITransactionManagerService: Symbol.for('ITransactionManagerService'),
  IGroceryListService: Symbol.for('IGroceryListService'),

  // Repositories
  IUsersRepository: Symbol.for('IUsersRepository'),
  IGroupsRepository: Symbol.for('IGroupsRepository'),
  IGroupMembersRepository: Symbol.for('IGroupMembersRepository'),
  IIngredientsRepository: Symbol.for('IIngredientsRepository'),
  IRecipesRepository: Symbol.for('IRecipesRepository'),

  // Use Cases
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  IRegisterUseCase: Symbol.for('IRegisterUseCase'),
  IGetGroupWithMembersUseCase: Symbol.for('IGetGroupWithMembersUseCase'),
  IGetUserGroupsWithMembersUseCase: Symbol.for(
    'IGetUserGroupsWithMembersUseCase'
  ),
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
  ICreateRecipeUseCase: Symbol.for('ICreateRecipeUseCase'),
  IUpdateRecipeUseCase: Symbol.for('IUpdateRecipeUseCase'),
  IDeleteRecipeUseCase: Symbol.for('IDeleteRecipeUseCase'),
  IListRecipesUseCase: Symbol.for('IListRecipesUseCase'),
  IGetRecipeUseCase: Symbol.for('IGetRecipeUseCase'),
  IEditUserUseCase: Symbol.for('IEditUserUseCase'),

  // Controllers
  ISignInController: Symbol.for('ISignInController'),
  IRegisterController: Symbol.for('IRegisterController'),
  IGetGroupWithMembersController: Symbol.for('IGetGroupWithMembersController'),
  IGetUserGroupsWithMembersController: Symbol.for(
    'IGetUserGroupsWithMembersController'
  ),
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
  ICreateRecipeController: Symbol.for('ICreateRecipeController'),
  IUpdateRecipeController: Symbol.for('IUpdateRecipeController'),
  IDeleteRecipeController: Symbol.for('IDeleteRecipeController'),
  IListRecipesController: Symbol.for('IListRecipesController'),
  IGetRecipeController: Symbol.for('IGetRecipeController'),
  IEditUserController: Symbol.for('IEditUserController'),

  // Ingredient Categories
  IIngredientCategoriesRepository: Symbol.for(
    'IIngredientCategoriesRepository'
  ),
  ICreateCategoryUseCase: Symbol.for('ICreateCategoryUseCase'),
  IListCategoriesUseCase: Symbol.for('IListCategoriesUseCase'),
  ICreateCategoryController: Symbol.for('ICreateCategoryController'),
  IListCategoriesController: Symbol.for('IListCategoriesController'),

  // Units
  IUnitsRepository: Symbol.for('IUnitsRepository'),
  IListUnitsUseCase: Symbol.for('IListUnitsUseCase'),
  IListUnitsController: Symbol.for('IListUnitsController'),

  // Grocery Lists
  IGroceryListsRepository: Symbol.for('IGroceryListsRepository'),
  IGroceryListItemsRepository: Symbol.for('IGroceryListItemsRepository'),
  ICreateGroceryListUseCase: Symbol.for('ICreateGroceryListUseCase'),
  IListGroceryListsUseCase: Symbol.for('IListGroceryListsUseCase'),
  IGetGroceryListUseCase: Symbol.for('IGetGroceryListUseCase'),
  IUpdateGroceryListUseCase: Symbol.for('IUpdateGroceryListUseCase'),
  IAddGroceryListItemsUseCase: Symbol.for('IAddGroceryListItemsUseCase'),
  IUpdateGroceryListItemUseCase: Symbol.for('IUpdateGroceryListItemUseCase'),
  IDeleteGroceryListItemUseCase: Symbol.for('IDeleteGroceryListItemUseCase'),
  IMarkAllItemsBoughtUseCase: Symbol.for('IMarkAllItemsBoughtUseCase'),
  ICreateGroceryListController: Symbol.for('ICreateGroceryListController'),
  IListGroceryListsController: Symbol.for('IListGroceryListsController'),
  IGetGroceryListController: Symbol.for('IGetGroceryListController'),
  IUpdateGroceryListController: Symbol.for('IUpdateGroceryListController'),
  IAddGroceryListItemsController: Symbol.for('IAddGroceryListItemsController'),
  IUpdateGroceryListItemController: Symbol.for(
    'IUpdateGroceryListItemController'
  ),
  IDeleteGroceryListItemController: Symbol.for(
    'IDeleteGroceryListItemController'
  ),
  IMarkAllItemsBoughtController: Symbol.for('IMarkAllItemsBoughtController'),

  // Meals
  IMealsRepository: Symbol.for('IMealsRepository'),
  ICreateMealUseCase: Symbol.for('ICreateMealUseCase'),
  IListMealsUseCase: Symbol.for('IListMealsUseCase'),
  ICreateMealController: Symbol.for('ICreateMealController'),
  IListMealsController: Symbol.for('IListMealsController'),

  // Meal Plans
  IMealPlansRepository: Symbol.for('IMealPlansRepository'),
  ICreateMealPlanUseCase: Symbol.for('ICreateMealPlanUseCase'),
  IListMealPlansUseCase: Symbol.for('IListMealPlansUseCase'),
  ICreateMealPlanController: Symbol.for('ICreateMealPlanController'),
  IListMealPlansController: Symbol.for('IListMealPlansController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  ITransactionManagerService: ITransactionManagerService;
  IGroceryListService: IGroceryListService;

  // Repositories
  IUsersRepository: IUsersRepository;
  IGroupsRepository: IGroupsRepository;
  IGroupMembersRepository: IGroupMembersRepository;
  IIngredientsRepository: IIngredientsRepository;
  IRecipesRepository: IRecipesRepository;

  // Use Cases
  ISignInUseCase: ISignInUseCase;
  IRegisterUseCase: IRegisterUseCase;
  IGetGroupWithMembersUseCase: IGetGroupWithMembersUseCase;
  IGetUserGroupsWithMembersUseCase: IGetUserGroupsWithMembersUseCase;
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
  ICreateRecipeUseCase: ICreateRecipeUseCase;
  IUpdateRecipeUseCase: IUpdateRecipeUseCase;
  IDeleteRecipeUseCase: IDeleteRecipeUseCase;
  IListRecipesUseCase: IListRecipesUseCase;
  IGetRecipeUseCase: IGetRecipeUseCase;
  IEditUserUseCase: IEditUserUseCase;

  // Controllers
  ISignInController: ISignInController;
  IRegisterController: IRegisterController;
  IGetGroupWithMembersController: IGetGroupWithMembersController;
  IGetUserGroupsWithMembersController: IGetUserGroupsWithMembersController;
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
  ICreateRecipeController: ICreateRecipeController;
  IUpdateRecipeController: IUpdateRecipeController;
  IDeleteRecipeController: IDeleteRecipeController;
  IListRecipesController: IListRecipesController;
  IGetRecipeController: IGetRecipeController;
  IEditUserController: IEditUserController;

  // Ingredient Categories
  IIngredientCategoriesRepository: IIngredientCategoriesRepository;
  ICreateCategoryUseCase: ICreateCategoryUseCase;
  IListCategoriesUseCase: IListCategoriesUseCase;
  ICreateCategoryController: ICreateCategoryController;
  IListCategoriesController: IListCategoriesController;

  // Units
  IUnitsRepository: IUnitsRepository;
  IListUnitsUseCase: IListUnitsUseCase;
  IListUnitsController: IListUnitsController;

  // Grocery Lists
  IGroceryListsRepository: IGroceryListsRepository;
  IGroceryListItemsRepository: IGroceryListItemsRepository;
  ICreateGroceryListUseCase: ICreateGroceryListUseCase;
  IListGroceryListsUseCase: IListGroceryListsUseCase;
  IGetGroceryListUseCase: IGetGroceryListUseCase;
  IUpdateGroceryListUseCase: IUpdateGroceryListUseCase;
  IAddGroceryListItemsUseCase: IAddGroceryListItemsUseCase;
  IUpdateGroceryListItemUseCase: IUpdateGroceryListItemUseCase;
  IDeleteGroceryListItemUseCase: IDeleteGroceryListItemUseCase;
  IMarkAllItemsBoughtUseCase: IMarkAllItemsBoughtUseCase;
  ICreateGroceryListController: ICreateGroceryListController;
  IListGroceryListsController: IListGroceryListsController;
  IGetGroceryListController: IGetGroceryListController;
  IUpdateGroceryListController: IUpdateGroceryListController;
  IAddGroceryListItemsController: IAddGroceryListItemsController;
  IUpdateGroceryListItemController: IUpdateGroceryListItemController;
  IDeleteGroceryListItemController: IDeleteGroceryListItemController;
  IMarkAllItemsBoughtController: IMarkAllItemsBoughtController;

  // Meals
  IMealsRepository: IMealsRepository;
  ICreateMealUseCase: ICreateMealUseCase;
  IListMealsUseCase: IListMealsUseCase;
  ICreateMealController: ICreateMealController;
  IListMealsController: IListMealsController;

  // Meal Plans
  IMealPlansRepository: IMealPlansRepository;
  ICreateMealPlanUseCase: ICreateMealPlanUseCase;
  IListMealPlansUseCase: IListMealPlansUseCase;
  ICreateMealPlanController: ICreateMealPlanController;
  IListMealPlansController: IListMealPlansController;
}
