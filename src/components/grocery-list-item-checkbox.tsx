'use client';

import { useMarkGroceryListItemAsBoughtMutation } from '@/mutations/grocery-lists';
import { GroceryListItem } from '@/server/entities/models/grocery-list-item';
import { ComponentProps, useEffect, useState } from 'react';
import { Checkbox } from './ui/checkbox';

export const ClientCheckbox = ({
  item,
  checked,
  ...props
}: ComponentProps<typeof Checkbox> & { item: GroceryListItem }) => {
  const [optimisticChecked, setOptimisticChecked] = useState(checked);

  const markAsBoughtMutation = useMarkGroceryListItemAsBoughtMutation(() =>
    setOptimisticChecked((prev) => !prev)
  );

  const handleCheckedChange = async () => {
    setOptimisticChecked((prev) => !prev);
    await markAsBoughtMutation.mutateAsync(item);
  };

  useEffect(() => {
    setOptimisticChecked(checked);
  }, [checked]);

  return (
    <Checkbox
      {...props}
      checked={optimisticChecked}
      onCheckedChange={handleCheckedChange}
    />
  );
};
