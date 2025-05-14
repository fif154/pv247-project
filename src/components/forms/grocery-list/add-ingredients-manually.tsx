'use client';
import { SelectField } from '@/components/forms/select-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useCategories } from '@/queries/categories';
import { useIngredients } from '@/queries/ingredients';
import { useUnits } from '@/queries/units';
import { Ingredient } from '@/server/entities/models/ingredient';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { GroceryListFormValues, IngredientFormValues } from './schema';

export const AddIngredientsManuallyForm = ({
  editMode,
}: {
  editMode?: boolean;
}) => {
  const form = useFormContext<GroceryListFormValues>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'manualIngredients',
  });

  const handleAddIngredient = (ingredient: IngredientFormValues) => {
    const lastIngredient = fields[fields.length - 1];
    if (lastIngredient?.name.length === 0) {
      remove(fields.length - 1);
    }
    append(ingredient);
  };

  const addEmptyIngredient = () => {
    append(
      {
        name: '',
        quantity: 1,
        // Casting as we dont have a category yet
      } as IngredientFormValues,
      { shouldFocus: true }
    );
  };

  return (
    <Card>
      {!editMode ? (
        <CardHeader>
          <h2 className="text-2xl font-semibold">Add Ingredients Manually</h2>
          <p className="text-md text-muted-foreground">
            Add additional ingredients to your grocery list
          </p>
        </CardHeader>
      ) : null}
      <CardContent>
        <AddExistingIngredientsManually
          appendExisting={handleAddIngredient}
          existingIngredients={fields}
        />
        <Separator className="my-6" />
        <IngredientListForm
          ingredients={fields}
          removeIngredient={remove}
          addEmptyIngredient={addEmptyIngredient}
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
  const [searchQuery, setSearchQuery] = useState('');

  const ingredients = useIngredients();

  const filteredItems =
    ingredients.data?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        existingIngredients.every((eI) => eI.name !== item.name)
    ) ?? [];

  const addIngredient = (item: Ingredient) => {
    const newItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      category: item.category!,
      // Can't set the unit here
    } as unknown as IngredientFormValues;

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
                    onSelect={() => addIngredient(item)}
                  >
                    <span>{item.name}</span>
                    <span className="ml-2 text-xs ">{item.category?.name}</span>
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
  addEmptyIngredient,
}: {
  ingredients: IngredientFormValues[];
  removeIngredient: (idx: number) => void;
  addEmptyIngredient: () => void;
}) => {
  const form = useFormContext<GroceryListFormValues>();
  const { data: units = [] } = useUnits();
  const { data: categories = [] } = useCategories();

  return (
    <div className="flex flex-col gap-6">
      {ingredients.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No ingredients added yet.
        </div>
      ) : null}
      {ingredients.map((field, index) => {
        return (
          <Card key={field.id ?? index}>
            <CardHeader className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">
                Ingredient {index + 1}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeIngredient(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Remove</span>
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <FormField
                  control={form.control}
                  name={`manualIngredients.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(index !== 0 && 'sr-only', 'font-bold')}
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
              </div>
              <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-5">
                <div>
                  <FormField
                    control={form.control}
                    name={`manualIngredients.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={cn(index !== 0 && 'sr-only', 'font-bold')}
                        >
                          Qty
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <SelectField
                    form={form}
                    name={`manualIngredients.${index}.unit`}
                    label={index === 0 ? 'Unit' : undefined}
                    labelClassName={cn(index !== 0 && 'sr-only')}
                    options={units}
                    placeholder="Unit"
                    searchPlaceholder="Search units…"
                    emptyText="No units."
                  />
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-12">
                <SelectField
                  form={form}
                  name={`manualIngredients.${index}.category`}
                  label={index === 0 ? 'Category' : undefined}
                  labelClassName={cn(index !== 0 && 'sr-only')}
                  options={categories}
                  placeholder="Select category"
                  searchPlaceholder="Search categories…"
                  emptyText="No categories."
                />
              </div>
            </CardContent>
          </Card>
        );
      })}
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center"
        onClick={addEmptyIngredient}
      >
        <div className="flex items-center gap-2 font-bold">
          <Plus className="h-4 w-4" />
          <span>Add ingredient</span>
        </div>
      </Button>
    </div>
  );
};
