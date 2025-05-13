import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';

function Calendar({ className, classNames, ...props }: DayPickerProps) {
  return (
    <DayPicker
      className={cn('p-3', className)}
      classNames={{
        day: 'hover:bg-input hover:text-primary',
        range_start: 'bg-input',
        range_end: 'bg-input',
        selected: '',
        range_middle: 'bg-gray-100 dark:bg-black/20',
        today:
          'bg-primary/50 dark:bg-primary/20 text-primary-foreground dark:text-primary',
        ...classNames,
      }}
      components={{
        PreviousMonthButton: (props) => (
          <button {...props}>
            <ChevronLeft className="w-4 h-4" />
          </button>
        ),
        NextMonthButton: (props) => (
          <button {...props}>
            <ChevronRight className="w-4 h-4" />
          </button>
        ),
      }}
      {...props}
    />
  );
}

export { Calendar };
