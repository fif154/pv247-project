import { listMealPlansAction } from '@/app/auth/meal-plans/actions';
import { CurrentMealPlanCard } from '@/components/meal-planning/current-meal-plan-card';
import { MealPlanCard } from '@/components/meal-planning/meal-plan-card';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata = {
  title: 'Meal Plans | MealMate',
  description: 'View, manage, and create meal plans.',
};

async function MealPlansList() {
  const mealPlans = await listMealPlansAction();

  return (
    <div className="grid gap-4">
      {mealPlans.map((plan) =>
        plan.status.isCurrent ? (
          <CurrentMealPlanCard key={plan.id} plan={plan} />
        ) : (
          <MealPlanCard key={plan.id} plan={plan} />
        )
      )}
      {mealPlans.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
          <h2 className="text-2xl font-bold">No meal plans found</h2>
          <p className="text-gray-500">
            No meal plans found. Create your first meal plan to get started.
          </p>
          <Button variant="coral" asChild>
            <Link href="/auth/meal-plans/new">Create Meal Plan</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <PageHeader>Meal Plans</PageHeader>
        <Button variant="coral" asChild>
          <Link href="/auth/meal-plans/new">Create Meal Plan</Link>
        </Button>
      </div>

      <Suspense fallback={<Loading />}>
        <MealPlansList />
      </Suspense>
    </div>
  );
};

export default Page;
