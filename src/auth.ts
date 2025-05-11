import Credentials from '@auth/core/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import GitHub from 'next-auth/providers/github';
import { db } from './db';
import { getInjection } from './server/di/container';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
        register: {},
        firstName: {},
        lastName: {},
        confirmPassword: {},
      },
      authorize: async (credentials) => {
        let user = null;

        if (credentials.register) {
          const registerController = getInjection('IRegisterController');

          user = await registerController(credentials);
        } else {
          const signInController = getInjection('ISignInController');
          user = await signInController(credentials);
        }

        if (!user) {
          throw new Error('Invalid credentials.');
        }

        return {
          id: user.id,
          email: user.email ?? '',
          name: user.name ?? '',
          image: user.image ?? null,
          groupId: user.groupId ?? null,
        };
      },
    }),
  ],
  events: {
    createUser: async (message) => {
      const { user } = message;
      const registerController = getInjection('IRegisterController');
      await registerController(
        {
          email: user.email,
          name: user.name,
          image: user.image,
        },
        true
      );
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.groupId = token.groupId as string;
      }

      if (session.user.groupId) {
        return session;
      }

      const userRepo = getInjection('IUsersRepository');
      const user = await userRepo.getUser(session.user.id);
      if (!user) {
        throw new Error('User not found');
      }

      session.user.groupId = user.groupId!;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  jwt: {
    encode,
    decode,
  },
});
