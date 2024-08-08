import { Backend_URL } from "@/lib/Constants";
import { authOptions } from "@/lib/utils";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }