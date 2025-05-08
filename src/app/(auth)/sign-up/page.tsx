import { auth } from '@/auth';
import { SignUpForm } from '@/components/forms/sign-up-form';
import { redirect } from 'next/navigation';

const Page = async () => {
  const userSession = await auth();

  if (userSession) {
    return redirect('/auth/home');
  }

  return <SignUpForm />;
};

export default Page;
