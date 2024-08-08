import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { Backend_URL } from "./Constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username"
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "Password"
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;

        const res = await fetch(Backend_URL + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            username,
            password
          }),
          headers: {
            'Content-Type': "application/json"
          }
        })

        const response = await res.json();
        
        if (res.status != 201) throw new Error(response.message);

        return response;
      },
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn ) return token;

      return await refreshToken(token);
    },
    async session({ token, session, trigger }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
  },
}