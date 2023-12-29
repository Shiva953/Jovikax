import NextAuth from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions";

export const handler = NextAuth(authOptions); //adding github oauth in next auth options

export { handler as GET, handler as POST };