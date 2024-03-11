import prisma from "@/app/libs/prismadb"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/authConfig"
import { Session } from "next-auth"
import bcrypt from 'bcrypt'

interface CustomSession extends Session {
    user: {
      id: string,
      provider?: string,
      name?: string | null,
      email?: string | null,
      image?: string | null
    }
  }

export async function POST(request: Request) {
    try {
        // Get the session
        let session = await getServerSession(authOptions) as CustomSession

        // If the user is not authenticated, return 401
        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }
        // Get the body and deconstruct the request
        const body = await request.json()
        const { sessionId, newPassword, confirmPassword } = body

        // validate the data 
        if (!sessionId || !newPassword || !confirmPassword) {
            return new Response('Missing required fields', { status: 400 })
        }
        // Check if the passwords match
        if (newPassword !== confirmPassword) {
            return new Response('Passwords do not match', { status: 400 })
        }

        // ensure frontend id matches the backend session id
        if (sessionId !== session?.user?.id) {
            return new Response('Unauthorized', { status: 401 })
        }
       
        // hash the password
        const password = await bcrypt.hash(newPassword, 10)

        // update the user password
        await prisma!.user.update({
            where: {
                id: session.user.id
            },
            data: {
                hashedPassword: password
            }
        })

        return new Response("Password changed successfully", { status: 200 })
    
    } catch (error) {
        return new Response('Error changing password', { status: 500 })
    }
}