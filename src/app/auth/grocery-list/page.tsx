import { PageHeader } from "@/components/page-header";

const Page = () => {
    return (
        <div className="flex flex-col h-screen gap-4">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                    <PageHeader>Grocery List</PageHeader>
                </div>
            </div>
        </div>
    );
};

export default Page;
