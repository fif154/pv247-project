'use client';

import { DoorOpen, Pencil, Trash2, User } from 'lucide-react';
import { Card } from '../ui/card';
import { useGetUserGroupsWithMembersQuery } from '@/mutations/groups';

type GroupListProps = {
  userId: string;
};

export const GroupList = ({ userId }: GroupListProps) => {
  const { data, isLoading, error } = useGetUserGroupsWithMembersQuery(userId);
  const groups = data ?? [];
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading groups</p>;
  return (
    <>
      <div className="flex flex-col items-center">
        {groups.map((g) => (
          <Card key={g.id} className="flex flex-row w-full p-5">
            <div className="flex flex-col w-full gap-3">
              <div className="flex justify-between w-full">
                <h2 className="text-xl font-bold">{g.name}</h2>
                <div className="flex gap-5">
                  <Pencil />
                  <DoorOpen />
                  <Trash2 />
                </div>
              </div>

              <span>{g.description}</span>
              <div className="flex gap-3 items-center">
                <User />
                {g.members.length} member{g.members.length > 1 && 's'}
              </div>
              <div className="">
                <span className="text-xs text-gray-500">
                  Created at {g.createdAt}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
