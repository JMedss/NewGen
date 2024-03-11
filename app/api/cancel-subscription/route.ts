import { getServerSession } from "next-auth"
import { Session } from "inspector"
import { authOptions } from "../auth/authConfig"
import Stripe from "stripe"



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
        const { subscriptionId, customerId } = await request.json()
        if (!subscriptionId || !customerId) {
            return new Response("Bad Request", { status: 400 })
        }
        // make sure id from request body matches id from session
        if (customerId !== session.user.id) {
            return new Response("Unauthorized", { status: 401 })
        }
        // Cancel subscription
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

        await stripe.subscriptions.cancel(subscriptionId)

        return new Response("Subscription Canceled", { status: 200 })
    } catch (err) {
        console.error(err)
        return new Response("Internal Server Error" , { status: 500 })
    }
}