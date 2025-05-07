import { createContainer } from "@evyweb/ioctopus";

import { createAuthenticationModule } from "./modules/authentication.module";
import { createTransactionManagerModule } from "./modules/database.module";
import { createIngredientsModule } from "./modules/ingredients.module";
import { createRecipesModule } from "./modules/recipes.module";
import { createUsersModule } from "./modules/users.module";
import { DI_RETURN_TYPES, DI_SYMBOLS } from "./types";

const ApplicationContainer = createContainer();

ApplicationContainer.load(
    Symbol("TransactionManagerModule"),
    createTransactionManagerModule()
);
ApplicationContainer.load(
    Symbol("AuthenticationModule"),
    createAuthenticationModule()
);
ApplicationContainer.load(Symbol("UsersModule"), createUsersModule());

ApplicationContainer.load(
    Symbol("IngredientsModule"),
    createIngredientsModule()
);

ApplicationContainer.load(Symbol("RecipesModule"), createRecipesModule());

export function getInjection<
    K extends keyof typeof DI_SYMBOLS & keyof DI_RETURN_TYPES
>(symbol: K): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}
