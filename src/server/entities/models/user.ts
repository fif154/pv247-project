import { users } from "@/db/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type User = InferSelectModel<typeof users>;
export type CreateUser = InferInsertModel<typeof users>;
