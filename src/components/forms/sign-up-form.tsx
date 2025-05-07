"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterMutation } from "@/mutations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "../ui/spinner";

export const signUpFormSchema = z
    .object({
        firstName: z.string().min(1, {
            message: "First name is required",
        }),
        lastName: z.string().min(1, {
            message: "Last name is required",
        }),
        email: z.string().email(),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
    });

    const router = useRouter();

    const registerMutation = useRegisterMutation();

    const onSubmit = async (data: SignUpFormSchema) => {
        await registerMutation.mutateAsync(data);

        if (!registerMutation.isError) {
            router.replace("/auth/home");
        }
    };

    return (
        <div className={"flex flex-col gap-6 "}>
            <Card className="overflow-hidden shadow-xl bg-background/80 dark:bg-background/50 border border-muted">
                <CardContent className="p-0">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Sign up</h1>
                                <p className="text-balance text-muted-foreground">
                                    Create your account to get started.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName">
                                        First name
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="John"
                                        required
                                        autoCapitalize="words"
                                        {...register("firstName", {
                                            required: "First name is required",
                                        })}
                                    />
                                    {errors.firstName && (
                                        <p className="text-destructive text-sm">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        type="text"
                                        placeholder="Doe"
                                        required
                                        autoCapitalize="words"
                                        {...register("lastName", {
                                            required: "Last name is required",
                                        })}
                                    />
                                    {errors.lastName && (
                                        <p className="text-destructive text-sm">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>
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
                                <Label htmlFor="password">Password</Label>
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
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm password
                                </Label>
                                <Input
                                    type="password"
                                    required
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-destructive text-sm">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? (
                                    <Spinner />
                                ) : (
                                    "Sign up"
                                )}
                            </Button>

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link
                                    className="underline underline-offset-4"
                                    href="/"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
