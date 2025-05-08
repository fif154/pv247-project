import { GroceryListComponent } from "@/components/grocery-list-component";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
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
            <Tabs defaultValue="week">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                    <TabsTrigger value="week">This week</TabsTrigger>
                    <TabsTrigger value="all">All lists</TabsTrigger>
                </TabsList>
                <TabsContent value="week">
                    <GroceryListComponent groceryList={groceryLists[0]} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Page;
