import { auth } from '@/auth';
import { EditProfileButton } from '@/components/forms/profile/edit-profile-button';
import { PageHeader } from '@/components/page-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { SessionProvider } from 'next-auth/react';

export const metadata = {
  title: 'Profile | MealMate',
  description:
    'View and edit your profile information including name, email, and avatar.',
};


const Page = async () => {
  const userSession = (await auth())!;
  const userInfo = {
    id: userSession.user.id ?? '',
    name: userSession.user.name ?? '',
    email: userSession.user.email ?? '',
  };

  return (
    <div className="flex flex-col gap-4">
      <PageHeader>Profile</PageHeader>
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-36 h-36">
                <AvatarImage src={userSession.user.image ?? ''} alt="User" />
                <AvatarFallback>
                  {(userSession.user.name ?? 'x').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{userSession.user.name}</h2>
              <span className="text-sm font-medium text-muted-foreground">
                {userSession.user.email}
              </span>
            </div>
          </div>
          <SessionProvider session={userSession}>
            <EditProfileButton userInfo={userInfo} />
          </SessionProvider>
        </div>
      </Card>
    </div>
  );
};

export default Page;
