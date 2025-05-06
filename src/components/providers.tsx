"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { SidebarProvider } from "./ui/sidebar";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
