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
        <Groups groups={groups} />
    );
};

export default Page;
