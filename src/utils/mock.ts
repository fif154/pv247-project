import { Ingredient } from '@/server/entities/models/ingredient';
import { Meal } from '@/server/entities/models/meal';
import { Recipe } from '@/server/entities/models/recipe';

const generateMockUUID = () => crypto.randomUUID();

const getCurrentISODate = () => new Date().toISOString();

const getFutureDateTimestamp = (daysInFuture: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysInFuture);
  return date;
};

const getMockDateInfo = (daysInFuture?: number) => {
  const date = new Date();
  date.setDate(date.getDate() + (daysInFuture ?? 0));
  return {
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
    deletedAt: null,
  };
};

const user_uuid_1 = generateMockUUID();
const user_uuid_2 = generateMockUUID();
const user_uuid_3 = generateMockUUID();

const mockGramUnit = {
  ...getMockDateInfo(),
  gramsPerUnit: 100,
  name: 'grams',
  id: generateMockUUID(),
  description: 'grams',
};

export const mockIngredients: Ingredient[] = [
  {
    id: generateMockUUID(), // ingredient_uuid_chicken
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Chicken Breast',
    description: 'Boneless, skinless chicken breast.',
    createdBy: user_uuid_1,
    imageUrl: 'https://example.com/images/chicken_breast.jpg',
    protein: 31, // per 100g
    carbs: 0, // per 100g
    fats: 3.6, // per 100g
    calories: 165, // per 100g
    baseMacroQuantity: 100,
    categoryId: null,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_spaghetti
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Spaghetti Pasta',
    description: 'Dried spaghetti pasta.',
    createdBy: user_uuid_1,
    categoryId: null,
    imageUrl: 'https://example.com/images/spaghetti.jpg',
    protein: 13, // per 100g uncooked
    carbs: 75, // per 100g uncooked
    fats: 1.5, // per 100g uncooked
    calories: 371, // per 100g uncooked
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_t_sauce
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Tomato Sauce',
    description: 'Basic tomato sauce or passata.',
    createdBy: user_uuid_2,
    categoryId: 'category_uuid_sauce',
    imageUrl: 'https://example.com/images/tomato_sauce.jpg',
    protein: 1.5, // per 100g
    carbs: 7, // per 100g
    fats: 0.2, // per 100g
    calories: 35, // per 100g
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_olive_oil
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Olive Oil',
    description: 'Extra virgin olive oil.',
    createdBy: user_uuid_1,
    categoryId: null,
    imageUrl: 'https://example.com/images/olive_oil.jpg',
    protein: 0,
    carbs: 0,
    fats: 100,
    calories: 884, // per 100g (or 100ml approx)
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_garlic
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Garlic Clove',
    description: 'Fresh garlic.',
    createdBy: user_uuid_2,
    categoryId: null,
    imageUrl: null,
    protein: 6.4, // per 100g
    carbs: 33, // per 100g
    fats: 0.5, // per 100g
    calories: 149, // per 100g
    baseMacroQuantity: 100, // Though often used in smaller quantities
  },
  {
    id: generateMockUUID(), // ingredient_uuid_oats
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Rolled Oats',
    description: 'Standard rolled oats for porridge.',
    createdBy: user_uuid_3,
    categoryId: null,
    imageUrl: 'https://example.com/images/oats.jpg',
    protein: 16.9,
    carbs: 66.3,
    fats: 6.9,
    calories: 389,
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_milk
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Milk (Whole)',
    description: "Cow's milk, whole.",
    createdBy: user_uuid_1,
    categoryId: null,
    imageUrl: 'https://example.com/images/milk.jpg',
    protein: 3.3,
    carbs: 4.8,
    fats: 3.5, // Adjust for skimmed/semi-skimmed
    calories: 62,
    baseMacroQuantity: 100, // For 100ml
  },
  {
    id: generateMockUUID(), // ingredient_uuid_banana
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Banana',
    description: 'Fresh banana.',
    createdBy: user_uuid_2,
    categoryId: null,
    imageUrl: 'https://example.com/images/banana.jpg',
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    calories: 89,
    baseMacroQuantity: 100, // For 100g (approx 1 medium banana without skin)
  },
  {
    id: generateMockUUID(), // ingredient_uuid_eggs
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Egg (Large)',
    description: 'Large chicken egg.',
    createdBy: user_uuid_1,
    categoryId: null,
    imageUrl: 'https://example.com/images/egg.jpg',
    protein: 12.6, // per 100g (approx 2 large eggs)
    carbs: 1.1,
    fats: 9.5,
    calories: 143,
    baseMacroQuantity: 100, // Or you could define per egg (~50-60g)
  },
  {
    id: generateMockUUID(), // ingredient_uuid_t_sauce
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Tomato Sauce',
    description: 'Basic tomato sauce or passata.',
    createdBy: user_uuid_2,
    categoryId: null,
    imageUrl: 'https://example.com/images/tomato_sauce.jpg',
    protein: 1.5, // per 100g
    carbs: 7, // per 100g
    fats: 0.2, // per 100g
    calories: 35, // per 100g
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_olive_oil
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Olive Oil',
    description: 'Extra virgin olive oil.',
    createdBy: user_uuid_1,
    categoryId: null,
    imageUrl: 'https://example.com/images/olive_oil.jpg',
    protein: 0,
    carbs: 0,
    fats: 100,
    calories: 884, // per 100g (or 100ml approx)
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_garlic
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Garlic Clove',
    description: 'Fresh garlic.',
    createdBy: user_uuid_2,
    categoryId: null,
    imageUrl: null,
    protein: 6.4, // per 100g
    carbs: 33, // per 100g
    fats: 0.5, // per 100g
    calories: 149, // per 100g
    baseMacroQuantity: 100, // Though often used in smaller quantities
  },
  {
    id: generateMockUUID(), // ingredient_uuid_oats
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    categoryId: null,
    name: 'Rolled Oats',
    description: 'Standard rolled oats for porridge.',
    createdBy: user_uuid_3,
    imageUrl: 'https://example.com/images/oats.jpg',
    protein: 16.9,
    carbs: 66.3,
    fats: 6.9,
    calories: 389,
    baseMacroQuantity: 100,
  },
  {
    id: generateMockUUID(), // ingredient_uuid_milk
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    categoryId: null,

    name: 'Milk (Whole)',
    description: "Cow's milk, whole.",
    createdBy: user_uuid_1,
    imageUrl: 'https://example.com/images/milk.jpg',
    protein: 3.3,
    carbs: 4.8,
    fats: 3.5, // Adjust for skimmed/semi-skimmed
    calories: 62,
    baseMacroQuantity: 100, // For 100ml
  },
  {
    id: generateMockUUID(), // ingredient_uuid_banana
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    categoryId: null,

    name: 'Banana',
    description: 'Fresh banana.',
    createdBy: user_uuid_2,
    imageUrl: 'https://example.com/images/banana.jpg',
    protein: 1.1,
    carbs: 22.8,
    fats: 0.3,
    calories: 89,
    baseMacroQuantity: 100, // For 100g (approx 1 medium banana without skin)
  },
  {
    id: generateMockUUID(), // ingredient_uuid_eggs
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    categoryId: null,

    name: 'Egg (Large)',
    description: 'Large chicken egg.',
    createdBy: user_uuid_1,
    imageUrl: 'https://example.com/images/egg.jpg',
    protein: 12.6, // per 100g (approx 2 large eggs)
    carbs: 1.1,
    fats: 9.5,
    calories: 143,
    baseMacroQuantity: 100, // Or you could define per egg (~50-60g)
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: generateMockUUID(), // recipe_uuid_spaghetti_bolognese
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Classic Spaghetti Bolognese',
    description:
      'A hearty and traditional Italian meat sauce served with spaghetti.',
    createdBy: user_uuid_1,
    servings: 4,
    image: 'https://example.com/images/spaghetti_bolognese.jpg', // Added image
    ingredients: [
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[1].id, // Spaghetti Pasta
        recipeId: generateMockUUID(),
        quantity: 200, // Quantity in grams
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[1],
      },
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[2].id, // Tomato Sauce
        recipeId: generateMockUUID(),
        quantity: 150, // Quantity in grams
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[2],
      },
    ],
  },
  {
    id: generateMockUUID(), // recipe_uuid_oatmeal
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Simple Banana Oatmeal',
    description:
      'A quick and healthy breakfast made with rolled oats, milk, and topped with banana.',
    createdBy: user_uuid_2,
    servings: 1,
    image: 'https://example.com/images/banana_oatmeal.jpg', // Added image
    ingredients: [
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[5].id, // Rolled Oats
        recipeId: generateMockUUID(),
        quantity: 50, // Quantity in grams
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[5],
      },
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[6].id, // Milk (Whole)
        recipeId: generateMockUUID(),
        quantity: 200, // Quantity in ml
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[6],
      },
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[7].id, // Banana
        recipeId: generateMockUUID(),
        quantity: 130, // Quantity in grams
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[7],
      },
    ],
  },
  {
    id: generateMockUUID(), // recipe_uuid_scrambled_eggs
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Fluffy Scrambled Eggs',
    description:
      'Creamy and fluffy scrambled eggs, perfect for breakfast or a light meal.',
    createdBy: user_uuid_1,
    servings: 2,
    image: 'https://example.com/images/scrambled_eggs.jpg', // Added image
    ingredients: [
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[8].id, // Egg (Large)
        recipeId: generateMockUUID(),
        quantity: 100, // Quantity in grams (approx. 2 eggs)
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[8],
      },
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[6].id, // Milk (Whole)
        recipeId: generateMockUUID(),
        quantity: 50, // Quantity in ml
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[6],
      },
    ],
  },
  {
    id: generateMockUUID(), // recipe_uuid_chicken_stir_fry
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Quick Chicken Stir-fry',
    description: 'A fast and flavorful chicken stir-fry with mixed vegetables.',
    createdBy: user_uuid_3,
    servings: 2,
    image: 'https://example.com/images/chicken_stir_fry.jpg', // Added image
    ingredients: [
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[0].id, // Chicken Breast
        recipeId: generateMockUUID(),
        quantity: 200, // Quantity in grams
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[0],
      },
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[4].id, // Garlic Clove
        recipeId: generateMockUUID(),
        quantity: 10, // Quantity in grams
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[4],
      },
      {
        ...getMockDateInfo(),
        id: generateMockUUID(),
        ingredientId: mockIngredients[3].id, // Olive Oil
        recipeId: generateMockUUID(),
        quantity: 20, // Quantity in ml
        unitId: mockGramUnit.id,
        unit: mockGramUnit,
        ingredient: mockIngredients[3],
      },
    ],
  },
];

