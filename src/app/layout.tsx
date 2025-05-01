import { Providers } from "@/components/providers";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Meal Mate",
    description: "Meal Mate - Your Recipe Companion",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased`}>
                <Providers>
                    {/* Temporary placement */}
                    <div className="relative">
                        {children}
                        <div className="absolute top-0 right-0 p-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
