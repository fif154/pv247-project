import { MealPlanImportItem } from "@/components/meal-plan-import-item";
import { RecipeImportItem } from "@/components/recipe-import-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MealPlan } from "@/server/entities/models/mealplan";
import { Recipe } from "@/server/entities/models/recipe";
import { mockRecipes } from "@/utils/mock";
import { TabsContent } from "@radix-ui/react-tabs";

export const ImportIngredientsForm = () => {
    const recipes = mockRecipes;
    const mealPlans: MealPlan[] = [];

    return (
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-semibold">
                    Import from Recipes & Meal Plans
                </h2>
                <p className="text-md text-muted-foreground">
                    Select recipes and meal plans to include in your grocery
                    list
                </p>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="recipes">
                    <TabsList className="mb-4 grid w-full grid-cols-2">
                        <TabsTrigger value="recipes">Recipes</TabsTrigger>
                        <TabsTrigger value="mealplans">Meal Plans</TabsTrigger>
                    </TabsList>
                    <RecipeTabsContent recipes={recipes} />
                    <MealPlanTabsContent mealPlans={mealPlans} />
                </Tabs>
            </CardContent>
        </Card>
    );
};

const RecipeTabsContent = ({ recipes }: { recipes: Recipe[] }) => {
    return (
        <TabsContent value="recipes" className="flex flex-col gap-4">
            {recipes.map((recipe) => (
                <RecipeImportItem key={recipe.id} recipe={recipe} />
            ))}
            {recipes.length === 0 && <NoTabContent tabName="recipes" />}
        </TabsContent>
    );
};

const MealPlanTabsContent = ({ mealPlans }: { mealPlans: MealPlan[] }) => {
    return (
        <TabsContent value="mealplans" className="flex flex-col gap-4">
            {mealPlans.map((mealPlan) => (
                <MealPlanImportItem key={mealPlan.id} plan={mealPlan} />
            ))}
            {mealPlans.length === 0 && <NoTabContent tabName="meal plans" />}
        </TabsContent>
    );
};

const NoTabContent = ({ tabName }: { tabName: string }) => {
    return (
        <div className="text-center text-muted-foreground">
            No {tabName} available to import.
        </div>
    );
};
