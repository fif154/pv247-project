import React from 'react';
import { Input } from '../../ui/input';
import { Spinner } from '../../ui/spinner';
import { User } from '@/server/entities/models/user';

type UserSearchProps = {
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailQuery: string;
  users: User[];
  isPending: boolean;
  onUserSelect: (user: User) => void;
};

export const UserSearch = ({
  handleEmailChange,
  emailQuery,
  users,
  isPending,
  onUserSelect,
}: UserSearchProps) => {
  return (
    <div>
      <label htmlFor="userSearch" className="block text-sm font-medium">
        Add Members by Email
      </label>
      <div className="relative">
        <Input
          id="userSearch"
          type="text"
          onChange={handleEmailChange}
          value={emailQuery}
          placeholder="Search users by email"
          className="pr-10"
        />
        {isPending && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Spinner />
          </div>
        )}
      </div>
      {!isPending && users.length === 0 && emailQuery.trim().length > 2 ? (
        <span className="pt-5 p-2 text-gray-500">No users found</span>
      ) : (
        <ul className="mt-2 max-h-40 overflow-y-auto border rounded-md">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-2 hover:bg-gray-800 cursor-pointer"
              onClick={() => onUserSelect(user)}
            >
              {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
