import { GroceryListItem } from "@/server/entities/models/grocery-list-item";
import { Trash2 } from "lucide-react";
import { ClientCheckbox } from "./grocery-list-item-checkbox";
import { Button } from "./ui/button";

export const GroceryListItemComponent = ({
    item,
}: {
    item: GroceryListItem;
}) => {
    return (
        <li
            key={item.id}
            className="flex items-center justify-between rounded-lg border p-3"
        >
            <div className="flex items-center gap-3">
                <ClientCheckbox
                    id={`item-${item.id}`}
                    checked={item.isBought}
                />
                <div className="flex flex-col">
                    <label
                        htmlFor={`item-${item.id}`}
                        className={`font-medium ${
                            item.isBought ? "text-muted line-through" : ""
                        }`}
                    >
                        {item.name}
                    </label>
                    <span className="text-xs">
                        {item.quantity} {item.unit?.name}
                    </span>
                </div>
            </div>
            <div className="flex gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete item</span>
                </Button>
            </div>
        </li>
    );
};
