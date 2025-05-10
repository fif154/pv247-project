import React from 'react';
import { X } from 'lucide-react';
import { UserInfo } from '@/server/entities/models/user';

type SelectedUsersProps = {
  selectedUsers: UserInfo[];
  currentUserId: string;
  onRemoveUser: (userId: string) => void;
};

export const SelectedUsers = ({
  selectedUsers,
  currentUserId,
  onRemoveUser,
}: SelectedUsersProps) => (
  <div>
    <label className="block text-sm font-medium">Selected Members</label>
    <ul className="mt-2 border rounded-md">
      {selectedUsers.map((user) => (
        <li
          key={user.id}
          className="flex items-center justify-between p-2 border-b last:border-b-0"
        >
          <span>{user.email}</span>
          {user.id !== currentUserId && (
            <button
              type="button"
              className="cursor-pointer text-red-500 hover:text-red-700"
              onClick={() => onRemoveUser(user.id)}
            >
              <X />
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
