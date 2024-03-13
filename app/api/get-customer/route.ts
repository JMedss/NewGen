import Stripe from "stripe"
import { Session } from "next-auth"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/authConfig"


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
        // Get the session
        const session: CustomSession | null = await getServerSession(authOptions)
        // If no session, return unauthorized error
        if (!session) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
        }
        // Get the body and deconstruct the request
        const { sessionEmail, sessionId } = await request.json()

        // ensure sessionId matches the session id from backend
        if (sessionId !== session.user.id) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
        }
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
        // get the customer info from stripe
        const customer = await stripe.customers.list({
            email: sessionEmail,
            limit: 1
        })

        // if no customer found, return error
        if(customer.data.length === 0) {
            return new Response(JSON.stringify({message: "No customer found"}), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            })
        }

        // get subscriptions for the customer
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.data[0].id,
            status: "active"
        })

        if(subscriptions.data.length !== 0) {
                // get the default payment method for the customer
            const defaultPaymentMethodID = subscriptions.data[0].default_payment_method
            // declare a variable to hold the card
            let card: {} = {
                type: "",
                brand: "",
                last4: "",
                exp_month: "",
                exp_year: "",
                linkUrl: ""
            }

            // ensure the id is a string
            if(typeof defaultPaymentMethodID === "string") {
                const cardInfo = await stripe.paymentMethods.retrieve(defaultPaymentMethodID)
                if(cardInfo.type === "link") {
                    const billingPortalLink = await stripe.billingPortal.sessions.create({
                        customer: customer.data[0].id,
                        return_url: "https://www.newgendigitalmedia.com/profile"
                    })
                    card = {
                        type: "link",
                        brand: undefined,
                        last4: undefined,
                        exp_month: undefined,
                        exp_year: undefined,
                        linkUrl: billingPortalLink.url
                    }
                } else if(cardInfo.type === "card") {
                    card = {
                        type: "card",
                        brand: cardInfo.card?.brand,
                        last4: cardInfo.card?.last4,
                        exp_month: cardInfo.card?.exp_month,
                        exp_year: cardInfo.card?.exp_year,
                        linkUrl: undefined
                    }
                }
            }

            // get latest invoice
            let invoice: string | null | undefined
            const latestInvoiceId = subscriptions.data[0].latest_invoice
            if(typeof latestInvoiceId === "string") {
                const invoiceInfo = await stripe.invoices.retrieve(latestInvoiceId)
                invoice = invoiceInfo.hosted_invoice_url
            }

            // return the customer, card, subscription info, & latest invoice url
            const payload = {
                customer: customer.data[0],
                subscriptions: subscriptions.data,
                cardInfo: card,
                latestInvoice: invoice
            }
            return new Response(JSON.stringify(payload), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            })
        }
        // if no subscriptions found send only the customer info
        return new Response(JSON.stringify({customer: customer.data[0]}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 200
        })
        
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({error: "Error getting customer"}), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 500
        })
    }
}