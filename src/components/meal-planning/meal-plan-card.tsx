import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { MealPlanWithStatus } from '@/server/entities/models/meal-plan';
import { format } from 'date-fns';
import { EyeIcon, PenIcon } from 'lucide-react';
import Link from 'next/link';
import { DeleteMealPlanButton } from './delete-meal-plan-button';

interface MealPlanCardProps {
  plan: MealPlanWithStatus;
}

export function MealPlanCard({ plan }: MealPlanCardProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 rounded-lg border ${
        plan.status.isUpcoming ? 'bg-muted/50' : 'bg-card'
      }`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{plan.name}</h3>
          {plan.status.isUpcoming && (
            <Badge variant="secondary">Upcoming</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {format(new Date(plan.startDate), 'MMM d, yyyy')} –{' '}
          {format(new Date(plan.endDate), 'MMM d, yyyy')}
        </p>
      </div>
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
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full md:w-auto"
        >
          <Link href={`/auth/meal-plans/${plan.id}`}>
            <EyeIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
