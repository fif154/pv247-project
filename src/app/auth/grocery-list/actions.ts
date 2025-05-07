"use server";

import { GroceryListFormValues } from "@/components/forms/grocery-list/schema";
import { getInjection } from "@/server/di/container";
import { NotFoundError } from "@/server/entities/errors/common";
import { ValidationError } from "@/server/entities/errors/validation";
import { revalidatePath } from "next/cache";

export async function createGroceryListAction(data: GroceryListFormValues) {
    try {
        const groceryListController = getInjection(
            "ICreateGroceryListController"
        );
        await groceryListController(data);
        revalidatePath("/grocery-list");
    } catch (error: unknown) {
        if (error instanceof NotFoundError) {
            throw new Response("Resource not found", { status: 404 });
        }
        if (error instanceof ValidationError) {
            throw new Response(error.message, { status: 400 });
        }
        throw new Response("Internal server error", { status: 500 });
    }
}

export async function listGroceryListsAction() {
    try {
        const groceryListController = getInjection(
            "IListGroceryListsController"
        );
        return await groceryListController();
    } catch (error: unknown) {
        if (error instanceof NotFoundError) {
            throw new Response("Resource not found", { status: 404 });
        }
        if (error instanceof ValidationError) {
            throw new Response(error.message, { status: 400 });
        }
        throw new Response("Internal server error", { status: 500 });
    }
}
