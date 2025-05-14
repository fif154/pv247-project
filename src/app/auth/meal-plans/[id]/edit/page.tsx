import { MealPlanForm } from '@/components/forms/meal-plan/meal-plan-form';
import { PageHeader } from '@/components/page-header';
import { getMealPlanAction } from '../../actions';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mealPlan = await getMealPlanAction(id);

  const title = mealPlan.name || 'Untitled Meal Plan';
  
  return {
    title: `Edit ${title} | MealMate`,
    description: `Update your meal plan "${title}".`,
  };
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
