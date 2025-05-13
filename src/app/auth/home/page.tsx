import { Macros } from '@/components/macros';
import { Meals } from '@/components/meals';
import { PageHeader } from '@/components/page-header';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { AddNewButton } from './add-new-button';

export const metadata = {
  title: 'Home | MealMate',
  description: 'Manage your meals and nutrition easily.',
};

const formatDate = (date: Date) => format(date, 'EEEE, MMMM d, yyyy');

const Page = async () => {
  const today = new Date();

  return (
    <div className="flex flex-col h-screen gap-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <PageHeader>Dashboard</PageHeader>
          <div className="flex items-center gap-2 text-[#7A8A9E]">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDate(today)}</span>
          </div>
        </div>
        <AddNewButton />
      </div>
      <Macros calories={1560} carbs={12} fat={44} protein={123} />
      <Meals />
    </div>
  );
};

export default Page;
