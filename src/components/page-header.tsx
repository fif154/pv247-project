import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const PageHeader = ({
    className,
    children,
}: { className?: string } & PropsWithChildren) => (
    <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>
);
