import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { listGroceryListsAction } from "./actions";

const Page = async () => {
    const groceryLists = await listGroceryListsAction();

    return (
        <div className="flex flex-col h-screen gap-4">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                    <PageHeader>Grocery List</PageHeader>
                </div>
                <Button variant="coral">
                    <Link href="/auth/grocery-list/new">
                        Create a new grocery list
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                {groceryLists.map((groceryList) => (
                    <div key={groceryList.id} className="p-4 border rounded-md">
                        <h2 className="text-lg font-semibold">
                            {groceryList.name} {groceryList.id}
                        </h2>
                        <div className="flex flex-col gap-2">
                            {groceryList.items?.map(
                                (item) => item.ingredient?.name
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;
