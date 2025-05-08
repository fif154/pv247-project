'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { navItems } from '@/config/nav';
import { ChefHat } from 'lucide-react';
import { Button } from './ui/button';

interface MobileSidebarDrawerProps {
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export function MobileSidebarDrawer({ user }: MobileSidebarDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background md:hidden shadow"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-foreground" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="fixed inset-y-0 left-0 w-64 p-0 m-0 bg-background shadow-lg md:hidden">
          <Sidebar className="h-full border-r border-sidebar-border">
            <SidebarHeader className="p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-coral">
                  <ChefHat className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-sidebar-foreground">
                  MealMate
                </span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.href}
                          className="flex items-center gap-3 text-sidebar-foreground"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.image ?? ''} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-sidebar-foreground">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </SidebarFooter>

            <SidebarRail />
          </Sidebar>
        </DialogContent>
      </Dialog>
    </>
  );
}
