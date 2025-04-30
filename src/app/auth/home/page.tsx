import { signOutAction } from "@/app/(with-animated-bg)/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const Page = async () => {
    const userSession = (await auth())!;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
            <p className="mt-4 text-lg">
                This is the home page of your application.
            </p>
            <p className="mt-4 text-lg">User ID: {userSession.user.id}</p>
            <p className="mt-4 text-lg">User Email: {userSession.user.email}</p>
            <p className="mt-4 text-lg">User Name: {userSession.user.name}</p>
            <p className="mt-4 text-lg">User Image: {userSession.user.image}</p>
            <Button onClick={signOutAction}>Sign out</Button>
        </div>
    );
};

export default Page;
