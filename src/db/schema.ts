import { AdapterAccountType } from '@auth/core/adapters';
import { relations, sql } from 'drizzle-orm';
import {
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core';

const baseSchema = {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  deletedAt: text('deleted_at'),
};

export const users = sqliteTable('user', {
  ...baseSchema,
  name: text('name'),
  email: text('email').unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  passwordHash: text('password'),
  // Current group context
  groupId: text('group_id'),
  protein: real('protein'),
  carbs: real('carbs'),
  fats: real('fats'),
  calories: real('calories'),
});

export const accounts = sqliteTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = sqliteTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: integer('credentialBackedUp', {
      mode: 'boolean',
    }).notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const groups = sqliteTable('groups', {
  ...baseSchema,
  name: text('name').notNull(),
  description: text('description'),
  createdBy: text('created_by').references(() => users.id, {
    onDelete: 'set null',
  }),
});

export const groupMembers = sqliteTable(
  'group_members',
  {
    ...baseSchema,
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    groupId: text('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    groupUserUnique: uniqueIndex('group_user_unique').on(
      table.groupId,
      table.userId
    ),
  })
);

export const recipes = sqliteTable('recipes', {
  ...baseSchema,
  name: text('name').notNull(),
  description: text('description'),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  servings: integer('servings').notNull().default(1),
  image: text('image'),
  groupId: text('group_id')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
});

export const ingredientCategories = sqliteTable(
  'ingredient_categories',
  {
    ...baseSchema,
    name: text('name').notNull(),
    description: text('description'),
    createdBy: text('created_by')
      .notNull()
      .references(() => users.id, { onDelete: 'set null' }),
  },
  (table) => ({
    ingredientCategoriesNameUnique: uniqueIndex(
      'ingredient_categories_name_unique'
    ).on(table.name),
  })
);

export const ingredients = sqliteTable(
  'ingredients',
  {
    ...baseSchema,
    name: text('name').notNull(),
    description: text('description'),
    createdBy: text('created_by').references(() => users.id, {
      onDelete: 'set null',
    }),
    categoryId: text('category_id').references(() => ingredientCategories.id, {
      onDelete: 'set null',
    }),
    imageUrl: text('image_url'),
    protein: real('protein'),
    carbs: real('carbs'),
    fats: real('fats'),
    calories: real('calories'),
    // allow specifying macros per custom amount of grams
    baseMacroQuantity: real('base_macro_quantity').notNull().default(100),
    groupId: text('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    ingredientsNameUnique: uniqueIndex('ingredients_name_unique').on(
      table.name,
      table.groupId
    ),
  })
);

export const units = sqliteTable(
  'units',
  {
    ...baseSchema,
    name: text('name').notNull(),
    description: text('description'),
    gramsPerUnit: real('grams_per_unit').notNull(),
  },
  (table) => ({
    unitsNameUnique: uniqueIndex('units_name_unique').on(table.name),
  })
);

export const recipeIngredients = sqliteTable(
  'recipe_ingredients',
  {
    ...baseSchema,
    recipeId: text('recipe_id')
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
    ingredientId: text('ingredient_id')
      .notNull()
      .references(() => ingredients.id, { onDelete: 'cascade' }),
    quantity: real('quantity').notNull(),
    unitId: text('unit_id')
      .references(() => units.id, {
        onDelete: 'set null',
      })
      .notNull(),
  },
  (table) => ({
    recipeIngredientsUnique: uniqueIndex('recipe_ingredients_unique').on(
      table.recipeId,
      table.ingredientId
    ),
  })
);

export const groceryLists = sqliteTable('grocery_lists', {
  ...baseSchema,
  groupId: text('group_id')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  fromDate: integer('from_date', { mode: 'timestamp_ms' }),
  toDate: integer('to_date', { mode: 'timestamp_ms' }),
});

