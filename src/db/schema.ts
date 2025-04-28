import { sql } from "drizzle-orm";
import {
    integer,
    numeric,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

const baseSchema = {
    id: text("id")
        .primaryKey()
        .$defaultFn(
            () => sql`lower(hex( randomblob(4)) || '-' || hex( randomblob(2))
         || '-' || '4' || substr( hex( randomblob(2)), 2) || '-'
         || substr('AB89', 1 + (abs(random()) % 4) , 1)  ||
         substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))) `
        ),
    createdAt: text("created_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    deletedAt: text("deleted_at"),
};

export const users = sqliteTable(
    "users",
    {
        ...baseSchema,
        name: text("name").notNull(),
        email: text("email").notNull(),
        passwordHash: text("password_hash").notNull(),
        lastLogin: text("last_login"),
        isAdmin: integer("is_admin").notNull().default(0),
    },
    (table) => [uniqueIndex("users_email_unique").on(table.email)]
);

export const groups = sqliteTable("groups", {
    ...baseSchema,
    name: text("name").notNull(),
    description: text("description"),
});

export const groupMembers = sqliteTable(
    "group_members",
    {
        ...baseSchema,
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        groupId: text("group_id")
            .notNull()
            .references(() => groups.id, { onDelete: "cascade" }),
    },
    (table) => [
        uniqueIndex("group_user_unique").on(table.groupId, table.userId),
    ]
);

export const recipes = sqliteTable("recipes", {
    ...baseSchema,
    name: text("name").notNull(),
    description: text("description"),
    createdBy: text("created_by")
        .notNull()
        .references(() => users.id),
});

export const ingredients = sqliteTable(
    "ingredients",
    {
        ...baseSchema,
        name: text("name").notNull(),
        description: text("description"),
        createdBy: text("created_by").references(() => users.id),
        imageUrl: text("image_url"),
    },
    (table) => [uniqueIndex("ingredients_name_unique").on(table.name)]
);

export const recipeIngredients = sqliteTable(
    "recipe_ingredients",
    {
        ...baseSchema,
        recipeId: text("recipe_id")
            .notNull()
            .references(() => recipes.id),
        ingredientId: text("ingredient_id")
            .notNull()
            .references(() => ingredients.id),
        quantity: numeric("quantity").notNull(),
        unit: text("unit_id").references(() => units.id),
    },
    (table) => [
        uniqueIndex("recipe_ingredients_unique").on(
            table.recipeId,
            table.ingredientId
        ),
    ]
);

export const groceryLists = sqliteTable("grocery_lists", {
    ...baseSchema,
    groupId: text("group_id")
        .notNull()
        .references(() => groups.id),
    recipeId: text("recipe_id").references(() => recipes.id),
    name: text("name").notNull(),
    description: text("description"),
    createdBy: text("created_by")
        .notNull()
        .references(() => users.id),
});

export const groceryListItems = sqliteTable(
    "grocery_list_items",
    {
        ...baseSchema,
        groceryListId: text("grocery_list_id")
            .notNull()
            .references(() => groceryLists.id),
        ingredient: text("ingredient_id")
            .notNull()
            .references(() => ingredients.id),
        quantity: numeric("quantity").notNull(),
        unit: text("unit_id").references(() => units.id),
        name: text("name").notNull(),
        isBought: integer("is_bought").notNull().default(0),
    },
    (table) => [
        uniqueIndex("grocery_list_items_ingredient_unique").on(
            table.ingredient,
            table.groceryListId
        ),
    ]
);

export const units = sqliteTable(
    "units",
    {
        ...baseSchema,
        name: text("name").notNull(),
        description: text("description"),
    },
    (table) => [uniqueIndex("units_name_unique").on(table.name)]
);
