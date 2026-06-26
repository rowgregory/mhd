import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  session: { strategy: "database" },
  callbacks: {
    // Only allow sign-in if a user row exists AND their role is SUPER_USER.
    async signIn({ user }) {
      const existing = await prisma.user.findUnique({
        where: { email: user.email! },
      });
      return !!existing;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role ?? null; // no cast needed now
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
