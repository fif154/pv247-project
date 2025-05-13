import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { MealPlanWithStatus } from '@/server/entities/models/meal-plan';
import { format } from 'date-fns';
import { PenIcon } from 'lucide-react';
import Link from 'next/link';

interface MealPlanCardProps {
  plan: MealPlanWithStatus;
}

export function MealPlanCard({ plan }: MealPlanCardProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border ${
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
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href={`/auth/meal-plans/${plan.id}/edit`}>
            <PenIcon className="h-4 w-4" />
            Edit
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/auth/meal-plans/${plan.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
}
