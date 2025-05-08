import { GroceryList } from "@/server/entities/models/grocery-list";
import { format } from "date-fns";
import { GroceryListItemComponent } from "./grocery-list-item-component";
import { Button } from "./ui/button";

const formatDate = (date: Date) => {
    return format(date, "LLLL d");
};

export const GroceryListComponent = ({
    groceryList,
}: {
    groceryList: GroceryList;
}) => {
    const itemsByCategory =
        groceryList.items?.reduce((acc, item) => {
            const category = item.ingredient?.category?.name || "Uncategorized";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {} as Record<string, typeof groceryList.items>) || {};

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{groceryList.name}</h2>
                    {groceryList.fromDate && groceryList.toDate ? (
                        <p className="text-sm text-muted-foreground">
                            {formatDate(groceryList.fromDate)} -{" "}
                            {formatDate(groceryList.toDate)}
                        </p>
                    ) : null}
                </div>
                <Button variant="outline">Mark all bought</Button>
            </div>

            <div className="flex flex-col gap-2">
                {Object.entries(itemsByCategory).map(([category, items]) => (
                    <div
                        key={category}
                        className="flex flex-col gap-2 border-b pb-2"
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <h3 className="text-xl font-semibold">
                                {category}
                            </h3>
                            <span className="text-lg text-muted-foreground">
                                (
                                {items.reduce(
                                    (acc, item) => acc + +item.isBought,
                                    0
                                )}
                                /{items.length})
                            </span>
                        </div>
                        <ul className="flex flex-col gap-4">
                            {items.map((item) => (
                                <GroceryListItemComponent
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
