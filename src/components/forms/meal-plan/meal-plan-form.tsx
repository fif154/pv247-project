'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import {
  useCreateMealPlanMutation,
  useEditMealPlanMutation,
} from '@/mutations/meal-plans';
import { MealPlan } from '@/server/entities/models/meal-plan';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MealPlanInfoForm } from './meal-plan-info-form';

const mealPlanFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((data) => data.from < data.to, {
      message: 'Start date must be before end date',
    }),
  description: z.string().optional(),
  id: z.string().optional(),
});

export type MealPlanFormValues = z.infer<typeof mealPlanFormSchema>;

export const MealPlanForm = ({ mealPlan }: { mealPlan?: MealPlan }) => {
  const form = useForm<MealPlanFormValues>({
    resolver: zodResolver(mealPlanFormSchema),
    defaultValues: {
      name: mealPlan?.name ?? '',
      dateRange: {
        from: mealPlan?.startDate,
        to: mealPlan?.endDate,
      },
      description: mealPlan?.description ?? '',
      id: mealPlan?.id,
    },
  });
  const createMealPlanMutation = useCreateMealPlanMutation();
  const editMealPlanMutation = useEditMealPlanMutation();

  const isPending =
    createMealPlanMutation.isPending || editMealPlanMutation.isPending;

  const { handleSubmit } = form;

  const onSubmit = async (data: MealPlanFormValues) => {
    if (mealPlan) {
      await editMealPlanMutation.mutateAsync({
        data: {
          ...data,
          id: mealPlan.id,
        },
      });
      return;
    }

    await createMealPlanMutation.mutateAsync({ data });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <MealPlanInfoForm />
        <Button
          type="submit"
          className="bg-coral text-white py-2 px-4 rounded-md"
          disabled={isPending}
        >
          {isPending ? (
            <Spinner />
          ) : (
            `${mealPlan ? 'Update' : 'Create'} Meal Plan`
          )}
        </Button>
      </form>
    </Form>
  );
};
