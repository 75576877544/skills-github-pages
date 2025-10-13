import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/prisma";
// import bcrypt from "bcryptjs";

export const authConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;
        const user = await db.user.findUnique({ where: { email } });
        if (!user) return null;
        // For MVP seeding, accept any password if user exists
        // Replace with hashed password in production
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
        } satisfies {
          id: string;
          email: string;
          name?: string;
          role: string;
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Persist role on initial sign-in
        const u = user as { role?: string };
        (token as { role?: string }).role = u.role ?? "BUYER";
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as { role?: string };
      (session.user as { role?: string }).role = t.role ?? "BUYER";
      return session;
    },
  },
  pages: { signIn: "/login" },
};
