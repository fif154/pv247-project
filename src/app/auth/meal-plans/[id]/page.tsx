import { MealPlanning } from '@/components/meal-planning';
import { getMealPlanAction } from '../actions';

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
        <h1 className="text-2xl font-bold">{mealPlan.name}</h1>
      </div>
      <MealPlanning mealPlan={mealPlan} />
    </div>
  );
};

export default Page;
