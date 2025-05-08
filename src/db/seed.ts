/* eslint-disable @typescript-eslint/no-explicit-any */
// seed.ts
import { AdapterAccountType } from '@auth/core/adapters'; // Ensure this type is accessible
import { faker } from '@faker-js/faker';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// --- Configuration ---
const NUM_USERS = 20;
const NUM_GROUPS = 5;
const NUM_RECIPES_PER_USER = 3;
const NUM_INGREDIENTS = 50;
const NUM_UNITS = 10;
const MAX_INGREDIENTS_PER_RECIPE = 8;
const MAX_MEMBERS_PER_GROUP = 5;
const MAX_ITEMS_PER_GROCERY_LIST = 15;
const MAX_MEALS_PER_USER = 10;
const MAX_ADDITIONAL_INGREDIENTS_PER_MEAL = 3;

// --- Database Connection ---
// Replace 'your-database.db' with your actual database file
const sqlite = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.AUTH_TOKEN!,
});
const db = drizzle(sqlite, { schema });

console.log('Seeding database...');

async function main() {
  // ---- 0. Optional: Clear Existing Data (in reverse order of creation due to FKs) ----
  // Be very careful with this in a production environment!
  console.log('Clearing existing data (if any)...');
  await db.delete(schema.mealAdditionalIngredients).execute();
  await db.delete(schema.meals).execute();
  await db.delete(schema.recipeToMealTypes).execute();
  await db.delete(schema.mealTypes).execute();
  await db.delete(schema.groceryListItems).execute();
  await db.delete(schema.groceryLists).execute();
  await db.delete(schema.recipeIngredients).execute();
  await db.delete(schema.units).execute();
  await db.delete(schema.ingredients).execute();
  await db.delete(schema.recipes).execute();
  await db.delete(schema.groupMembers).execute();
  await db.delete(schema.groups).execute();
  await db.delete(schema.authenticators).execute();
  await db.delete(schema.verificationTokens).execute();
  await db.delete(schema.sessions).execute();
  await db.delete(schema.accounts).execute();
  await db.delete(schema.users).execute();
  console.log('Data cleared.');

  // ---- 1. Seed Users ----
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const user = {
      id: crypto.randomUUID(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(), // Ensure unique
      emailVerified: faker.datatype.boolean() ? new Date() : null,
      image: faker.image.avatar(),
      passwordHash: faker.internet.password(), // In a real app, hash this!
    };
    const [insertedUser] = await db
      .insert(schema.users)
      .values(user)
      .returning();
    users.push(insertedUser);
  }
  console.log(`Seeded ${users.length} users.`);
  if (!users.length) return; // Stop if no users created

  // ---- 2. Seed Accounts (related to users) ----
  const accounts = [];
  for (const user of users) {
    if (faker.datatype.boolean(0.7)) {
      // 70% chance of having an account
      const accountTypes: AdapterAccountType[] = ['oauth', 'oidc', 'email'];
      const account = {
        userId: user.id,
        type: faker.helpers.arrayElement(accountTypes),
        provider: faker.company.name().replace(/\s+/g, '-').toLowerCase(),
        providerAccountId: faker.string.uuid(),
        refresh_token: faker.string.alphanumeric(30),
        access_token: faker.string.alphanumeric(30),
        expires_at: Math.floor(faker.date.future().getTime() / 1000), // s
        token_type: faker.helpers.arrayElement(['bearer', 'mac']),
        scope: 'read write profile email',
        id_token: faker.string.alphanumeric(50),
        session_state: faker.string.alphanumeric(20),
      };
      const [insertedAccount] = await db
        .insert(schema.accounts)
        .values(account)
        .returning();
      accounts.push(insertedAccount);
    }
  }
  console.log(`Seeded ${accounts.length} accounts.`);

  // ---- 3. Seed Sessions (related to users) ----
  const sessions = [];
  for (const user of users) {
    if (faker.datatype.boolean(0.5)) {
      // 50% chance of having an active session
      const session = {
        sessionToken: faker.string.uuid(),
        userId: user.id,
        expires: faker.date.future({ years: 1 }),
      };
      const [insertedSession] = await db
        .insert(schema.sessions)
        .values(session)
        .returning();
      sessions.push(insertedSession);
    }
  }
  console.log(`Seeded ${sessions.length} sessions.`);

  // ---- 4. Seed Verification Tokens ----
  const verificationTokens = [];
  for (let i = 0; i < NUM_USERS / 2; i++) {
    // Some tokens
    const token = {
      identifier: faker.internet.email().toLowerCase(),
      token: faker.string.uuid(),
      expires: faker.date.future({ years: 1 }),
    };
    const [insertedToken] = await db
      .insert(schema.verificationTokens)
      .values(token)
      .returning();
    verificationTokens.push(insertedToken);
  }
  console.log(`Seeded ${verificationTokens.length} verification tokens.`);

  // ---- 5. Seed Authenticators (related to users) ----
  const authenticators = [];
  for (const user of users) {
    if (faker.datatype.boolean(0.2)) {
      // 20% chance of having an authenticator
      const authenticator = {
        credentialID: faker.string.uuid(),
        userId: user.id,
        providerAccountId: faker.string.uuid(), // Could link to an actual account if needed
        credentialPublicKey: faker.string.hexadecimal({ length: 128 }),
        counter: faker.number.int({ min: 0, max: 100 }),
        credentialDeviceType: faker.helpers.arrayElement([
          'platform',
          'cross-platform',
        ]),
        credentialBackedUp: faker.datatype.boolean(),
        transports: faker.helpers.arrayElement([
          'usb',
          'nfc',
          'ble',
          'internal',
          null,
        ]),
      };
      const [insertedAuth] = await db
        .insert(schema.authenticators)
        .values(authenticator)
        .returning();
      authenticators.push(insertedAuth);
    }
  }
  console.log(`Seeded ${authenticators.length} authenticators.`);

  // ---- 6. Seed Groups ----
  const groups = [];
  for (let i = 0; i < NUM_GROUPS; i++) {
    const group = {
      id: crypto.randomUUID(),
      name: faker.commerce.department() + ' Team',
      description: faker.lorem.sentence(),
    };
    // Handle potential unique name collision for groups if you add unique index later
    const [insertedGroup] = await db
      .insert(schema.groups)
      .values(group)
      .returning();
    groups.push(insertedGroup);
  }
  console.log(`Seeded ${groups.length} groups.`);
  if (!groups.length) {
    console.log('No groups, skipping dependent seeds.');
  }

  // ---- 7. Seed Group Members (joining users and groups) ----
  const groupMembers = [];
  if (groups.length) {
    for (const group of groups) {
      const numMembers = faker.number.int({
        min: 1,
        max: Math.min(MAX_MEMBERS_PER_GROUP, users.length),
      });
      const shuffledUsers = faker.helpers.shuffle(users);
      for (let i = 0; i < numMembers; i++) {
        if (shuffledUsers[i]) {
          const member = {
            id: crypto.randomUUID(),
            userId: shuffledUsers[i].id,
            groupId: group.id,
          };
          try {
            const [insertedMember] = await db
              .insert(schema.groupMembers)
              .values(member)
              .returning();
            groupMembers.push(insertedMember);
          } catch (e: any) {
            // Catch unique constraint violations (group_user_unique)
            if (
              e.message &&
              e.message.toLowerCase().includes('unique constraint failed')
            ) {
              console.warn(
                `Skipping duplicate group member: User ${member.userId} in Group ${member.groupId}`
              );
            } else {
              throw e;
            }
          }
        }
      }
    }
  }
  console.log(`Seeded ${groupMembers.length} group members.`);

  // ---- 8. Seed Ingredients ----
  const ingredients = [];
  const ingredientNames = new Set<string>(); // To help ensure unique names
  for (let i = 0; i < NUM_INGREDIENTS; i++) {
    let name = faker.commerce.productMaterial();
    while (ingredientNames.has(name)) {
      // Simple way to try and get unique names
      name = `${faker.commerce.productMaterial()} ${faker.word.adjective()}`;
    }
    ingredientNames.add(name);

    const createdBy = faker.datatype.boolean(0.8)
      ? faker.helpers.arrayElement(users)?.id
      : null;
    const ingredient = {
      id: crypto.randomUUID(),
      name: name,
      description: faker.lorem.sentence(),
      createdBy: createdBy,
      imageUrl: faker.image.urlLoremFlickr({ category: 'food' }),
      protein: faker.number.float({ min: 0, max: 30, fractionDigits: 1 }),
      carbs: faker.number.float({ min: 0, max: 80, fractionDigits: 1 }),
      fats: faker.number.float({ min: 0, max: 50, fractionDigits: 1 }),
      calories: faker.number.float({
        min: 10,
        max: 500,
        fractionDigits: 0,
      }),
      baseMacroQuantity: faker.helpers.arrayElement([50, 100, 150, 200]),
    };
    const [insertedIngredient] = await db
      .insert(schema.ingredients)
      .values(ingredient)
      .returning();
    ingredients.push(insertedIngredient);
  }
  console.log(`Seeded ${ingredients.length} ingredients.`);
  if (!ingredients.length) {
    console.log('No ingredients, skipping dependent seeds.');
    return;
  }

  // ---- 9. Seed Units ----
  const units = [];
  const unitNames = new Set<string>();
  const commonUnits = [
    'gram',
    'kg',
    'ml',
    'liter',
    'tsp',
    'tbsp',
    'cup',
    'piece',
    'slice',
    'can',
  ];
  for (let i = 0; i < NUM_UNITS; i++) {
    let name =
      i < commonUnits.length
        ? commonUnits[i]
        : faker.science.unit().name.toLowerCase();
    let attempt = 0;
    while (unitNames.has(name) && attempt < 5) {
      name = `${faker.science.unit().name.toLowerCase()}_${attempt++}`;
    }
    if (unitNames.has(name)) continue; // Skip if still not unique
    unitNames.add(name);

    const unit = {
      id: crypto.randomUUID(),
      name: name,
      description: faker.lorem.sentence(),
      gramsPerUnit:
        name === 'gram'
          ? 1
          : name === 'kg'
            ? 1000
            : faker.number.float({
                min: 1,
                max: 500,
                fractionDigits: 1,
              }),
    };
    const [insertedUnit] = await db
      .insert(schema.units)
      .values(unit)
      .returning();
    units.push(insertedUnit);
  }
  console.log(`Seeded ${units.length} units.`);
  if (!units.length) {
    console.log('No units, recipe/grocery items might not have units.');
  }

  // ---- 10. Seed Recipes & Recipe Ingredients ----
  const recipes = [];
  const recipeIngredients = [];
  for (const user of users) {
    for (
      let i = 0;
      i < faker.number.int({ min: 1, max: NUM_RECIPES_PER_USER });
      i++
    ) {
      const recipe = {
        id: crypto.randomUUID(),
        name: faker.commerce.productName() + ' Delight',
        description: faker.lorem.paragraphs(2),
        createdBy: user.id,
        servings: faker.number.int({ min: 1, max: 12 }),
      };
      const [insertedRecipe] = await db
        .insert(schema.recipes)
        .values(recipe)
        .returning();
      recipes.push(insertedRecipe);

      // Add ingredients to this recipe
      const numRecipeIngredients = faker.number.int({
        min: 2,
        max: Math.min(MAX_INGREDIENTS_PER_RECIPE, ingredients.length),
      });
      const shuffledIngredients = faker.helpers.shuffle(ingredients);
      for (let j = 0; j < numRecipeIngredients; j++) {
        if (shuffledIngredients[j]) {
          const unitId =
            units.length > 0 && faker.datatype.boolean(0.9)
              ? faker.helpers.arrayElement(units).id
              : null;
          const recipeIngredient = {
            id: crypto.randomUUID(),
            recipeId: insertedRecipe.id,
            ingredientId: shuffledIngredients[j].id,
            quantity: faker.number.float({
              min: 0.1,
              max: 5,
              fractionDigits: 2,
            }),
            unitId: unitId,
          };
          try {
            const [insertedRI] = await db
              .insert(schema.recipeIngredients)
              .values(recipeIngredient)
              .returning();
            recipeIngredients.push(insertedRI);
          } catch (e: any) {
            if (
              e.message &&
              e.message.toLowerCase().includes('unique constraint failed')
            ) {
              console.warn(
                `Skipping duplicate ingredient ${shuffledIngredients[j].id} in recipe ${insertedRecipe.id}`
              );
            } else {
              throw e;
            }
          }
        }
      }
    }
  }
  console.log(
    `Seeded ${recipes.length} recipes and ${recipeIngredients.length} recipe ingredients.`
  );
  if (!recipes.length) {
    console.log('No recipes, skipping dependent seeds.');
  }

  // ---- 11. Seed Meal Types ----
  const mealTypes = [];
  const mealTypeNamesArr = [
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
  const mealTypeNameSet = new Set<string>();
  for (const name of mealTypeNamesArr) {
    if (mealTypeNameSet.has(name)) continue;
    mealTypeNameSet.add(name);
    const mealType = {
      id: crypto.randomUUID(),
      name: name,
      description: faker.lorem.sentence(),
    };
    const [insertedMealType] = await db
      .insert(schema.mealTypes)
      .values(mealType)
      .returning();
    mealTypes.push(insertedMealType);
  }
  console.log(`Seeded ${mealTypes.length} meal types.`);
  if (!mealTypes.length) {
    console.log('No meal types, skipping dependent seeds.');
  }

  // ---- 12. Seed RecipeToMealTypes (Many-to-Many) ----
  const recipeToMealTypes = [];
  if (recipes.length && mealTypes.length) {
    for (const recipe of recipes) {
      const numLinkedMealTypes = faker.number.int({
        min: 1,
        max: Math.min(3, mealTypes.length),
      });
      const shuffledMealTypes = faker.helpers.shuffle(mealTypes);
      for (let i = 0; i < numLinkedMealTypes; i++) {
        if (shuffledMealTypes[i]) {
          const link = {
            id: crypto.randomUUID(),
            recipeId: recipe.id,
            mealTypeId: shuffledMealTypes[i].id,
          };
          try {
            const [insertedLink] = await db
              .insert(schema.recipeToMealTypes)
              .values(link)
              .returning();
            recipeToMealTypes.push(insertedLink);
          } catch (e: any) {
            if (
              e.message &&
              e.message.toLowerCase().includes('unique constraint failed')
            ) {
              console.warn(
                `Skipping duplicate meal type link: Recipe ${recipe.id} to MealType ${shuffledMealTypes[i].id}`
              );
            } else {
              throw e;
            }
          }
        }
      }
    }
  }
  console.log(`Seeded ${recipeToMealTypes.length} recipe-to-mealType links.`);

  // ---- 13. Seed Grocery Lists & Grocery List Items ----
  const groceryLists = [];
  const groceryListItems = [];
  if (groups.length) {
    for (const group of groups) {
      const numLists = faker.number.int({ min: 0, max: 3 });
      for (let i = 0; i < numLists; i++) {
        const creator = faker.helpers.arrayElement(users);
        const baseRecipe =
          recipes.length && faker.datatype.boolean(0.6)
            ? faker.helpers.arrayElement(recipes)
            : null;
        const groceryList = {
          id: crypto.randomUUID(),
          groupId: group.id,
          recipeId: baseRecipe?.id || null,
          name: baseRecipe
            ? `${baseRecipe.name} Shopping`
            : `${faker.commerce.productAdjective()} Groceries for ${
                group.name
              }`,
          description: faker.lorem.sentence(),
          createdBy: creator.id,
        };
        const [insertedList] = await db
          .insert(schema.groceryLists)
          .values(groceryList)
          .returning();
        groceryLists.push(insertedList);

        // Add items to this grocery list
        const numItems = faker.number.int({
          min: 1,
          max: Math.min(MAX_ITEMS_PER_GROCERY_LIST, ingredients.length),
        });
        const shuffledIngredients = faker.helpers.shuffle(ingredients);
        for (let j = 0; j < numItems; j++) {
          if (shuffledIngredients[j]) {
            const unitId =
              units.length > 0 && faker.datatype.boolean(0.8)
                ? faker.helpers.arrayElement(units).id
                : null;
            const item = {
              id: crypto.randomUUID(),
              groceryListId: insertedList.id,
              ingredientId: shuffledIngredients[j].id,
              quantity: faker.number.float({
                min: 1,
                max: 10,
                fractionDigits: 1,
              }),
              unitId: unitId,
              name: shuffledIngredients[j].name, // Often same as ingredient name
              isBought: faker.datatype.boolean(0.3), // 30% chance already bought
            };
            try {
              const [insertedItem] = await db
                .insert(schema.groceryListItems)
                .values(item)
                .returning();
              groceryListItems.push(insertedItem);
            } catch (e: any) {
              if (
                e.message &&
                e.message.toLowerCase().includes('unique constraint failed')
              ) {
                console.warn(
                  `Skipping duplicate ingredient ${shuffledIngredients[j].id} in grocery list ${insertedList.id}`
                );
              } else {
                throw e;
              }
            }
          }
        }
      }
    }
  }
  console.log(
    `Seeded ${groceryLists.length} grocery lists and ${groceryListItems.length} grocery list items.`
  );

  // ---- 14. Seed Meals & Meal Additional Ingredients ----
  const meals = [];
  const mealAdditionalIngredients = [];
  if (recipes.length && mealTypes.length) {
    for (const user of users) {
      const numMeals = faker.number.int({
        min: 0,
        max: Math.min(MAX_MEALS_PER_USER, recipes.length),
      });
      const shuffledRecipes = faker.helpers.shuffle(recipes);

      for (let i = 0; i < numMeals; i++) {
        if (shuffledRecipes[i]) {
          const recipe = shuffledRecipes[i];
          // Find a meal type associated with the recipe, or pick a random one
          const recipeMealTypeLinks = recipeToMealTypes.filter(
            (rtl) => rtl.recipeId === recipe.id
          );
          let mealTypeIdToUse: string;
          if (recipeMealTypeLinks.length > 0) {
            mealTypeIdToUse =
              faker.helpers.arrayElement(recipeMealTypeLinks).mealTypeId;
          } else {
            mealTypeIdToUse = faker.helpers.arrayElement(mealTypes).id;
          }

          const meal = {
            id: crypto.randomUUID(),
            name: `${faker.word.adjective()} ${recipe.name}`,
            userId: user.id,
            recipeId: recipe.id,
            mealTypeId: mealTypeIdToUse,
            plannedDate: faker.datatype.boolean(0.7)
              ? faker.date.soon({ days: 30 })
              : null,
            notes: faker.datatype.boolean(0.4)
              ? faker.lorem.sentences(1)
              : null,
            image: faker.datatype.boolean(0.2)
              ? faker.image.urlLoremFlickr({ category: 'food' })
              : null,
          };
          const [insertedMeal] = await db
            .insert(schema.meals)
            .values(meal)
            .returning();
          meals.push(insertedMeal);

          // Add additional ingredients (not in base recipe)
          if (faker.datatype.boolean(0.25)) {
            // 25% chance of additional ingredients
            const numAdditional = faker.number.int({
              min: 1,
              max: Math.min(
                MAX_ADDITIONAL_INGREDIENTS_PER_MEAL,
                ingredients.length
              ),
            });
            // Filter out ingredients already in the recipe (simplified: just pick random ones not in recipe's direct list)
            const recipeIngredientIds = new Set(
              recipeIngredients
                .filter((ri) => ri.recipeId === recipe.id)
                .map((ri) => ri.ingredientId)
            );
            const availableAdditionalIngredients = ingredients.filter(
              (ing) => !recipeIngredientIds.has(ing.id)
            );
            const shuffledAdditional = faker.helpers.shuffle(
              availableAdditionalIngredients
            );

            for (
              let k = 0;
              k < numAdditional && k < shuffledAdditional.length;
              k++
            ) {
              if (shuffledAdditional[k]) {
                const unitId =
                  units.length > 0 && faker.datatype.boolean(0.8)
                    ? faker.helpers.arrayElement(units).id
                    : null;
                const additional = {
                  id: crypto.randomUUID(),
                  mealId: insertedMeal.id,
                  ingredientId: shuffledAdditional[k].id,
                  quantity: faker.number.float({
                    min: 0.25,
                    max: 3,
                    fractionDigits: 2,
                  }),
                  unitId: unitId,
                };
                try {
                  const [insertedAdd] = await db
                    .insert(schema.mealAdditionalIngredients)
                    .values(additional)
                    .returning();
                  mealAdditionalIngredients.push(insertedAdd);
                } catch (e: any) {
                  if (
                    e.message &&
                    e.message.toLowerCase().includes('unique constraint failed')
                  ) {
                    console.warn(
                      `Skipping duplicate additional ingredient ${shuffledAdditional[k].id} in meal ${insertedMeal.id}`
                    );
                  } else {
                    throw e;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  console.log(
    `Seeded ${meals.length} meals and ${mealAdditionalIngredients.length} meal additional ingredients.`
  );

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    sqlite.close(); // Close the database connection
  });
