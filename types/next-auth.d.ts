import NextAuth from "next-auth"
import {
  type DefaultSession,
  type DefaultUser,
} from "next-auth";   

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
  interface User extends DefaultUser {
    accessToken: string;
  }
}