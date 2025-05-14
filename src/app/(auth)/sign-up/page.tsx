import { auth } from '@/auth';
import { SignUpForm } from '@/components/forms/sign-up-form';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Sign Up | MealMate',
  description:
    'Create your MealMate account to start planning meals, building grocery lists, and tracking your nutrition effortlessly.',
};

const Page = async () => {
  const userSession = await auth();

  if (userSession) {
    return redirect('/auth/home');
  }

  return <SignUpForm />;
};

export default Page;