export const groceryListItems = sqliteTable(
  'grocery_list_items',
  {
    ...baseSchema,
    groceryListId: text('grocery_list_id')
      .notNull()
      .references(() => groceryLists.id, { onDelete: 'cascade' }),
    ingredientId: text('ingredient_id')
      .notNull()
      .references(() => ingredients.id, { onDelete: 'restrict' }),
    quantity: real('quantity').notNull(),
    unitId: text('unit_id').references(() => units.id, {
      onDelete: 'set null',
    }),
    isBought: integer('is_bought', { mode: 'boolean' })
      .notNull()
      .default(false),
  },
  (table) => ({
    groceryListItemsIngredientUnique: uniqueIndex(
      'grocery_list_items_ingredient_unique'
    ).on(table.groceryListId, table.ingredientId, table.unitId),
  })
);

export const mealTypes = sqliteTable(
  'meal_types',
  {
    ...baseSchema,
    name: text('name').notNull(),
    description: text('description'),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (table) => ({
    mealTypeNameUnique: uniqueIndex('meal_type_name_unique').on(table.name),
  })
);

export const recipeToMealTypes = sqliteTable(
  'recipe_to_meal_types',
  {
    ...baseSchema,
    recipeId: text('recipe_id')
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
    mealTypeId: text('meal_type_id')
      .notNull()
      .references(() => mealTypes.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    recipeMealTypeUnique: uniqueIndex('recipe_meal_type_unique').on(
      table.recipeId,
      table.mealTypeId
    ),
  })
);

export const meals = sqliteTable('meals', {
  ...baseSchema,
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  recipeId: text('recipe_id')
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  mealTypeId: text('meal_type_id')
    .notNull()
    .references(() => mealTypes.id, { onDelete: 'restrict' }),
  plannedDate: integer('planned_date', { mode: 'timestamp_ms' }),
  notes: text('notes'),
  image: text('image'),
  groupId: text('group_id')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
});

export const mealAdditionalIngredients = sqliteTable(
  'meal_additional_ingredients',
  {
    ...baseSchema,
    mealId: text('meal_id')
      .notNull()
      .references(() => meals.id, { onDelete: 'cascade' }),
    ingredientId: text('ingredient_id')
      .notNull()
      .references(() => ingredients.id, { onDelete: 'restrict' }), // Use restrict to prevent deleting an ingredient that's part of a meal log
    quantity: real('quantity').notNull(),
    unitId: text('unit_id').references(() => units.id, {
      onDelete: 'set null',
    }),
  },
  (table) => ({
    mealIngredientUnique: uniqueIndex('meal_ingredient_unique').on(
      table.mealId,
      table.ingredientId
    ),
  })
);

export const mealPlans = sqliteTable('meal_plans', {
  ...baseSchema,
  name: text('name').notNull(),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  startDate: integer('start_date', { mode: 'timestamp_ms' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp_ms' }).notNull(),
  description: text('description'),
  image: text('image'),
  groupId: text('group_id')
    .notNull()
    .references(() => groups.id, { onDelete: 'cascade' }),
  isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(false),
});

export const mealPlanMeals = sqliteTable(
  'meal_plan_meals',
  {
    ...baseSchema,
    mealPlanId: text('meal_plan_id')
      .notNull()
      .references(() => mealPlans.id, { onDelete: 'cascade' }),
    mealId: text('meal_id')
      .notNull()
      .references(() => meals.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    mealPlanMealUnique: uniqueIndex('meal_plan_meal_unique').on(
      table.mealPlanId,
      table.mealId
    ),
  })
);

export const mealsPlansRelations = relations(mealPlans, ({ one, many }) => ({
  group: one(groups, {
    fields: [mealPlans.groupId],
    references: [groups.id],
  }),
  creator: one(users, {
    fields: [mealPlans.createdBy],
    references: [users.id],
  }),
  meals: many(mealPlanMeals),
}));

export const mealPlanMealsRelations = relations(mealPlanMeals, ({ one }) => ({
  mealPlan: one(mealPlans, {
    fields: [mealPlanMeals.mealPlanId],
    references: [mealPlans.id],
  }),
  meal: one(meals, {
    fields: [mealPlanMeals.mealId],
    references: [meals.id],
  }),
}));

export const ingredientCategoriesRelations = relations(
  ingredientCategories,
  ({ many }) => ({
    ingredients: many(ingredients),
  })
);

export const mealTypesRelations = relations(mealTypes, ({ many }) => ({
  recipeToMealTypes: many(recipeToMealTypes),
}));

export const recipeToMealTypesRelations = relations(
  recipeToMealTypes,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeToMealTypes.recipeId],
      references: [recipes.id],
    }),
    mealType: one(mealTypes, {
      fields: [recipeToMealTypes.mealTypeId],
      references: [mealTypes.id],
    }),
  })
);

export const mealsRelations = relations(meals, ({ one, many }) => ({
  user: one(users, {
    fields: [meals.userId],
    references: [users.id],
    relationName: 'mealsPlannedBy',
  }),
  recipe: one(recipes, {
    fields: [meals.recipeId],
    references: [recipes.id],
  }),
  mealType: one(mealTypes, {
    fields: [meals.mealTypeId],
    references: [mealTypes.id],
  }),
  additionalIngredients: many(mealAdditionalIngredients),
}));

export const mealAdditionalIngredientsRelations = relations(
  mealAdditionalIngredients,
  ({ one }) => ({
    meal: one(meals, {
      fields: [mealAdditionalIngredients.mealId],
      references: [meals.id],
    }),
    ingredient: one(ingredients, {
      fields: [mealAdditionalIngredients.ingredientId],
      references: [ingredients.id],
    }),
    unit: one(units, {
      fields: [mealAdditionalIngredients.unitId],
      references: [units.id],
    }),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  authenticators: many(authenticators),
  groupMemberships: many(groupMembers),
  recipesCreated: many(recipes, { relationName: 'recipesCreatedBy' }),
  ingredientsCreated: many(ingredients, {
    relationName: 'ingredientsCreatedBy',
  }),
  groceryListsCreated: many(groceryLists, {
    relationName: 'groceryListsCreatedBy',
  }),
  mealsPlanned: many(meals, { relationName: 'mealsPlannedBy' }), // New
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  members: many(groupMembers),
  groceryLists: many(groceryLists),
}));

export const groupMembersRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupMembers.userId],
    references: [users.id],
  }),
}));

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  creator: one(users, {
    fields: [recipes.createdBy],
    references: [users.id],
    relationName: 'recipesCreatedBy',
  }),
  ingredients: many(recipeIngredients),
  usedInGroceryLists: many(groceryLists),
  recipeToMealTypes: many(recipeToMealTypes), // New: for many-to-many with mealTypes
  meals: many(meals), // New: for meals based on this recipe
}));

export const ingredientsRelations = relations(ingredients, ({ one, many }) => ({
  creator: one(users, {
    fields: [ingredients.createdBy],
    references: [users.id],
    relationName: 'ingredientsCreatedBy',
  }),
  category: one(ingredientCategories, {
    fields: [ingredients.categoryId],
    references: [ingredientCategories.id],
  }),
  usedInRecipes: many(recipeIngredients),
  usedInGroceryListItems: many(groceryListItems),
  usedInMealAdditionalIngredients: many(mealAdditionalIngredients),
}));

export const unitsRelations = relations(units, ({ many }) => ({
  recipeIngredients: many(recipeIngredients),
  groceryListItems: many(groceryListItems),
  mealAdditionalIngredients: many(mealAdditionalIngredients), // New
}));

export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id],
    }),
    ingredient: one(ingredients, {
      fields: [recipeIngredients.ingredientId],
      references: [ingredients.id],
    }),
    unit: one(units, {
      fields: [recipeIngredients.unitId],
      references: [units.id],
    }),
  })
);

export const groceryListsRelations = relations(
  groceryLists,
  ({ one, many }) => ({
    group: one(groups, {
      fields: [groceryLists.groupId],
      references: [groups.id],
    }),
    creator: one(users, {
      fields: [groceryLists.createdBy],
      references: [users.id],
      relationName: 'groceryListsCreatedBy',
    }),
    items: many(groceryListItems),
  })
);

export const groceryListItemsRelations = relations(
  groceryListItems,
  ({ one }) => ({
    groceryList: one(groceryLists, {
      fields: [groceryListItems.groceryListId],
      references: [groceryLists.id],
    }),
    ingredient: one(ingredients, {
      fields: [groceryListItems.ingredientId],
      references: [ingredients.id],
    }),
    unit: one(units, {
      fields: [groceryListItems.unitId],
      references: [units.id],
    }),
  })
);

export type Group = typeof groups.$inferSelect;
export type User = typeof users.$inferInsert;
