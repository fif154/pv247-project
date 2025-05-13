import { MealPlanForm } from '@/components/forms/meal-plan/meal-plan-form';
import { PageHeader } from '@/components/page-header';

const Page = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <PageHeader>Create A Meal Plan</PageHeader>
      </div>

      <MealPlanForm />
    </div>
  );
};

export default Page;
