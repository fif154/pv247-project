import { GroceryListComponent } from '@/components/grocery-list-component';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getGroceryListAction } from '../actions';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const groceryList = await getGroceryListAction(id);

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
      <GroceryListComponent groceryList={groceryList} />
    </div>
  );
};

export default Page;
