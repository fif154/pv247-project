"use client";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">Error</h1>
            <p className="mt-4 text-lg">
                An error occurred while fetching the grocery list.
            </p>
        </div>
    );
};
export default Error;
