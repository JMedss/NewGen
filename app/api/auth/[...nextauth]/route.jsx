import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
         GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // check if email and password is there
                if(!credentials.email || !credentials.password) {
                    throw new Error("Please enter email and password")
                }

                // check if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // if no user is found

                if (!user || !user.hashedPassword) {
                    throw new Error("No user found")
                }

                // check if passwords match
                const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if passwords dont match
                if(!passwordsMatch) {
                    throw new Error("Incorrect Password")
                }

                return user
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }