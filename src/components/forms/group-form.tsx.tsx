"use client";

import { fetchUsers } from "@/app/groups";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const groupFormSchema = z.object({
    name: z.string().min(3),
    description: z.string(),
    members: z.array(z.string().email()),
});
type GroupFormSchema = z.infer<typeof groupFormSchema>;

export function GroupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<GroupFormSchema>({
        resolver: zodResolver(groupFormSchema),
    });

    const onSubmit = (data: GroupFormSchema) => {
        console.log(data);
    };

    const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
    const [members, setMembers] = useState([/*TODO: current user*/"user"]);

    return (
        <div className={"flex flex-col gap-6 "}>
            <Card className="overflow-hidden shadow-xl bg-background/80 dark:bg-background/50 border border-muted">
                <CardContent className="p-0">
                    <form
                        className="p-6 md:p-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    New group?
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Just few details
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    placeholder="My Awesome Group"
                                    required
                                    {...register("name", {
                                        required: "Group Name is required",
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-destructive text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    placeholder="Group of awesome people!"
                                    {...register("description", {
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-destructive text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="members">Members</Label>
                                </div>
                                <Input
                                    type="members"
                                    required
                                    {...register("members")}
                                    onChange={async (e) => setFetchedUsers(await fetchUsers({query: e.target.value}))}
                                />
                                {errors.members && (
                                    <p className="text-destructive text-sm">
                                        {errors.members.message}
                                    </p>
                                )}
                                <div className="mt-4 space-y-2">
                                    {fetchedUsers.map((item, idx) => (
                                    <div key={idx} className="p-4 border rounded">
                                        {item.name}
                                    </div>
                                    ))}
                                </div>
                                <ul>
                                    {
                                        members.map(m =>
                                            <li key={m}>{m}</li>
                                        )
                                    }
                                </ul>
                            </div>
                            <Button type="submit" className="w-full">
                                Create
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
