import { getServerSession } from "next-auth"
import { Session } from "next-auth";
import { authOptions } from "../auth/authConfig"
import Stripe from "stripe";

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
            return new Response("Unauthorized", { status: 401 })
        }
        // Destructure request body
        const { customerId, paymentMethodId, subscriptionId, customerStripeId  } = await request.json()
        // Ensure customer id from request body matches customer id from session
        if (customerId !== session.user.id) {
            return new Response("Unauthorized", { status: 401 })
        }

        // Create a new stripe instance
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        // Attach payment method to customer
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customerStripeId
        })

        // Update default payment method for customer
        await stripe.customers.update(customerStripeId, {
            invoice_settings: {
                default_payment_method: paymentMethodId
            }
        })

        // Update default payment method for subscription
        await stripe.subscriptions.update(subscriptionId, {
            default_payment_method: paymentMethodId
        })
        return new Response("Payment method updated", { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response("Error updating payment method", { status: 500 })
    }
}