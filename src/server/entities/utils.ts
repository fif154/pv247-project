// https://github.com/drizzle-team/drizzle-orm/issues/695#issuecomment-2823642759

import type {
  ExtractTablesWithRelations,
  InferSelectModel,
  Many,
} from 'drizzle-orm';
import * as schema from '../../db/schema';

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

// Helper type to find the tsName corresponding to a given dbName in TSchema
type FindTsNameByDbName<DbNameToFind extends string> = {
  [K in keyof TSchema]: TSchema[K] extends { dbName: DbNameToFind } ? K : never;
}[keyof TSchema];

/**
 * Utility type to infer the model type for a given table name from the schema.
 * Handles nested relations recursively.
 * Uses referencedTableName (dbName) and FindTsNameByDbName helper.
 */
export type TModelWithRelations<TTableName extends keyof TSchema> =
  InferSelectModel<Schema[TTableName]> & {
    [K in keyof TSchema[TTableName]['relations']]?: TSchema[TTableName]['relations'][K] extends infer TRelation // Infer the Relation/Many type
      ? // Extract the dbName from the relation's referencedTableName property
        TRelation extends {
          referencedTableName: infer TRefDbName extends string;
        }
        ? // Find the corresponding tsName using the helper
          FindTsNameByDbName<TRefDbName> extends infer TRefTsName extends
            keyof TSchema
          ? // Check if the original relation was Many or Relation
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            TRelation extends Many<any>
            ? TModelWithRelations<TRefTsName>[] // Use the found tsName for recursion (Array)
            : TModelWithRelations<TRefTsName> | null // Use the found tsName for recursion (Single | null)
          : never // Could not find a tsName for the given dbName
        : never // Could not extract referencedTableName (dbName)
      : never; // Could not infer TRelation
  };

// Example Usage (assuming you have 'users' and 'posts' tables with relations defined)
// Assumes 'users' schema object has a relation named 'posts' pointing to the 'posts' table,
// and 'posts' schema object has a relation named 'author' pointing to the 'users' table.

// Example: Assuming schema.users has relations: { posts: Many<typeof schema.posts> }
// type UserWithPosts = TModelWithRelations<'users'>;
/* Resulting type would be something like:
  type UserWithPosts = InferSelectModel<typeof schema.users> & {
    posts?: (InferSelectModel<typeof schema.posts> & {
       // any relations defined on posts would be nested here too
       author?: (InferSelectModel<typeof schema.users> & { ... }) | null // Example recursive relation
    })[];
  }
  */
