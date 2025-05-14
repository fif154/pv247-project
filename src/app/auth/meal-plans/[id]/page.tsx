import { MealPlanning } from '@/components/meal-planning';
import { getMealPlanAction } from '../actions';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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
