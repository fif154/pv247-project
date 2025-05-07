import { createGroceryListAction } from "@/app/auth/grocery-list/actions";
import { GroceryListFormValues } from "@/components/forms/grocery-list/schema";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useCreateGroceryListMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: GroceryListFormValues) => {
            await createGroceryListAction(data);
        },
        onError: () => {
            showErrorToast("Failed to create grocery list");
        },
        onSuccess: () => {
            showSuccessToast("Grocery list created successfully");
            router.push("/auth/grocery-list");
        },
    });
};
