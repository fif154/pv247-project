import { GroceryList } from '@/server/entities/models/grocery-list';
import { format } from 'date-fns';
import Link from 'next/link';
import { Suspense } from 'react';
import { EditGroceryListForm } from './edit-grocery-list-form';
import { GroceryListItemComponent } from './grocery-list-item-component';
import { MarkAllBoughtButton } from './mark-all-bought-button';
import { Button } from './ui/button';
import { Loading } from './ui/loading';

export const formatGroceryListDate = (date: Date) => {
  return format(date, 'LLLL d');
};

type GroceryListItem = NonNullable<GroceryList['items']>[number];

async function GroceryListItems({
  items,
}: {
  items: GroceryListItem[] | undefined;
}) {
  const itemsByCategory =
    items?.reduce(
      (acc: Record<string, GroceryListItem[]>, item: GroceryListItem) => {
        const category = item.ingredient?.category?.name || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      },
      {}
    ) || {};

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(itemsByCategory).map(([category, items]) => (
        <div key={category} className="flex flex-col gap-2 border-b pb-2">
          <div className="flex flex-row gap-2 items-center">
            <h3 className="text-xl font-semibold">{category}</h3>
            <span className="text-lg text-muted-foreground">
              (
              {items.reduce(
                (acc: number, item: GroceryListItem) => acc + +item.isBought,
                0
              )}
              /{items.length})
            </span>
          </div>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <GroceryListItemComponent key={item.id} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export const GroceryListComponent = ({
  groceryList,
  editMode = false,
}: {
  groceryList: GroceryList;
  editMode?: boolean;
}) => {
  const areAllBought = !!groceryList.items?.every((item) => item.isBought);

  return (
    <div className="flex flex-col gap-6 border rounded-lg p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{groceryList.name}</h2>
          {groceryList.fromDate && groceryList.toDate ? (
            <p className="text-sm text-muted-foreground">
              {formatGroceryListDate(groceryList.fromDate)} -{' '}
              {formatGroceryListDate(groceryList.toDate)}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-end md:flex-row gap-2">
          <MarkAllBoughtButton
            groceryListId={groceryList.id}
            isAllBought={areAllBought}
          />
          <Link
            href={
              `/auth/grocery-lists/${groceryList.id}` +
              (!editMode ? '/edit' : '')
            }
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <Button variant="outline" className="w-full md:w-auto">
              {editMode ? 'Cancel' : 'Add'}
            </Button>
          </Link>
        </div>
      </div>

      {editMode ? <EditGroceryListForm groceryList={groceryList} /> : null}

      <Suspense fallback={<Loading />}>
        <GroceryListItems items={groceryList.items} />
      </Suspense>
    </div>
  );
};
