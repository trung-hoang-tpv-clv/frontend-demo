import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authService from "@/service/authService";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        try {
          const userLogIn = await authService.doLogIn({
            email: credentials.email,
            password: credentials.password,
          });
          if (!userLogIn) {
            return null;
          }
          return {
            id: userLogIn.userId,
            name: userLogIn.fullName,
            email: userLogIn.email,
            accessToken: userLogIn.accessToken,
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
        };
      }

      return token;
    },
  },
};

export default NextAuth(authOptions);
