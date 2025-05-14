import { MealPlanning } from '@/components/meal-planning';
import { getMealPlanAction } from '../actions';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

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
  const startDate = mealPlan.startDate
    ? new Date(mealPlan.startDate).toLocaleDateString()
    : 'Unknown start';
  const endDate = mealPlan.endDate
    ? new Date(mealPlan.endDate).toLocaleDateString()
    : 'Unknown end';

  return {
    title: `${title} (${startDate} - ${endDate}) | MealMate`,
    description: `View and manage your meal plan "${title}" scheduled from ${startDate} to ${endDate}. Stay organized with your weekly meals on MealMate.`,
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const mealPlan = await getMealPlanAction(id);
  const session = await auth();

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">{mealPlan.name}</h1>
      </div>
      <SessionProvider session={session}>
        <MealPlanning mealPlan={mealPlan} />
      </SessionProvider>
    </div>
  );
};

export default Page;
