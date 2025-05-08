import { useDeleteGroceryListItemMutation } from "@/mutations/grocery-lists";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export const DeleteGroceryListItemButton = ({
    groceryListItemId,
}: {
    groceryListItemId: string;
}) => {
    const deleteMutation = useDeleteGroceryListItemMutation();

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutateAsync(groceryListItemId)}
        >
            {deleteMutation.isPending ? (
                <Spinner />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
            <span className="sr-only">Delete item</span>
        </Button>
    );
};
