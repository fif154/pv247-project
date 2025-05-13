import { MealPlanForm } from '@/components/forms/meal-plan/meal-plan-form';
import { PageHeader } from '@/components/page-header';
import { getMealPlanAction } from '../../actions';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const mealPlan = await getMealPlanAction(id);

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <PageHeader>Edit A Meal Plan</PageHeader>
      </div>

      <MealPlanForm mealPlan={mealPlan} />
    </div>
  );
};

export default Page;
