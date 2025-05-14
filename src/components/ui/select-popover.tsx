import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

export interface SelectOption {
  id: string;
  name: string;
}

interface SelectPopoverProps {
  options: SelectOption[];
  value?: SelectOption;
  onSelect: (option: SelectOption) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  isLoading?: boolean;
  modal?: boolean;
  className?: string;
  disabled?: boolean;
}

export function SelectPopover({
  options,
  value,
  onSelect,
  placeholder = 'Select option',
  searchPlaceholder = 'Search...',
  emptyText = 'No options found.',
  isLoading = false,
  modal = false,
  className,
  disabled,
}: SelectPopoverProps) {
  return (
    <Popover modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn('w-full justify-between', className)}
          disabled={disabled}
        >
          {value ? value.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <Spinner />
                </div>
              ) : (
                options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={() => onSelect(option)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value?.id === option.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.name}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
