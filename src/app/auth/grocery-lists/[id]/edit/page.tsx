import { GroceryListComponent } from '@/components/grocery-list-component';
import { Loading } from '@/components/ui/loading';
import { Suspense } from 'react';
import { getGroceryListAction } from '../../actions';

async function GroceryListEdit({ id }: { id: string }) {
  const groceryList = await getGroceryListAction(id);
  return <GroceryListComponent groceryList={groceryList} editMode />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const list = await getGroceryListAction(id);

  const title = list.name || 'Untitled Grocery List';

  return {
    title: `Edit ${title} | MealMate`,
    description: `Update your grocery list "${title}".`,
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<Loading />}>
      <GroceryListEdit id={id} />
    </Suspense>
  );
};

export default Page;
