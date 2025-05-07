import { Groups } from "@/components/groups/groups";
import { Group } from "@/db/schema";

const Page = () => {
    const groups: Group[] = [{
        id: "1",
        createdAt: '0',
        description: "descripotion",
        name: "name",
        updatedAt: "",
        deletedAt: null,
    }]
    
    return (
        <div className="flex flex-col h-screen gap-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold">Groups</h1>
            </div>
            <Groups groups={groups} />
        </div>
    );
};

export default Page;
