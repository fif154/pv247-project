import {
    createGroceryListAction,
    deleteGroceryListItemAction,
    markAllItemsBoughtAction,
    updateGroceryListItemAction,
} from "@/app/auth/grocery-lists/actions";
import { GroceryListFormValues } from "@/components/forms/grocery-list/schema";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateGroceryListMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: GroceryListFormValues) => {
            return await createGroceryListAction(data);
        },
        onError: () => {
            showErrorToast("Failed to create grocery list");
        },
        onSuccess: (groceryList) => {
            showSuccessToast("Grocery list created successfully");
            router.push("/auth/grocery-lists/" + groceryList!.id);
        },
    });
};

export const useMarkGroceryListItemAsBoughtMutation = (onError: () => void) => {
    return useMutation({
        mutationFn: async (item: { id: string; isBought: boolean }) => {
            await updateGroceryListItemAction(item.id, {
                isBought: !item.isBought,
            });
        },
        onError: () => {
            onError();
            showErrorToast("Failed to mark grocery list item as bought");
        },
        onSuccess: () => {
            showSuccessToast("Grocery list item marked as bought");
        },
    });
};

export const useMarkAllGroceryListItemsAsBoughtMutation = () => {
    return useMutation({
        mutationFn: async (groceryListId: string) => {
            await markAllItemsBoughtAction(groceryListId);
        },
        onError: () => {
            showErrorToast("Failed to mark all grocery list items as bought");
        },
        onSuccess: () => {
            showSuccessToast("All grocery list items marked as bought");
        },
    });
};

export const useDeleteGroceryListItemMutation = () => {
    return useMutation({
        mutationFn: async (itemId: string) => {
            await deleteGroceryListItemAction(itemId);
        },
        onError: () => {
            showErrorToast("Failed to delete grocery list item");
        },
        onSuccess: () => {
            showSuccessToast("Grocery list item deleted successfully");
        },
    });
};
