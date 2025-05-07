import { MealPlan } from "@/server/entities/models/mealplan";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { GroceryListFormValues } from "./forms/grocery-list/schema";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";

const formatDate = (date: Date) => {
    return format(date, "MM/dd/yyyy");
};

export const MealPlanImportItem = ({ plan }: { plan: MealPlan }) => {
    const form = useFormContext<GroceryListFormValues>();

    const allRecipes =
        plan.meals?.map((mealPlanMeal) => mealPlanMeal.meal?.recipe) ?? [];

    return (
        <FormField
            key={plan.id}
            control={form.control}
            name="selectedMealPlans"
            render={({ field }) => {
                return (
                    <FormItem
                        key={plan.id}
                        className="space-y-3 rounded-md border p-4"
                    >
                        <div className="flex items-start space-x-3">
                            <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(plan.id)}
                                    onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        return checked
                                            ? field.onChange([
                                                  ...currentValues,
                                                  plan.id,
                                              ])
                                            : field.onChange(
                                                  currentValues.filter(
                                                      (value) =>
                                                          value !== plan.id
                                                  )
                                              );
                                    }}
                                />
                            </FormControl>
                            <div className="flex flex-1 items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage
                                        src="/placeholder.svg?height=40&width=40"
                                        alt={plan.name}
                                    />
                                    <AvatarFallback>
                                        <CalendarDays className="h-5 w-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <FormLabel className="font-medium">
                                        {plan.name}
                                    </FormLabel>
                                    <p className="text-xs text-[#7A8A9E]">
                                        {formatDate(plan.startDate)} -{" "}
                                        {formatDate(plan.endDate)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="ml-7 mt-2">
                            <p className="mb-2 text-xs text-[#7A8A9E]">
                                Included recipes:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {allRecipes.map((recipe) => {
                                    return recipe ? (
                                        <Badge
                                            key={recipe.id}
                                            variant="outline"
                                            className="text-xs"
                                        >
                                            {recipe.name}
                                        </Badge>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </FormItem>
                );
            }}
        />
    );
};
