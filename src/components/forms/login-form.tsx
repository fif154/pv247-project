"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GitHubLoginButton from "./github-login-button";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});
type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
    });

    const onSubmit = (data: LoginFormSchema) => {
        console.log(data);
    };

    return (
        <div className={"flex flex-col gap-6 "}>
            <Card className="overflow-hidden shadow-xl bg-background/80 dark:bg-background/50 border border-muted">
                <CardContent className="p-0">
                    <div className="flex flex-col gap-6 p-6 md:p-8">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold">
                                Welcome back!
                            </h1>
                            <p className="text-balance text-muted-foreground">
                                Your meal plans are just a login away.
                            </p>
                        </div>
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    placeholder="email@gmail.com"
                                    required
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-destructive text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <Input
                                    type="password"
                                    required
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-destructive text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </form>

                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <GitHubLoginButton />
                        <div className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                className="underline underline-offset-4"
                                href="sign-up"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
