import { MealPlanImportItem } from "@/components/meal-plan-import-item";
import { PaginationControls } from "@/components/pagination-controls";
import { RecipeImportItem } from "@/components/recipe-import-item";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePagination } from "@/hooks/use-pagination";
import { MealPlan } from "@/server/entities/models/mealplan";
import { Recipe } from "@/server/entities/models/recipe";
import { TabsContent } from "@radix-ui/react-tabs";

type Props = {
    recipes: Recipe[];
    mealPlans: MealPlan[];
};

export const ImportIngredientsForm = ({ recipes, mealPlans }: Props) => {
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
    const { paginatedItems, currentPage, goToPage, pageSize } =
        usePagination(recipes);

    return (
        <TabsContent value="recipes" className="flex flex-col gap-4">
            {paginatedItems.map((recipe) => (
                <RecipeImportItem key={recipe.id} recipe={recipe} />
            ))}
            {recipes.length === 0 && <NoTabContent tabName="recipes" />}
            <PaginationControls
                totalPages={Math.ceil(recipes.length / pageSize)}
                page={currentPage}
                onPageChange={goToPage}
            />
        </TabsContent>
    );
};

const MealPlanTabsContent = ({ mealPlans }: { mealPlans: MealPlan[] }) => {
    const { paginatedItems, currentPage, goToPage, pageSize } =
        usePagination(mealPlans);

    return (
        <TabsContent value="mealplans" className="flex flex-col gap-4">
            {paginatedItems.map((mealPlan) => (
                <MealPlanImportItem key={mealPlan.id} plan={mealPlan} />
            ))}
            {mealPlans.length === 0 && <NoTabContent tabName="meal plans" />}
            <PaginationControls
                totalPages={Math.ceil(mealPlans.length / pageSize)}
                page={currentPage}
                onPageChange={goToPage}
            />
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
