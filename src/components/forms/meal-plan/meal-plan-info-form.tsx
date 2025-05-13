import { DatePickerWithRange } from '@/components/date-range-picker';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useFormContext } from 'react-hook-form';
import { MealPlanFormValues } from './meal-plan-form';

export const MealPlanInfoForm = () => {
  const form = useFormContext<MealPlanFormValues>();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Meal Plan</h2>
        <p className="text-lg text-muted-foreground">
          Create a meal plan to organize your meals for the week. You can
          customize the date range and add notes to your meal plan.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-md font-medium">
            Name of the meal plan
          </Label>
          <Input
            type="text"
            id="name"
            {...register('name')}
            placeholder="e.g. Sugar Detox"
            className={`border ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } rounded-md p-2`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date range</FormLabel>
                <FormControl>
                  <DatePickerWithRange
                    date={field.value}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Label
            htmlFor="dateRange"
            className="font-medium text-muted-foreground"
          >
            Select the date range for your meal plan
          </Label>
          {errors.dateRange?.from && (
            <span className="text-red-500 text-sm">
              {errors.dateRange.from.message}
            </span>
          )}
          {errors.dateRange?.to && (
            <span className="text-red-500 text-sm">
              {errors.dateRange.to.message}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
