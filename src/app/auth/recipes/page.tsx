import { Loading } from '@/components/ui/loading';
import { PageHeader } from '@/components/ui/page-header';
import { Suspense } from 'react';

async function RecipesContent() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <PageHeader>Recipes</PageHeader>
      </div>
      {/* Recipe list content will go here */}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <RecipesContent />
    </Suspense>
  );
}
