import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { MealPlanWithStatus } from '@/server/entities/models/meal-plan';
import { format } from 'date-fns';
import { CalendarDays, EyeIcon, PenIcon } from 'lucide-react';
import Link from 'next/link';
import { DeleteMealPlanButton } from './delete-meal-plan-button';

interface CurrentMealPlanCardProps {
  plan: MealPlanWithStatus;
}

export function CurrentMealPlanCard({ plan }: CurrentMealPlanCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border-2 border-primary bg-primary/5 p-6 shadow-lg">
      <div className="absolute -right-4 -top-4 h-24 w-24 rotate-12 bg-primary/10" />
      <div className="relative space-y-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground">
              {format(new Date(plan.startDate), 'MMM d, yyyy')} –{' '}
              {format(new Date(plan.endDate), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <Badge className="bg-primary text-primary-foreground">
            Active Meal Plan
          </Badge>
          <div className="flex flex-col md:flex-row items-center gap-2">
            <DeleteMealPlanButton id={plan.id} />
            <Button
              asChild
              variant="outline"
              className="w-full md:w-auto"
              size="sm"
            >
              <Link href={`/auth/meal-plans/${plan.id}/edit`}>
                <PenIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/auth/meal-plans/${plan.id}`}>
                <EyeIcon />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
