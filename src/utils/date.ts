import { addDays, isAfter, isBefore, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

export const isDateInRange = (date: Date, dateRange: DateRange) => {
  const from = dateRange.from;
  const to = dateRange.to;

  return (
    (from === undefined || isAfter(date, subDays(from, 1))) &&
    (to === undefined || isBefore(date, addDays(to, 1)))
  );
};