export const mockMeals: Meal[] = [
  {
    id: generateMockUUID(),
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Morning Oats Delight',
    userId: 'user_uuid_1',
    recipeId: 'recipe_uuid_oats',
    mealTypeId: 'mealtype_uuid_breakfast',
    plannedDate: new Date('2025-05-07T08:00:00Z'),
    notes: 'Extra berries today!',
    image:
      'https://fastly.picsum.photos/id/388/200/200.jpg?hmac=yc4V5jCOMR-l634JzXmANfvSGFGgYWHQN4aKA69RvZo',
    mealType: {
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate(),
      deletedAt: null,
      id: 'mealtype_uuid_breakfast',
      name: 'Breakfast',
      description: 'The first meal of the day.',
    },
    recipe: mockRecipes[1],
  },
  {
    id: generateMockUUID(),
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Chicken Salad Lunch',
    userId: 'user_uuid_2',
    recipeId: 'recipe_uuid_chickensalad',
    mealTypeId: 'mealtype_uuid_lunch',
    plannedDate: getFutureDateTimestamp(2),
    notes: 'Pack in a container for work.',
    image: null,
    mealType: {
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate(),
      deletedAt: null,
      id: 'mealtype_uuid_lunch',
      name: 'Lunch',
      description: 'Lunchhhhhh',
    },
    recipe: mockRecipes[3],
    additionalIngredients: [
      {
        ...mockIngredients[0],
        ingredientId: mockIngredients[0].id,
        unitId: generateMockUUID(),
        quantity: 200,
        mealId: generateMockUUID(),
        unit: mockGramUnit,
      },
    ],
  },
  {
    id: generateMockUUID(),
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Spaghetti Carbonara Dinner',
    userId: 'user_uuid_1',
    recipeId: 'recipe_uuid_carbonara',
    mealTypeId: 'mealtype_uuid_dinner',
    plannedDate: new Date('2025-05-06T19:30:00Z'),
    notes: "Don't forget the parmesan.",
    image:
      'https://fastly.picsum.photos/id/388/200/200.jpg?hmac=yc4V5jCOMR-l634JzXmANfvSGFGgYWHQN4aKA69RvZo',
    mealType: {
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate(),
      deletedAt: null,
      id: 'mealtype_uuid_dinner',
      name: 'Dinner',
      description: 'The last meal of the day.',
    },
    recipe: mockRecipes[2],
  },
  {
    id: generateMockUUID(),
    createdAt: getCurrentISODate(),
    updatedAt: getCurrentISODate(),
    deletedAt: null,
    name: 'Quick Apple Snack',
    userId: 'user_uuid_3',
    recipeId: 'recipe_uuid_apple',
    mealTypeId: 'mealtype_uuid_snack',
    plannedDate: null,
    notes: 'A Fuji apple.',
    image: null,
    mealType: {
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate(),
      deletedAt: null,
      id: 'mealtype_uuid_snack',
      name: 'Snack',
      description: 'A small meal between main meals.',
    },
    recipe: mockRecipes[0],
  },
  {
    id: generateMockUUID(),
    createdAt: '2025-05-01T10:00:00Z',
    updatedAt: '2025-05-02T11:00:00Z',
    deletedAt: null,
    name: 'Weekend Brunch Special',
    userId: 'user_uuid_2',
    recipeId: 'recipe_uuid_pancakes',
    mealTypeId: 'mealtype_uuid_brunch',
    plannedDate: new Date('2025-05-10T11:00:00Z'),
    notes: 'With maple syrup and blueberries.',
    image:
      'https://fastly.picsum.photos/id/388/200/200.jpg?hmac=yc4V5jCOMR-l634JzXmANfvSGFGgYWHQN4aKA69RvZo',
    mealType: {
      createdAt: getCurrentISODate(),
      updatedAt: getCurrentISODate(),
      deletedAt: null,
      id: 'mealtype_uuid_brunch',
      name: 'Brunch',
      description: 'A late morning meal.',
    },
    recipe: mockRecipes[1],
  },
];
