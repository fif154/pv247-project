import { GroceryListComponent } from '@/components/grocery-list-component';
import { getGroceryListAction } from '../actions';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const groceryList = await getGroceryListAction(id);

  return <GroceryListComponent groceryList={groceryList} />;
};

export default Page;
