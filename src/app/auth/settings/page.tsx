import { PageHeader } from '@/components/page-header';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card } from '@/components/ui/card';

const Page = async () => {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader>Settings</PageHeader>
      <Card className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-l">Theme</span>
          <ThemeToggle />
        </div>
      </Card>
    </div>
  );
};

export default Page;
