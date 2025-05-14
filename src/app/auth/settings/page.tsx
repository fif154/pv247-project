import { getUserAction } from '@/app/(users)/actions';
import { auth } from '@/auth';
import { EditMacrosForm } from '@/components/forms/settings/edit-macros-form';
import { PageHeader } from '@/components/page-header';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card } from '@/components/ui/card';

export const metadata = {
  title: 'Settings | MealMate',
  description: 'Customize your MealMate experience.',
};

const Page = async () => {
  const userSession = await auth();
  const currentUser = userSession?.user;

  if (!currentUser) {
    throw new Error('User not found, this should not happen');
  }

  const user = await getUserAction(currentUser.id);
  const userInfo = {
    id: user?.id ?? '',
    carbs: user?.carbs ?? 0,
    protein: user?.protein ?? 0,
    fats: user?.fats ?? 0,
    calories: user?.calories ?? 0,
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>Settings</PageHeader>
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-l">Theme</span>
          <ThemeToggle />
        </div>
      </Card>
      <Card>
        <div className="flex flex-col px-4 gap-3">
          <h2 className="text-l font-bold">Edit Macros</h2>
          <EditMacrosForm userInfo={userInfo} />
        </div>
      </Card>
    </div>
  );
};

export default Page;
