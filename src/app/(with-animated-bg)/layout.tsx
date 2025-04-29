export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-lg h-full">
                    <div className="animate-blob opacity-80 blur-2xl absolute left-[30%] top-[45%] transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-300 dark:bg-purple-500" />
                    <div className="animate-blob animation-delay-1000 opacity-80 blur-2xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-300 dark:bg-cyan-500" />
                    <div className="animate-blob animation-delay-2000 delay-1000 opacity-80 blur-2xl absolute left-[70%] top-[60%] transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-300 dark:bg-emerald-500" />
                    <div className="animate-blob animation-delay-2000 delay-1000 opacity-80 blur-2xl absolute left-[75%] top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-l-indigo-300 dark:bg-indigo-500" />
                </div>
            </div>

            <div className="relative z-10">{children}</div>
        </div>
    );
}
