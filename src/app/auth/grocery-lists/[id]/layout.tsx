import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const Layout = async ({ children }: PropsWithChildren) => {
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
      {children}
    </div>
  );
};

export default Layout;
