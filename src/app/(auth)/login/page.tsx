import { auth } from "@/auth";
import { LoginForm } from "@/components/forms/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const userSession = await auth();

  if (userSession) {
    return redirect("/auth/home");
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
