'use client';

import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Grid2X2Icon, ListIcon, Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function RecipeControls() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const view = searchParams.get('view') || 'grid';

  // Handle view change
  const handleViewChange = (newView: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', newView);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle search
  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Handle sort
  const handleSort = (sortType: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortType);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          className="pl-10"
          defaultValue={searchParams.get('search') || ''}
          onChange={(e) => {
            const newValue = e.target.value;
            // Debounce to avoid too many route changes
            const timeoutId = setTimeout(() => {
              handleSearch(newValue);
            }, 300);
            return () => clearTimeout(timeoutId);
          }}
        />
      </div>

      <div className="flex justify-between">
        <Tabs value={view} onValueChange={handleViewChange}>
          <TabsList>
            <TabsTrigger value="grid" className="cursor-pointer">
              <Grid2X2Icon className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="cursor-pointer">
              <ListIcon className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="cursor-pointer">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleSort('name-asc')}
              className="cursor-pointer"
            >
              Name (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSort('name-desc')}
              className="cursor-pointer"
            >
              Name (Z-A)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSort('newest')}
              className="cursor-pointer"
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSort('oldest')}
              className="cursor-pointer"
            >
              Oldest First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
