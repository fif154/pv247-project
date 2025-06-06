import { GroceryList } from '@/server/entities/models/grocery-list';
import Link from 'next/link';
import { Suspense } from 'react';
import { formatGroceryListDate } from './grocery-list-component';
import { PercentageBar } from './percentage-bar';
import { Button } from './ui/button';
import { Loading } from './ui/loading';

async function GroceryListGrid({
  groceryLists,
}: {
  groceryLists: GroceryList[];
}) {
  return (
    <div className="grid rounded-lg gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {groceryLists.map((groceryList) => (
        <GroceryListListItem key={groceryList.id} groceryList={groceryList} />
      ))}
    </div>
  );
}

const GroceryListListItem = ({ groceryList }: { groceryList: GroceryList }) => {
  const completedItems = groceryList.items!.filter(
    (item) => item.isBought
  ).length;
  const totalItems = groceryList.items!.length;

  return (
    <div className="flex flex-col justify-between border rounded-lg ">
      <div className="flex flex-col p-4 gap-2">
        <h3 className="text-lg font-bold">{groceryList.name}</h3>
        <p className="text-sm text-gray-500">
          {`${formatGroceryListDate(
            groceryList.fromDate!
          )} - ${formatGroceryListDate(groceryList.toDate!)}`}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-center gap-10">
            <span className="text-sm text-muted-foreground">
              {totalItems} items
            </span>
            <span className="text-sm text-success">
              {completedItems} / {totalItems} completed
            </span>
          </div>
          <PercentageBar
            bgColor="bg-teal-500"
            percentage={completedItems / totalItems}
          />
        </div>
      </div>

      <Link
        href={`/auth/grocery-lists/${groceryList.id}`}
        className="flex flex-col"
      >
        <Button
          size="sm"
          className="bg-coral hover:bg-coral-hover text-coral-foreground m-2"
        >
          View
        </Button>
      </Link>
    </div>
  );
};

export const GroceryListListComponent = ({
  groceryLists,
}: {
  groceryLists: GroceryList[];
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <GroceryListGrid groceryLists={groceryLists} />
    </Suspense>
  );
};
