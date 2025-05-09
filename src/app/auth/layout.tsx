import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 px-8 py-6 flex flex-col ">
        <div className="flex md:hidden w-full py-2 sticky top-0 z-10 bg-background justify-between ">
          <SidebarTrigger variant="outline" />
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
