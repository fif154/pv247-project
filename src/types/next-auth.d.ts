import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: DefaultSession['user'] & {
      id: string;
      groupId: string;
    };
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
