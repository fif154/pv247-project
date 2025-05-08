import { createClient, ResultSet } from "@libsql/client";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { SQLiteTransaction } from "drizzle-orm/sqlite-core";
import * as schema from "./schema";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

type Schema = typeof schema;

export type Transaction = SQLiteTransaction<
  "async",
  ResultSet,
  Schema,
  ExtractTablesWithRelations<Schema>
>;
