'use client';

import { DoorOpen, Pencil, Trash2, User } from "lucide-react";
import { Card } from "../ui/card";
import { Group } from "@/db/schema";

type GroupsProps = {
    groups: Group[];
}

export const Groups = ({groups} : GroupsProps) => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">
                My Groups
            </h1>
            {
                groups.map(g => 
                    <Card key={g.id} className="flex flex-row w-1/2 p-5">
                        <div className="w-1/2">
                            <div className="">
                                <span className="text-xs text-opacity-50 text-gray-300">Group Name</span>
                                <h2 className="text-xl font-bold">
                                    {g.name}
                                </h2>
                            </div>
                            <div className="">
                                <span className="text-xs text-opacity-50 text-gray-300">Description</span>
                                <div>{g.description}</div>
                            </div>
                            <div className="">
                                <span className="text-xs text-gray-500">Created at {g.createdAt}</span>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 gap-6">
                            <div className="flex justify-end gap-5">
                                <Pencil />
                                <DoorOpen />
                                <Trash2 />
                            </div>
                            <div className="flex">
                                <User />
                            </div>
                        </div>
                        
                    </Card>
                )
            }
        </div>
    )
}