"use server";

import { signIn, signOut } from "@/auth";
import { SignUpFormSchema } from "@/components/forms/sign-up-form";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const githubSignIn = async () => {
    await signIn("github");
};

export const credentialsSignIn = async (email: string, password: string) => {
    try {
        await signIn("credentials", {
            email,
            password,
        });
    } catch (error) {
        // https://github.com/nextauthjs/next-auth/discussions/9389
        if (!isRedirectError(error)) {
            throw error;
        }
    }
};

export const credentialsRegister = async (data: SignUpFormSchema) => {
    try {
        await signIn("credentials", {
            ...data,
            register: true,
        });
    } catch (error) {
        // https://github.com/nextauthjs/next-auth/discussions/9389
        if (!isRedirectError(error)) {
            throw error;
        }
    }
};

export const signOutAction = async () => {
    await signOut();
};
