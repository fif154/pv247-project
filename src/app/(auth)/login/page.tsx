import { auth } from '@/auth';
import { LoginForm } from '@/components/forms/login-form';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login | MealMate',
  description: 'Sign in to MealMate to access your personalized meal plans, grocery lists, and nutrition tracking tools.',
};

export default async function LoginPage() {
  const userSession = await auth();

  if (userSession) {
    return redirect('/auth/home');
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
