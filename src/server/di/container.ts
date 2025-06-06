import { createContainer } from '@evyweb/ioctopus';

import { createAuthenticationModule } from './modules/authentication.module';
import { createTransactionManagerModule } from './modules/database.module';
import { createGroceryListsModule } from './modules/grocery-lists.module';
import { createGroupModule } from './modules/group.module';
import { createGroupMembersModule } from './modules/groupMembers.module';
import { createGroupsModule } from './modules/groups.module';
import { createIngredientCategoriesModule } from './modules/ingredient-categories.module';
import { createIngredientsModule } from './modules/ingredients.module';
import { createMealAdditionalIngredientsModule } from './modules/meal-additional-ingredients.module';
import { createMealPlanMealsModule } from './modules/meal-plan-meals.module';
import { createMealPlansModule } from './modules/meal-plans.module';
import { createMealTypesModule } from './modules/meal-types.module';
import { createMealsModule } from './modules/meals.module';
import { createRecipesModule } from './modules/recipes.module';
import { createUnitsModule } from './modules/units.module';
import { createUsersModule } from './modules/users.module';
import { DI_RETURN_TYPES, DI_SYMBOLS } from './types';

export const ApplicationContainer = createContainer();

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
ApplicationContainer.load(Symbol('GroupModule'), createGroupModule());
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

ApplicationContainer.load(Symbol('MealTypesModule'), createMealTypesModule());

ApplicationContainer.load(
  Symbol('MealPlanMealsModule'),
  createMealPlanMealsModule()
);

ApplicationContainer.load(
  Symbol('MealAdditionalIngredientsModule'),
  createMealAdditionalIngredientsModule()
);

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
