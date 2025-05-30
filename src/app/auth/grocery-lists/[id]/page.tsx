import { GroceryListComponent } from '@/components/grocery-list-component';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';
import { getGroceryListAction } from '../actions';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const groceryList = await getGroceryListAction(id);

  const fromDate = groceryList.fromDate
    ? new Date(groceryList.fromDate).toLocaleDateString()
    : 'Unknown start';
  const toDate = groceryList.toDate
    ? new Date(groceryList.toDate).toLocaleDateString()
    : 'Unknown end';

  return {
    title: `Grocery List (${fromDate} - ${toDate}) | MealMate`,
    description: `View your grocery list for the week of ${fromDate} to ${toDate}.`,
  };
}

async function GroceryListDetail({ id }: { id: string }) {
  const groceryList = await getGroceryListAction(id);
  return <GroceryListComponent groceryList={groceryList} />;
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <GroceryListDetail id={id} />
    </Suspense>
  );
};

export default Page;
