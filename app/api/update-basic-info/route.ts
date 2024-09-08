import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authConfig"
import { Session } from "next-auth";
import prisma from "@/app/libs/prismadb";
import Stripe from "stripe";

interface CustomSession extends Session {
  user: {
    id: string,
    provider?: string,
    name?: string | null,
    email?: string | null,
    image?: string | null
  }
}

// initialize stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY! as string)

export async function POST(request: Request) {
    try {
      // Get the session
        let session = await getServerSession(authOptions) as CustomSession
      // If the user is not authenticated, return 401
        if (!session) {
            return new Response('Unauthorized', { status: 401 })
        }
      // Get the body and deconstruct the request
        const { data , stripeId } = await request.json()
       
      // deconstruct the data
        const { email, name, sessionId } = data
      // // validate the data
        if (!email || !name || !sessionId || !stripeId) {
            return new Response('Missing required fields', { status: 400 })
        }
      // ensure frontend id matches the backend session id
        if (sessionId !== session?.user?.id) {
            return new Response('Unauthorized', { status: 401 })
        }
      // update the user info in stripe
        const stripeCustomer = await stripe.customers.update(stripeId, {
            email,
            name
        })
        
      // update the user info in mongodb
      const customer = await prisma!.user.update({
            where: {
                id: session.user.id
            },
            data: {
                email,
                name
            }
        })
        // return the updated user info
        const updatedInformation = {
            email: customer.email,
            name: customer.name
        }
        return Response.json(updatedInformation, { status: 200 })

    } catch (error) {
        return new Response('Error Updating Info', { status: 400 })
    }
}