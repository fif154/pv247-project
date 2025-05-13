import { Loading } from '@/components/ui/loading';
import { PageHeader } from '@/components/ui/page-header';
import { Suspense } from 'react';

async function CategoriesContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <PageHeader>Categories</PageHeader>
        <Loading />
      </div>
      {/* Categories list content will go here */}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <CategoriesContent />
    </Suspense>
  );
}
