import { DefaultSession } from 'next-auth';

export type User = DefaultSession['user'] & {
  id: string;
  groupId: string;
};

declare module 'next-auth' {
  export interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string | null;
    name?: string | null;
    groupId?: string | null;
  }
}
