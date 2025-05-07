import { GroceryListCreateForm } from "@/components/forms/grocery-list/grocery-list-create";
import { PageHeader } from "@/components/page-header";
import { ArrowLeft } from "lucide-react";
import { listRecipes } from "../../recipes/actions";

const Page = async () => {
    const [
        recipes,
        // mealPlans
    ] = await Promise.all([
        listRecipes(),
        // listMealPlans(),
    ]);

    return (
        <div className="flex flex-col h-screen gap-4">
            <div className="flex flex-row justify-between items-center">
                <div className="flex gap-6 items-center">
                    <ArrowLeft className="h-5 w-5" />

                    <PageHeader>Create a grocery list</PageHeader>
                </div>
            </div>

            <GroceryListCreateForm recipes={recipes} mealPlans={[]} />
        </div>
    );
};

export default Page;
