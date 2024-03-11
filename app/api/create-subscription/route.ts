import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authConfig"
import { Session } from "next-auth";

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
        const { priceId, email, name, paymentMethodId, id } = await request.json()
        // Get session
        const session: CustomSession | null = await getServerSession(authOptions)
        // If no session, return unauthorized error
        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 })
        }
        // make sure id from request body matches id from session
        if (id !== session.user.id) {
            return Response.json({ message: "Unauthorized" }, { status: 401 })
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    
        // Check for existing customer by email
        const existingCustomers = await stripe.customers.list({
            email: email,
            limit: 1,
        })
        //declare customer
        let customer;
    
        if (existingCustomers.data.length === 0) {
            // Create a new customer if not found
            customer = await stripe.customers.create({
                email: email,
                name: name,
            });
        } else {
            // Use the existing customer
            customer = existingCustomers.data[0];
        }
    
        // Attach the payment method to the customer
        await stripe.paymentMethods.attach(paymentMethodId, {
            customer: customer.id,
        })
    
        // Update customer to set the default payment method
        await stripe.customers.update(customer.id, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        })
    
        // Create the subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price: priceId }],
            expand: ["latest_invoice.payment_intent"],
            default_payment_method: paymentMethodId,
        })
        return Response.json({ subscription })

    } catch (error) {
        return Response.json({ message: "An error occured" }, { status: 500 })
    }
} 