import { Recipe } from '@/server/entities/models/recipe';
import { ChefHat } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { GroceryListFormValues } from './forms/grocery-list/schema';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

export const RecipeImportItem = ({ recipe }: { recipe: Recipe }) => {
  const form = useFormContext<GroceryListFormValues>();
  return (
    <FormField
      key={recipe.id}
      control={form.control}
      name="selectedRecipes"
      render={({ field }) => {
        return (
          <FormItem
            key={recipe.id}
            className="flex space-x-3 rounded-md border p-4 items-center"
          >
            <FormControl>
              <Checkbox
                checked={field.value?.includes(recipe.id)}
                onCheckedChange={(checked) => {
                  const currentValues = field.value || [];
                  return checked
                    ? field.onChange([...currentValues, recipe.id])
                    : field.onChange(
                        currentValues.filter((value) => value !== recipe.id)
                      );
                }}
              />
            </FormControl>
            <div className="flex flex-1 items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={recipe.image || '/placeholder.svg'}
                  alt={recipe.name}
                />
                <AvatarFallback>
                  <ChefHat className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <FormLabel className="font-medium">{recipe.name}</FormLabel>
                <HoverCard>
                  <HoverCardTrigger>
                    <p className="text-xs text-[#7A8A9E]">
                      {recipe.ingredients?.length ?? 0} ingredients
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex flex-row flex-wrap gap-2">
                      {recipe.ingredients?.map((ingredient) => (
                        <Badge key={ingredient.id} variant="outline">
                          {ingredient?.ingredient?.name}
                        </Badge>
                      ))}
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
};
