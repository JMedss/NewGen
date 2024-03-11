import NextAuth from "next-auth/next";
import prisma from "@/app/libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import type { NextAuthOptions, User, Account } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";


interface CustomSession extends Session {
    user: {
      id: string,
      provider?: string,
      name?: string | null,
      email?: string | null,
      image?: string | null
    }
  }

 const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma ?? new PrismaClient()),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Full Name", type: "text", placeholder: "John Smith" },
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
               // Check if email && password exist
               if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter your email and password")
               }

               // Check if user exists
               const user = await prisma!.user.findUnique({
                    where: { email: credentials.email }
               })

               // If user doesn't exist, throw error
                if (!user || !user?.hashedPassword) {
                      throw new Error("User not found")
                }

                // Check if password is correct
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // If password doesn't match, throw error
                if (!passwordMatch) {
                    throw new Error("Incorrect password")
                }
                return user
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }: { token: JWT, user?: User, account?: Account | null }): Promise<JWT> {
            // on sign in, add user id to token
            if(user) {
                token.id = user.id
                token.provider = account ? account.provider : 'credentials'
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            
            // Get user from token
            const user = await prisma!.user.findUnique({
                where: { id: token.id as string },
            })
            // If user doesn't exist, throw error
            if (!user) {
                throw new Error("User not found");
            }
            // Add user id to session
            const customSession = session as CustomSession; // Type cast to CustomSession
            customSession.user.id = token.id as string; // Ensure token.id is a string
            customSession.user.name = user.name as string;
            customSession.user.email = user.email as string;
            customSession.user.provider = token.provider as string;
            return customSession;
        }
    },
    pages: {
        // change sign in route from /api/auth/signin to /sign-in
        signIn: "/sign-in",
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt" as const,
    },
    debug: process.env.NODE_ENV === "development",
}
    
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }