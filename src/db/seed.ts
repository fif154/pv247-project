/* eslint-disable @typescript-eslint/no-explicit-any */

// seed.ts – complete database seeder aligned with ./schema
// Uses @faker-js/faker v9.7.0 (no deprecated `unique` helper)
// -----------------------------------------------------------
import { AdapterAccountType } from '@auth/core/adapters';
import { faker } from '@faker-js/faker';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// ---------------------------
// Configuration & Constants
// ---------------------------

const NUM_USERS = 20;
const NUM_GROUPS = 5;
const NUM_RECIPES_PER_USER = 3;
const NUM_INGREDIENT_CATEGORIES = 10;
const NUM_INGREDIENTS = 50;
const MAX_INGREDIENTS_PER_RECIPE = 8;
const MAX_MEMBERS_PER_GROUP = 6;
const MAX_ITEMS_PER_GROCERY_LIST = 15;
const MAX_GROCERY_LISTS_PER_GROUP = 3;
const MAX_MEALS_PER_USER = 10;
const MAX_ADDITIONAL_INGREDIENTS_PER_MEAL = 3;
const NUM_MEAL_PLANS_PER_GROUP = 3;
const MAX_MEALS_PER_MEAL_PLAN = 7;

// ---------------------------
// DB connection
// ---------------------------
const sqlite = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.AUTH_TOKEN!,
});

const db = drizzle(sqlite, { schema });

// ---------------------------
// Utilities
// ---------------------------
const randBool = (probability = 0.5) => faker.datatype.boolean(probability);

/**
 * Inserts a record and returns the inserted row (via RETURNING)
 */
async function insertOne<T extends keyof typeof schema>(
  table: (typeof schema)[T],
  row: any
) {
  // @ts-expect-error: Type 'typeof schema[T]' is not assignable to type 'typeof schema[T]'.
  const [inserted] = await db.insert(table).values(row).returning();
  return inserted as typeof row;
}

/**
 * Bulk-delete all rows in reverse dependency order so that FK constraints are respected.
 */
async function clearExistingData() {
  await db.delete(schema.mealPlanMeals).execute();
  await db.delete(schema.mealPlans).execute();
  await db.delete(schema.mealAdditionalIngredients).execute();
  await db.delete(schema.meals).execute();
  await db.delete(schema.recipeToMealTypes).execute();
  await db.delete(schema.mealTypes).execute();
  await db.delete(schema.groceryListItems).execute();
  await db.delete(schema.groceryLists).execute();
  await db.delete(schema.recipeIngredients).execute();
  await db.delete(schema.ingredients).execute();
  await db.delete(schema.ingredientCategories).execute();
  await db.delete(schema.units).execute();
  await db.delete(schema.recipes).execute();
  await db.delete(schema.groupMembers).execute();
  await db.delete(schema.groups).execute();
  await db.delete(schema.authenticators).execute();
  await db.delete(schema.verificationTokens).execute();
  await db.delete(schema.sessions).execute();
  await db.delete(schema.accounts).execute();
  await db.delete(schema.users).execute();
}

// ---------------------------
// Main seeding routine
// ---------------------------
async function main() {
  console.log('Clearing old data …');
  await clearExistingData();
  console.log('Seeding fresh data …');

  // ---------- 6. Groups ----------
  const groups = [] as Array<typeof schema.groups.$inferSelect>;
  const usedGroupNames = new Set<string>();
  for (let i = 0; i < NUM_GROUPS; i++) {
    let name = `${faker.commerce.department()} Team`;
    while (usedGroupNames.has(name)) {
      name = `${faker.commerce.department()} ${faker.word.adjective()} Team`;
    }
    usedGroupNames.add(name);
    groups.push(
      await insertOne(schema.groups, {
        id: crypto.randomUUID(),
        name,
        description: faker.lorem.sentence(),
      })
    );
  }
  console.log(`✓ Groups: ${groups.length}`);

  // ---------- 1. Users ----------
  const users = [] as Array<typeof schema.users.$inferSelect>;
  for (let i = 0; i < NUM_USERS; i++) {
    const row = {
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      emailVerified: randBool(0.4) ? new Date() : null,
      image: faker.image.avatar(),
      passwordHash: faker.internet.password(),
      groupId: faker.helpers.arrayElement(groups).id,
    };
    users.push(await insertOne(schema.users, row));
  }
  console.log(`✓ Users: ${users.length}`);

  // ---------- 2. Accounts ----------
  const accounts: any[] = [];
  for (const user of users) {
    if (randBool(0.7)) {
      const accountRow = {
        userId: user.id,
        type: faker.helpers.arrayElement<AdapterAccountType>([
          'oauth',
          'oidc',
          'email',
        ]),
        provider: faker.company.name().replace(/\s+/g, '-').toLowerCase(),
        providerAccountId: faker.string.uuid(),
        refresh_token: faker.string.alphanumeric(30),
        access_token: faker.string.alphanumeric(30),
        expires_at: Math.floor(faker.date.future().getTime() / 1000),
        token_type: faker.helpers.arrayElement(['bearer', 'mac']),
        scope: 'read write profile email',
        id_token: faker.string.alphanumeric(50),
        session_state: faker.string.alphanumeric(20),
      };
      accounts.push(await insertOne(schema.accounts, accountRow));
    }
  }
  console.log(`✓ Accounts: ${accounts.length}`);

  // ---------- 3. Sessions ----------
  const sessions: any[] = [];
  for (const user of users) {
    if (randBool(0.5)) {
      const sessRow = {
        sessionToken: faker.string.uuid(),
        userId: user.id,
        expires: faker.date.future({ years: 1 }),
      };
      sessions.push(await insertOne(schema.sessions, sessRow));
    }
  }
  console.log(`✓ Sessions: ${sessions.length}`);

  // ---------- 4. Verification Tokens ----------
  const verificationTokens: any[] = [];
  for (let i = 0; i < NUM_USERS / 2; i++) {
    const vtRow = {
      identifier: faker.internet.email().toLowerCase(),
      token: faker.string.uuid(),
      expires: faker.date.future({ years: 1 }),
    };
    verificationTokens.push(await insertOne(schema.verificationTokens, vtRow));
  }
  console.log(`✓ VerificationTokens: ${verificationTokens.length}`);

  // ---------- 5. Authenticators ----------
  const authenticators: any[] = [];
  for (const user of users) {
    if (randBool(0.2)) {
      const authRow = {
        credentialID: faker.string.uuid(),
        userId: user.id,
        providerAccountId: faker.string.uuid(),
        credentialPublicKey: faker.string.hexadecimal({ length: 128 }),
        counter: faker.number.int({ min: 0, max: 100 }),
        credentialDeviceType: faker.helpers.arrayElement([
          'platform',
          'cross-platform',
        ]),
        credentialBackedUp: randBool(),
        transports: faker.helpers.arrayElement([
          'usb',
          'nfc',
          'ble',
          'internal',
          null,
        ]),
      };
      authenticators.push(await insertOne(schema.authenticators, authRow));
    }
  }
  console.log(`✓ Authenticators: ${authenticators.length}`);

  // ---------- 7. Group Members ----------
  const groupMembers: any[] = [];
  for (const group of groups) {
    const shuffled = faker.helpers.shuffle(users);
    const count = faker.number.int({
      min: 1,
      max: Math.min(MAX_MEMBERS_PER_GROUP, users.length),
    });
    for (let i = 0; i < count; i++) {
      const member = {
        id: crypto.randomUUID(),
        userId: shuffled[i].id,
        groupId: group.id,
      };
      try {
        groupMembers.push(await insertOne(schema.groupMembers, member));
      } catch (e: any) {
        if (e.message?.toLowerCase().includes('unique')) continue; // skip duplicates
        throw e;
      }
    }
  }
  console.log(`✓ GroupMembers: ${groupMembers.length}`);

  // ---------- 8. Ingredient Categories ----------
  const ingredientCategories = [] as Array<
    typeof schema.ingredientCategories.$inferSelect
  >;
  const catNames = new Set<string>();
  for (let i = 0; i < NUM_INGREDIENT_CATEGORIES; i++) {
    let name = faker.commerce.department();
    while (catNames.has(name)) {
      name = `${faker.commerce.department()} ${faker.word.adjective()}`;
    }
    catNames.add(name);
    ingredientCategories.push(
      await insertOne(schema.ingredientCategories, {
        id: crypto.randomUUID(),
        name,
        description: faker.lorem.sentence(),
        createdBy: faker.helpers.arrayElement(users).id,
      })
    );
  }
  console.log(`✓ IngredientCategories: ${ingredientCategories.length}`);

  // ---------- 9. Units ----------
  const UNIT_PRESETS: Array<{
    name: string;
    description: string;
    grams: number;
  }> = [
    { name: 'gram', description: 'Metric gram', grams: 1 },
    { name: 'kilogram', description: 'Metric kilogram', grams: 1000 },
    { name: 'millilitre', description: 'Metric millilitre', grams: 1 },
    { name: 'litre', description: 'Metric litre', grams: 1000 },
    { name: 'piece', description: 'Piece / unit', grams: 50 },
    { name: 'cup', description: 'US cup', grams: 240 },
    { name: 'tablespoon', description: 'Tablespoon', grams: 15 },
    { name: 'teaspoon', description: 'Teaspoon', grams: 5 },
  ];
  const units = [] as Array<typeof schema.units.$inferSelect>;
  for (const u of UNIT_PRESETS) {
    units.push(
      await insertOne(schema.units, {
        id: crypto.randomUUID(),
        name: u.name,
        description: u.description,
        gramsPerUnit: u.grams,
      })
    );
  }
  console.log(`✓ Units: ${units.length}`);

  // ---------- 10. Ingredients ----------
  const ingredients = [] as Array<typeof schema.ingredients.$inferSelect>;
  const ingNames = new Set<string>();
  for (let i = 0; i < NUM_INGREDIENTS; i++) {
    let name = faker.commerce.productMaterial();
    while (ingNames.has(name)) {
      name = `${faker.commerce.productMaterial()} ${faker.word.adjective()}`;
    }
    ingNames.add(name);
    ingredients.push(
      await insertOne(schema.ingredients, {
        id: crypto.randomUUID(),
        name,
        description: faker.lorem.sentence(),
        createdBy: randBool(0.8) ? faker.helpers.arrayElement(users).id : null,
        categoryId: randBool(0.7)
          ? faker.helpers.arrayElement(ingredientCategories).id
          : null,
        imageUrl: faker.image.urlLoremFlickr({ category: 'food' }),
        protein: faker.number.int({ min: 0, max: 80 }),
        carbs: faker.number.int({ min: 0, max: 80 }),
        fats: faker.number.int({ min: 0, max: 50 }),
        calories: faker.number.float({ min: 10, max: 500 }),
      })
    );
  }
  console.log(`✓ Ingredients: ${ingredients.length}`);

  // ---------- 11. Recipes & RecipeIngredients ----------
  const recipes = [] as Array<typeof schema.recipes.$inferSelect>;
  const recipeIngredients: any[] = [];

  for (const user of users) {
    const numRecipes = faker.number.int({ min: 1, max: NUM_RECIPES_PER_USER });
    for (let i = 0; i < numRecipes; i++) {
      const recipe = await insertOne(schema.recipes, {
        id: crypto.randomUUID(),
        name: `${faker.commerce.productName()} Delight`,
        description: faker.lorem.paragraphs(2, '\n\n'),
        createdBy: user.id,
        servings: faker.number.int({ min: 1, max: 12 }),
        image: randBool(0.3)
          ? faker.image.urlLoremFlickr({ category: 'food' })
          : null,
      });
      recipes.push(recipe);

      const numIng = faker.number.int({
        min: 2,
        max: Math.min(MAX_INGREDIENTS_PER_RECIPE, ingredients.length),
      });
      const shuffledIng = faker.helpers.shuffle(ingredients);
      for (let j = 0; j < numIng; j++) {
        const ri = {
          id: crypto.randomUUID(),
          recipeId: recipe.id,
          ingredientId: shuffledIng[j].id,
          quantity: faker.number.float({ min: 0.1, max: 5, fractionDigits: 2 }),
          unitId: faker.helpers.arrayElement(units).id,
        };
        try {
          recipeIngredients.push(await insertOne(schema.recipeIngredients, ri));
        } catch (e: any) {
          if (e.message?.toLowerCase().includes('unique')) continue;
          throw e;
        }
      }
    }
  }
  console.log(`✓ Recipes: ${recipes.length}`);
  console.log(`✓ RecipeIngredients: ${recipeIngredients.length}`);

  // ---------- 12. MealTypes ----------
  const MEAL_TYPE_NAMES = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Dinner',
    'Snack',
    'Dessert',
    'Appetizer',
    'Side Dish',
    'Main Course',
    'Beverage',
  ];
  const mealTypes = [] as Array<typeof schema.mealTypes.$inferSelect>;
  for (const n of MEAL_TYPE_NAMES) {
    mealTypes.push(
      await insertOne(schema.mealTypes, {
        id: crypto.randomUUID(),
        name: n,
        description: faker.lorem.sentence(),
      })
    );
  }
  console.log(`✓ MealTypes: ${mealTypes.length}`);

  // ---------- 13. Recipe ↔ MealType links ----------
  const recipeToMealTypes: any[] = [];
  for (const recipe of recipes) {
    const numLinks = faker.number.int({
      min: 1,
      max: Math.min(3, mealTypes.length),
    });
    const shuffledMealTypes = faker.helpers.shuffle(mealTypes);
    for (let i = 0; i < numLinks; i++) {
      try {
        recipeToMealTypes.push(
          await insertOne(schema.recipeToMealTypes, {
            id: crypto.randomUUID(),
            recipeId: recipe.id,
            mealTypeId: shuffledMealTypes[i].id,
          })
        );
      } catch (e: any) {
        if (e.message?.toLowerCase().includes('unique')) continue;
        throw e;
      }
    }
  }
  console.log(`✓ RecipeToMealTypes: ${recipeToMealTypes.length}`);

  // ---------- 14. Meals & Additional Ingredients ----------
  const meals = [] as Array<typeof schema.meals.$inferSelect>;
  const mealAdditionalIngredients: any[] = [];

  for (const user of users) {
    const numMeals = faker.number.int({
      min: 0,
      max: Math.min(MAX_MEALS_PER_USER, recipes.length),
    });
    const shuffledRecipes = faker.helpers.shuffle(recipes);
    for (let i = 0; i < numMeals; i++) {
      const baseRecipe = shuffledRecipes[i];
      if (!baseRecipe) continue;
      const links = recipeToMealTypes.filter(
        (l) => l.recipeId === baseRecipe.id
      );
      const mealTypeId = links.length
        ? faker.helpers.arrayElement(links).mealTypeId
        : faker.helpers.arrayElement(mealTypes).id;
      const meal = await insertOne(schema.meals, {
        id: crypto.randomUUID(),
        name: `${faker.word.adjective()} ${baseRecipe.name}`,
        userId: user.id,
        recipeId: baseRecipe.id,
        mealTypeId,
        plannedDate: randBool(0.7) ? faker.date.soon({ days: 30 }) : null,
        notes: randBool(0.4) ? faker.lorem.sentences(1) : null,
        image: randBool(0.2)
          ? faker.image.urlLoremFlickr({ category: 'food' })
          : null,
      });
      meals.push(meal);

      if (randBool(0.25)) {
        const numAdd = faker.number.int({
          min: 1,
          max: MAX_ADDITIONAL_INGREDIENTS_PER_MEAL,
        });
        const recipeIngIds = new Set(
          recipeIngredients
            .filter((ri) => ri.recipeId === baseRecipe.id)
            .map((ri) => ri.ingredientId)
        );
        const potentialAdds = ingredients.filter(
          (ing) => !recipeIngIds.has(ing.id)
        );
        const shuffledAdds = faker.helpers.shuffle(potentialAdds);
        for (let k = 0; k < Math.min(numAdd, shuffledAdds.length); k++) {
          try {
            mealAdditionalIngredients.push(
              await insertOne(schema.mealAdditionalIngredients, {
                id: crypto.randomUUID(),
                mealId: meal.id,
                ingredientId: shuffledAdds[k].id,
                quantity: faker.number.float({
                  min: 0.25,
                  max: 3,
                  fractionDigits: 2,
                }),
                unitId: faker.helpers.arrayElement(units).id,
              })
            );
          } catch (e: any) {
            if (e.message?.toLowerCase().includes('unique')) continue;
            throw e;
          }
        }
      }
    }
  }
  console.log(`✓ Meals: ${meals.length}`);
  console.log(
    `✓ MealAdditionalIngredients: ${mealAdditionalIngredients.length}`
  );

  // ---------- 15. GroceryLists & Items ----------
  const groceryLists = [] as Array<typeof schema.groceryLists.$inferSelect>;
  const groceryListItems: any[] = [];

  for (const group of groups) {
    const listCount = faker.number.int({
      min: 0,
      max: MAX_GROCERY_LISTS_PER_GROUP,
    });
    for (let i = 0; i < listCount; i++) {
      const creator = faker.helpers.arrayElement(users);
      const baseRecipe = randBool(0.6)
        ? faker.helpers.arrayElement(recipes)
        : null;
      const list = await insertOne(schema.groceryLists, {
        id: crypto.randomUUID(),
        groupId: group.id,
        name: baseRecipe
          ? `${baseRecipe.name} Shopping`
          : `${faker.commerce.productAdjective()} Groceries for ${group.name}`,
        createdBy: creator.id,
        fromDate: null,
        toDate: null,
      });
      groceryLists.push(list);

      const numItems = faker.number.int({
        min: 1,
        max: Math.min(MAX_ITEMS_PER_GROCERY_LIST, ingredients.length),
      });
      const shuffledIng = faker.helpers.shuffle(ingredients);
      for (let j = 0; j < numItems; j++) {
        try {
          groceryListItems.push(
            await insertOne(schema.groceryListItems, {
              id: crypto.randomUUID(),
              groceryListId: list.id,
              ingredientId: shuffledIng[j].id,
              quantity: faker.number.float({
                min: 1,
                max: 10,
                fractionDigits: 1,
              }),
              unitId: faker.helpers.arrayElement(units).id,
              isBought: randBool(0.3),
            })
          );
        } catch (e: any) {
          if (e.message?.toLowerCase().includes('unique')) continue;
          throw e;
        }
      }
    }
  }
  console.log(`✓ GroceryLists: ${groceryLists.length}`);
  console.log(`✓ GroceryListItems: ${groceryListItems.length}`);

  // ---------- 16. MealPlans & PlanMeals ----------
  const mealPlans = [] as Array<typeof schema.mealPlans.$inferSelect>;
  const mealPlanMeals: any[] = [];
  for (const group of groups) {
    const planCount = faker.number.int({
      min: 0,
      max: NUM_MEAL_PLANS_PER_GROUP,
    });
    for (let i = 0; i < planCount; i++) {
      const creator = faker.helpers.arrayElement(users);
      const startDate = faker.date.future({ years: 1 });
      const endDate = new Date(startDate.getTime());
      endDate.setDate(
        endDate.getDate() + faker.number.int({ min: 1, max: 14 })
      );

      const plan = await insertOne(schema.mealPlans, {
        id: crypto.randomUUID(),
        name: `${faker.word.adjective()} ${faker.word.noun()} Meal Plan`,
        createdBy: creator.id,
        startDate,
        endDate,
        description: faker.lorem.paragraph(),
        image: randBool(0.3)
          ? faker.image.urlLoremFlickr({ category: 'food' })
          : null,
        groupId: group.id,
        isPublic: randBool(0.3),
      });
      mealPlans.push(plan);

      const numMeals = faker.number.int({
        min: 1,
        max: Math.min(MAX_MEALS_PER_MEAL_PLAN, meals.length),
      });
      const shuffledMeals = faker.helpers.shuffle(meals);
      for (let j = 0; j < numMeals; j++) {
        try {
          mealPlanMeals.push(
            await insertOne(schema.mealPlanMeals, {
              id: crypto.randomUUID(),
              mealPlanId: plan.id,
              mealId: shuffledMeals[j].id,
            })
          );
        } catch (e: any) {
          if (e.message?.toLowerCase().includes('unique')) continue;
          throw e;
        }
      }
    }
  }
  console.log(`✓ MealPlans: ${mealPlans.length}`);
  console.log(`✓ MealPlanMeals: ${mealPlanMeals.length}`);

  console.log('🎉  Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(() => sqlite.close());
