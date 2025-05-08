'use client';

import { Button } from '@/components/ui/button';
import { useCreateDialog } from '@/hooks/use-create-dialog';
import { Plus } from 'lucide-react';

export const AddNewButton = () => {
  const { setOpen, CreateDialog } = useCreateDialog();

  return (
    <>
      <Button
        className="hidden md:flex "
        variant="coral"
        onClick={() => setOpen(true)}
      >
        <Plus /> Add new
      </Button>
      <CreateDialog />
    </>
  );
};
