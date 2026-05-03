import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";

const adminEmail = process.env.ADMIN_EMAIL ?? "admin@donpaco.com";

async function verifyPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (hash) {
    return bcrypt.compare(plain, hash);
  }
  const plainEnv = process.env.ADMIN_PASSWORD;
  if (!plainEnv) return false;
  return plain === plainEnv;
}

const config = {
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString() ?? "";
        if (!email || !password) return null;
        if (email !== adminEmail.toLowerCase()) return null;
        const ok = await verifyPassword(password);
        if (!ok) return null;
        return {
          id: "admin",
          email: adminEmail,
          name: "Administrador",
          role: "admin" as const,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
        token.sub = user.id ?? "admin";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.sub as string) ?? "admin";
        session.user.role = "admin";
      }
      return session;
    },
    authorized({ request, auth }) {
      const path = request.nextUrl.pathname;
      if (path.startsWith("/admin")) {
        return !!auth?.user;
      }
      if (path === "/login" && auth?.user) {
        return Response.redirect(new URL("/admin/dashboard", request.url));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
