import { credentialsRegister, credentialsSignIn } from "@/app/(auth)/actions";
import { SignUpFormSchema } from "@/components/forms/sign-up-form";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await credentialsSignIn(data.email, data.password);
    },
    onError: () => {
      showErrorToast("Login failed. Please try again.");
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (data: SignUpFormSchema) => {
      await credentialsRegister(data);
    },
    onError: () => {
      showErrorToast("Registration failed. Please try again.");
    },
    onSuccess: () => {
      showSuccessToast("Registration successful. You are now logged in.");
    },
  });
