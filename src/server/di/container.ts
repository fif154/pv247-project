import { createContainer } from '@evyweb/ioctopus';

import { createAuthenticationModule } from './modules/authentication.module';
import { createTransactionManagerModule } from './modules/database.module';
import { createGroupMembersModule } from './modules/groupMembers.module';
import { createGroupsModule } from './modules/groups.module';
import { createGroceryListsModule } from './modules/grocery-lists.module';
import { createIngredientCategoriesModule } from './modules/ingredient-categories.module';
import { createIngredientsModule } from './modules/ingredients.module';
import { createMealPlansModule } from './modules/meal-plans.module';
import { createMealsModule } from './modules/meals.module';
import { createRecipesModule } from './modules/recipes.module';
import { createUnitsModule } from './modules/units.module';
import { createUsersModule } from './modules/users.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

const ApplicationContainer = createContainer();

ApplicationContainer.load(
  Symbol('TransactionManagerModule'),
  createTransactionManagerModule()
);

ApplicationContainer.load(
  Symbol('AuthenticationModule'),
  createAuthenticationModule()
);
ApplicationContainer.load(Symbol('GroupsModule'), createGroupsModule());
ApplicationContainer.load(
  Symbol('GroupMembersModule'),
  createGroupMembersModule()
);
ApplicationContainer.load(Symbol('UsersModule'), createUsersModule());

ApplicationContainer.load(
  Symbol('IngredientsModule'),
  createIngredientsModule()
);

ApplicationContainer.load(Symbol('RecipesModule'), createRecipesModule());

ApplicationContainer.load(
  Symbol('IngredientCategoriesModule'),
  createIngredientCategoriesModule()
);

ApplicationContainer.load(Symbol('UnitsModule'), createUnitsModule());

ApplicationContainer.load(
  Symbol('GroceryListsModule'),
  createGroceryListsModule()
);

ApplicationContainer.load(Symbol('MealsModule'), createMealsModule());

ApplicationContainer.load(Symbol('MealPlansModule'), createMealPlansModule());

export function getInjection<
  K extends keyof typeof DI_SYMBOLS & keyof DI_RETURN_TYPES,
>(symbol: K): DI_RETURN_TYPES[K] {
  try {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
  } catch (error) {
    console.error('Error getting injection:', error);
    throw error;
  }
}
