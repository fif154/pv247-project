/* eslint-disable @typescript-eslint/no-explicit-any */

// seed.ts – minimal, human‑readable seeder for demo purposes
// -----------------------------------------------------------------------------
// Seeds two demo groups (id "default" and "default2"), one demo user, plus
// a concise set of real‑world units, categories, ingredients, recipes and meal
// types.  No random data – everything is hard‑coded so the demo looks tidy.
// -----------------------------------------------------------------------------

import { createClient } from '@libsql/client';
import crypto from 'crypto';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

// -----------------------------------------------------------------------------
// DB connection
// -----------------------------------------------------------------------------
const sqlite = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.AUTH_TOKEN!,
});

const db = drizzle(sqlite, { schema });

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
async function insertOne<T extends keyof typeof schema>(
  table: (typeof schema)[T],
  row: any
) {
  const [inserted] = await db.insert(table).values(row).returning();
  return inserted as typeof row;
}

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

async function main() {
  console.log('Clearing old data …');
  await clearExistingData();
  console.log('Seeding fresh data …');

  // ───── Groups ───────────────────────────────────────────────────────────────
  const groups = [
    await insertOne(schema.groups, {
      id: 'default',
      name: 'Household Alpha',
      description: 'Primary demo household',
    }),
    await insertOne(schema.groups, {
      id: 'default2',
      name: 'Household Beta',
      description: 'Secondary demo household',
    }),
  ];
  console.log(`✓ Groups: ${groups.length}`);

  // ───── Demo user ────────────────────────────────────────────────────────────
  const user = await insertOne(schema.users, {
    id: crypto.randomUUID(),
    name: 'Demo User',
    email: 'a@a.cz',
    emailVerified: null,
    image: null,
    passwordHash:
      '$2a$10$kOuvasMid4V44blJKmfoGOEwk.OaaH3He5oVGELYbutnj4n9f4nLu',
    groupId: groups[0].id,
  });
  console.log('✓ Users: 1');

  await insertOne(schema.groupMembers, {
    id: crypto.randomUUID(),
    userId: user.id,
    groupId: groups[0].id,
  });
  console.log('✓ GroupMembers: 1');

  // ───── Units ────────────────────────────────────────────────────────────────
  const UNIT_PRESETS = [
    { name: 'g', description: 'Metric gram', grams: 1 },
    { name: 'kg', description: 'Metric kilogram', grams: 1000 },
    { name: 'piece', description: 'Piece / unit', grams: 50 },
    { name: 'cup', description: 'US cup', grams: 240 },
    { name: 'tbsp', description: 'Tablespoon', grams: 15 },
    { name: 'tsp', description: 'Teaspoon', grams: 5 },
    { name: 'ml', description: 'Milliliter', grams: 1 },
    { name: 'l', description: 'Liter', grams: 1000 },
  ];
  const units: Array<typeof schema.units.$inferSelect> = [];
  for (const { name, description, grams } of UNIT_PRESETS) {
    units.push(
      await insertOne(schema.units, {
        id: crypto.randomUUID(),
        name,
        description,
        gramsPerUnit: grams,
      })
    );
  }
  console.log(`✓ Units: ${units.length}`);

  // ───── Ingredient categories ───────────────────────────────────────────────
  const CATEGORY_PRESETS = [
    'Vegetables',
    'Fruits',
    'Dairy',
    'Meat & Poultry',
    'Grains & Pasta',
  ];
  const ingredientCategories: Array<
    typeof schema.ingredientCategories.$inferSelect
  > = [];
  for (const name of CATEGORY_PRESETS) {
    ingredientCategories.push(
      await insertOne(schema.ingredientCategories, {
        id: crypto.randomUUID(),
        name,
        description: `${name} food group`,
        createdBy: user.id,
        groupId: groups[0].id,
      })
    );
  }
  console.log(`✓ IngredientCategories: ${ingredientCategories.length}`);

  // ───── Ingredients ──────────────────────────────────────────────────────────
  const INGREDIENT_PRESETS = [
    {
      name: 'Spaghetti',
      category: 'Grains & Pasta',
      protein: 13,
      carbs: 75,
      fats: 1,
      calories: 370,
    },
    {
      name: 'Minced Beef',
      category: 'Meat & Poultry',
      protein: 26,
      carbs: 0,
      fats: 20,
      calories: 280,
    },
    {
      name: 'Tomato',
      category: 'Vegetables',
      protein: 1,
      carbs: 4,
      fats: 0,
      calories: 18,
    },
    {
      name: 'Parmesan',
      category: 'Dairy',
      protein: 35,
      carbs: 4,
      fats: 28,
      calories: 420,
    },
    {
      name: 'Chicken Breast',
      category: 'Meat & Poultry',
      protein: 31,
      carbs: 0,
      fats: 3,
      calories: 165,
    },
    {
      name: 'Romaine Lettuce',
      category: 'Vegetables',
      protein: 1,
      carbs: 3,
      fats: 0,
      calories: 17,
    },
    {
      name: 'Egg',
      category: 'Dairy',
      protein: 13,
      carbs: 1,
      fats: 11,
      calories: 155,
    },
    {
      name: 'Cheddar Cheese',
      category: 'Dairy',
      protein: 25,
      carbs: 1,
      fats: 33,
      calories: 403,
    },
  ];
  const ingredients: Array<typeof schema.ingredients.$inferSelect> = [];
  for (const ing of INGREDIENT_PRESETS) {
    const cat = ingredientCategories.find((c) => c.name === ing.category)!;
    ingredients.push(
      await insertOne(schema.ingredients, {
        id: crypto.randomUUID(),
        name: ing.name,
        description: `${ing.name} ingredient`,
        createdBy: user.id,
        categoryId: cat.id,
        imageUrl: null,
        protein: ing.protein,
        carbs: ing.carbs,
        fats: ing.fats,
        calories: ing.calories,
        groupId: groups[0].id,
      })
    );
  }
  console.log(`✓ Ingredients: ${ingredients.length}`);

  // ───── Meal types ───────────────────────────────────────────────────────────
  const MEAL_TYPE_PRESETS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const mealTypes: Array<typeof schema.mealTypes.$inferSelect> = [];
  let sortOrder = 0;
  for (const n of MEAL_TYPE_PRESETS) {
    mealTypes.push(
      await insertOne(schema.mealTypes, {
        id: crypto.randomUUID(),
        name: n,
        description: `${n} meal`,
        sortOrder: sortOrder++,
      })
    );
  }
  console.log(`✓ MealTypes: ${mealTypes.length}`);

  // ───── Recipes & ingredients ───────────────────────────────────────────────
  const RECIPE_PRESETS = [
    {
      name: 'Spaghetti Bolognese',
      servings: 4,
      groupId: groups[0].id,
      ingredients: [
        { name: 'Spaghetti', quantity: 400, unit: 'g' },
        { name: 'Minced Beef', quantity: 500, unit: 'g' },
        { name: 'Tomato', quantity: 3, unit: 'piece' },
        { name: 'Parmesan', quantity: 50, unit: 'g' },
      ],
      mealTypes: ['Dinner'],
    },
    {
      name: 'Chicken Caesar Salad',
      servings: 2,
      groupId: groups[0].id,
      ingredients: [
        { name: 'Chicken Breast', quantity: 2, unit: 'piece' },
        { name: 'Romaine Lettuce', quantity: 1, unit: 'piece' },
        { name: 'Parmesan', quantity: 30, unit: 'g' },
      ],
      mealTypes: ['Lunch'],
    },
    {
      name: 'Veggie Omelette',
      servings: 1,
      groupId: groups[0].id,
      ingredients: [
        { name: 'Egg', quantity: 2, unit: 'piece' },
        { name: 'Cheddar Cheese', quantity: 30, unit: 'g' },
        { name: 'Tomato', quantity: 1, unit: 'piece' },
      ],
      mealTypes: ['Breakfast'],
    },
  ];

  const recipes: Array<typeof schema.recipes.$inferSelect> = [];
  const recipeIngredients: any[] = [];
  const recipeToMealTypes: any[] = [];

  for (const r of RECIPE_PRESETS) {
    const recipe = await insertOne(schema.recipes, {
      id: crypto.randomUUID(),
      name: r.name,
      description: `${r.name} delicious meal`,
      createdBy: user.id,
      servings: r.servings,
      image: null,
      groupId: r.groupId,
    });
    recipes.push(recipe);

    for (const ing of r.ingredients) {
      const ingredient = ingredients.find((i) => i.name === ing.name)!;
      const unit = units.find((u) => u.name === ing.unit)!;
      recipeIngredients.push(
        await insertOne(schema.recipeIngredients, {
          id: crypto.randomUUID(),
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          quantity: ing.quantity,
          unitId: unit.id,
        })
      );
    }

    for (const mtName of r.mealTypes) {
      const mt = mealTypes.find((m) => m.name === mtName)!;
      recipeToMealTypes.push(
        await insertOne(schema.recipeToMealTypes, {
          id: crypto.randomUUID(),
          recipeId: recipe.id,
          mealTypeId: mt.id,
        })
      );
    }
  }
  console.log(`✓ Recipes: ${recipes.length}`);
  console.log(`✓ RecipeIngredients: ${recipeIngredients.length}`);
  console.log(`✓ RecipeToMealTypes: ${recipeToMealTypes.length}`);

  console.log('🎉  Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(() => sqlite.close());
