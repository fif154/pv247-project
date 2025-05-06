"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { navItems } from "@/config/nav"; // Assuming navItems is in config/nav.ts
import { Plus } from "lucide-react";
import { useState } from "react";

export const mobileNavHeight = "h-16";

export function MobileNav() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background md:hidden">
                <div className={`grid ${mobileNavHeight} grid-cols-4`}>
                    {navItems.slice(0, 4).map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="flex flex-col items-center justify-center gap-1"
                        >
                            <item.icon className="h-5 w-5 text-foreground" />
                            <span className="text-xs text-foreground">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            <Button
                size="icon"
                className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-coral text-coral-foreground shadow-lg md:hidden hover:bg-coral-hover"
                onClick={() => setOpen(true)}
            >
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add new</span>
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create New</DialogTitle>
                        <DialogDescription>
                            What would you like to create?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            New Recipe
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            New Meal Plan
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            New Grocery Item
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
