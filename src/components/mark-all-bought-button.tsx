"use client";

import { useMarkAllGroceryListItemsAsBoughtMutation } from "@/mutations/grocery-lists";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const MarkAllBoughtButton = ({
    groceryListId,
    isAllBought,
}: {
    groceryListId: string;
    isAllBought: boolean;
}) => {
    const markAllBoughtMutation = useMarkAllGroceryListItemsAsBoughtMutation();

    return (
        <Button
            variant="outline"
            onClick={() => markAllBoughtMutation.mutateAsync(groceryListId)}
            disabled={markAllBoughtMutation.isPending || isAllBought}
        >
            {markAllBoughtMutation.isPending ? <Spinner /> : "Mark all bought"}
        </Button>
    );
};
