import { getServerSession } from "next-auth"
import { Session } from "inspector"
import { authOptions } from "../auth/authConfig"
import Stripe from "stripe"
import prisma from "@/app/libs/prismadb"


interface CustomSession extends Session {
    user: {
      id: string,
      name?: string | null,
      email?: string | null,
      image?: string | null
    }
  }



export async function POST(request: Request) {
    try {
        // Get session
        const session: CustomSession | null = await getServerSession(authOptions)
        // If no session, return unauthorized error
        if (!session) {
            return new Response("Unauthorized" , { status: 401 })
        }
        // Destructure & Validate body 
        const { stripeId, userId, provider } = await request.json()
        if ( !userId || !provider) {
            return new Response("Bad Request", { status: 400 })
        }
        // make sure id from request body matches id from session
        if (userId !== session.user.id) {
            return new Response("Unauthorized", { status: 401 })
        }
        console.log(stripeId, userId, provider)

        // Delete account from stripe & database based on provider
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        if (provider === "google") {
            // Delete account from stripe
            if(stripeId && typeof stripeId === "string") {
            await stripe.customers.del(stripeId)
            }
            // Delete account from database
            await prisma?.account.delete({
                where: {
                    userId: userId
                }
            })
            // Delete user from database
            await prisma?.user.delete({
                where: {
                    id: userId
                }
            })
        } else if (provider === "credentials") {
            // Delete account from stripe
            if(stripeId && typeof stripeId === "string") {
                await stripe.customers.del(stripeId)
                }
        
            // Delete user from database
            await prisma?.user.delete({
                where: {
                    id: userId
                }
            })
        }
        
        return new Response("Account Deleted", { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response("Internal Server Error" , { status: 500 })
    }
}