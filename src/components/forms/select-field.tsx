import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SelectOption, SelectPopover } from '@/components/ui/select-popover';
import { cn } from '@/lib/utils';
import { Path, UseFormReturn } from 'react-hook-form';

interface SelectFieldProps<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  isLoading?: boolean;
  className?: string;
  labelClassName?: string;
  modal?: boolean;
}

export function SelectField<T extends Record<string, unknown>>({
  form,
  name,
  label,
  options,
  placeholder,
  searchPlaceholder,
  emptyText,
  isLoading,
  className,
  labelClassName,
  modal = false,
}: SelectFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className={cn('font-bold', labelClassName)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <SelectPopover
              options={options}
              value={field.value as SelectOption | undefined}
              onSelect={field.onChange}
              placeholder={placeholder}
              searchPlaceholder={searchPlaceholder}
              emptyText={emptyText}
              isLoading={isLoading}
              className="z-10"
              modal={modal}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
