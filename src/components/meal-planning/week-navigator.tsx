'use client';

import { Button } from '@/components/ui/button';
import { addWeeks, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface WeekNavigatorProps {
  currentRange: DateRange;
  setRange: (range: DateRange) => void;
}

export function WeekNavigator({ currentRange, setRange }: WeekNavigatorProps) {
  const weekLabel = `${format(currentRange.from!, 'MMM d, yyyy')} – ${format(
    currentRange.to!,
    'MMM d, yyyy'
  )}`;

  const onWeekChange = (add: boolean) => {
    if (add) {
      onWeekAdd();
      return;
    }
    onWeekSubtract();
  };

  const onWeekAdd = () => {
    const newStartDate = addWeeks(currentRange.from!, 1);
    setRange({
      from: newStartDate,
      to: addWeeks(newStartDate, 1),
    });
  };

  const onWeekSubtract = () => {
    const newStartDate = addWeeks(currentRange.from!, -1);
    setRange({
      from: newStartDate,
      to: addWeeks(newStartDate, 1),
    });
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <Button variant="outline" size="icon" onClick={() => onWeekChange(false)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-medium">{weekLabel}</span>
      <Button variant="outline" size="icon" onClick={() => onWeekChange(true)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
