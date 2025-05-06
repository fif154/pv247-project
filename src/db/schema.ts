import { AdapterAccountType } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";
import {
    integer,
    numeric,
    primaryKey,
    sqliteTable,
    text,
    uniqueIndex,
} from "drizzle-orm/sqlite-core";

const baseSchema = {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    createdAt: text("created_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at")
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    deletedAt: text("deleted_at"),
};

export const users = sqliteTable("user", {
    ...baseSchema,
    name: text("name"),
    email: text("email").unique(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
    passwordHash: text("password"),
});

export const accounts = sqliteTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccountType>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

export const authenticators = sqliteTable(
    "authenticator",
    {
        credentialID: text("credentialID").notNull().unique(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        providerAccountId: text("providerAccountId").notNull(),
        credentialPublicKey: text("credentialPublicKey").notNull(),
        counter: integer("counter").notNull(),
        credentialDeviceType: text("credentialDeviceType").notNull(),
        credentialBackedUp: integer("credentialBackedUp", {
            mode: "boolean",
        }).notNull(),
        transports: text("transports"),
    },
    (authenticator) => ({
        compositePK: primaryKey({
            columns: [authenticator.userId, authenticator.credentialID],
        }),
    })
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
        ingredientId: text("ingredient_id")
            .notNull()
            .references(() => ingredients.id),
        quantity: numeric("quantity").notNull(),
        unit: text("unit_id").references(() => units.id),
        name: text("name").notNull(),
        isBought: integer("is_bought").notNull().default(0),
    },
    (table) => [
        uniqueIndex("grocery_list_items_ingredient_unique").on(
            table.ingredientId,
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

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
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
