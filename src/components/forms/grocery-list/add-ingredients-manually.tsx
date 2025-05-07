import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useIngredients } from "@/queries/ingredients";
import { Ingredient } from "@/server/entities/models/ingredient";
import { Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
    GroceryListFormValues,
    IngredientFormValues,
} from "./grocery-list-create";

export const AddIngredientsManuallyForm = () => {
    const form = useFormContext<GroceryListFormValues>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "manualIngredients",
    });

    const handleAddIngredient = (ingredient: IngredientFormValues) => {
        const lastIngredient = fields[fields.length - 1];
        console.log(lastIngredient.name);
        if (lastIngredient?.name.length === 0) {
            remove(fields.length - 1);
        }
        append(ingredient);
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-semibold">
                    Add Ingredients Manually
                </h2>
                <p className="text-md text-muted-foreground">
                    Add additional ingredients to your grocery list
                </p>
            </CardHeader>
            <CardContent>
                <AddExistingIngredientsManually
                    appendExisting={handleAddIngredient}
                    existingIngredients={fields}
                />
                <Separator className="my-6" />
                <IngredientListForm
                    ingredients={fields}
                    removeIngredient={remove}
                />
            </CardContent>
        </Card>
    );
};

const AddExistingIngredientsManually = ({
    existingIngredients,
    appendExisting,
}: {
    existingIngredients: IngredientFormValues[];
    appendExisting: (item: IngredientFormValues) => void;
}) => {
    const [openItemSelector, setOpenItemSelector] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const ingredients = useIngredients();

    const filteredItems =
        ingredients.data?.filter(
            (item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                existingIngredients.every((eI) => eI.name !== item.name)
        ) ?? [];

    const addCommonItem = (item: Ingredient) => {
        const newItem: IngredientFormValues = {
            name: item.name,
            quantity: 1,
            category: item.category!,
        };

        appendExisting(newItem);
        setOpenItemSelector(false);
    };

    return (
        <Popover open={openItemSelector} onOpenChange={setOpenItemSelector}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>Quick add common items</span>
                    </div>
                    <Plus className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput
                        placeholder="Search items..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                    />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {ingredients.isLoading ? (
                                <Spinner />
                            ) : (
                                filteredItems.map((item) => (
                                    <CommandItem
                                        key={item.name}
                                        value={item.name}
                                        onSelect={() => addCommonItem(item)}
                                    >
                                        <span>{item.name}</span>
                                        <span className="ml-2 text-xs ">
                                            {item.category?.name}
                                        </span>
                                    </CommandItem>
                                ))
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const IngredientListForm = ({
    ingredients,
    removeIngredient,
}: {
    ingredients: IngredientFormValues[];
    removeIngredient: (idx: number) => void;
}) => {
    const form = useFormContext<GroceryListFormValues>();
    return (
        <div className="flex flex-col gap-4">
            {ingredients.map((field, index) => (
                <div
                    key={field.id ?? index}
                    className="grid gap-4 md:grid-cols-12"
                >
                    <FormField
                        control={form.control}
                        name={`manualIngredients.${index}.name`}
                        render={({ field }) => (
                            <FormItem className="md:col-span-5">
                                <FormLabel
                                    className={cn(
                                        index !== 0 ? "sr-only" : undefined,
                                        "font-bold"
                                    )}
                                >
                                    Ingredient name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Milk" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`manualIngredients.${index}.quantity`}
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel
                                    className={cn(
                                        index !== 0 ? "sr-only" : undefined,
                                        "font-bold"
                                    )}
                                >
                                    Quantity
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. 1"
                                        type="number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`manualIngredients.${index}.unit`}
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel
                                    className={cn(
                                        index !== 0 ? "sr-only" : undefined,
                                        "font-bold"
                                    )}
                                >
                                    Unit
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. L" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`manualIngredients.${index}.category.name`}
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel
                                    className={cn(
                                        index !== 0 ? "sr-only" : undefined,
                                        "font-bold"
                                    )}
                                >
                                    Category
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. Dairy"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-end md:col-span-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeIngredient(index)}
                            disabled={ingredients.length <= 1}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};
