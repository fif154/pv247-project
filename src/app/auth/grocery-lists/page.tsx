import { GroceryListComponent } from '@/components/grocery-list-component';
import { GroceryListListComponent } from '@/components/grocery-list-list-component';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroceryList } from '@/server/entities/models/grocery-list';
import { TabsContent } from '@radix-ui/react-tabs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { listGroceryListsAction } from './actions';

// Could be done on BE
const findThisWeekGroceryList = (groceryLists: GroceryList[]) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

  return groceryLists.find(
    (list) =>
      new Date(list.fromDate!) >= startOfWeek &&
      new Date(list.toDate!) <= endOfWeek
  );
};

export const metadata = {
  title: 'Grocery Lists | MealMate',
  description:
    'View, manage, and create grocery lists to keep your meal planning organized.',
};

async function GroceryListsContent() {
  const groceryLists = await listGroceryListsAction();
  const currentList = findThisWeekGroceryList(groceryLists);

  return (
    <Tabs defaultValue="week">
      <TabsList className="mb-4 grid w-full grid-cols-2">
        <TabsTrigger value="week">This week</TabsTrigger>
        <TabsTrigger value="all">All lists</TabsTrigger>
      </TabsList>
      <TabsContent value="week">
        {currentList ? (
          <GroceryListComponent groceryList={currentList!} />
        ) : (
          <EmptyThisWeeksGroceryList />
        )}
      </TabsContent>
      <TabsContent value="all">
        <GroceryListListComponent groceryLists={groceryLists} />
      </TabsContent>
    </Tabs>
  );
}

const EmptyThisWeeksGroceryList = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h2 className="text-2xl font-bold">No grocery list for this week</h2>
      <p className="text-gray-500">
        Create a new grocery list to get started or browse lists from other
        weeks.
      </p>
      <Button variant="coral" className="mt-4">
        <Link
          href="/auth/grocery-lists/new"
          className="flex items-center gap-2"
        >
          <Plus />
          <span>Create a new grocery list</span>
        </Link>
      </Button>
    </div>
  );
};

const Page = () => {
  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <PageHeader>Grocery List</PageHeader>
        </div>
        <Button variant="coral">
          <Link
            href="/auth/grocery-lists/new"
            className="flex items-center gap-2"
          >
            <Plus />
            <span className="hidden md:block">Create a new grocery list</span>
          </Link>
        </Button>
      </div>
      <Suspense fallback={<Loading />}>
        <GroceryListsContent />
      </Suspense>
    </div>
  );
};

export default Page;
