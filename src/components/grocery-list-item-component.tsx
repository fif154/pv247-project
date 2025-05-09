"use client";
import { GroceryListItem } from "@/server/entities/models/grocery-list-item";
import { DeleteGroceryListItemButton } from "./delete-grocery-list-item-button";
import { ClientCheckbox } from "./grocery-list-item-checkbox";

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
                    item={item}
                />
                <div className="flex flex-col">
                    <label
                        htmlFor={`item-${item.id}`}
                        className={`font-medium ${
                            item.isBought
                                ? "text-muted-foreground line-through"
                                : ""
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
                <DeleteGroceryListItemButton groceryListItemId={item.id} />
            </div>
        </li>
    );
};
