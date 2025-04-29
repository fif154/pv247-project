"use server";

import { signIn } from "@/auth";

export const githubSignIn = async () => {
    await signIn("github");
};
