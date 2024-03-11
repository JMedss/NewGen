import { headers } from "next/headers"
import Stripe from "stripe"
import sgMail from "@sendgrid/mail"
import { MailDataRequired } from "@sendgrid/mail"

const sendApiKey = process.env.SENDGRID_API_KEY || ""
sgMail.setApiKey(sendApiKey)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
let message: MailDataRequired

export async function POST(request: Request) {
    const body = await request.text()
    const sig = headers().get('stripe-signature') ?? ""

    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(
            body, 
            sig, 
            process.env.STRIPE_WEBHOOK_SECRET || ""
        )

    } catch (err) {
        return new Response(`Webhook Error: ${err instanceof Error ? err.message : 'Unkown Error'}`, { status: 400 })
    }

    // Handle the events 

    if(event.type === 'customer.subscription.created') {
        try {
            const subscription = event.data.object as Stripe.Subscription
            const customer = await stripe.customers.retrieve(subscription.customer as string)


            // make sure it is not deleted customer so they have a name and email
            if('email' in customer && customer.email) {
                //get subscription name 
                const items = subscription.items.data
                let subscriptionName = ""
                if(items.length > 0) {
                    console.log("Items:", items)
                    subscriptionName = items[0].price.nickname!
                }
                let emailHtml = ""
                if(customer.name) {
                    emailHtml = `<p>${customer.name}, you have successfully subscribed to NewGen Digital Media's ${subscriptionName}. Manage you subscription anytime <a href="https://www.newgendigitalmedia.com/profile">here</a>.</p>`
                } else {
                    emailHtml = `<p>You have successfully subscribed to NewGen Digital Media's ${subscriptionName}. Manage you subscription anytime <a href="https://www.newgendigitalmedia.com/profile">here</a>.</p>`
                }

                const message = {
                    to: customer.email, 
                    from: 'subscriptions@newgendigitalmedia.com', 
                    subject: 'NewGen Digital Media Subscription Created',
                    text: customer.name ? `${customer.name}, you have successfully subscribed to NewGen Digital Media's ${subscriptionName}. Manage your subscription anytime here.` : `You have successfully subscribed to NewGen Digital Media's ${subscriptionName}. Manage your subscription anytime here.`,
                    html: emailHtml,
                  }
                await sgMail.send(message)
            }
            return new Response("ok", { status: 200 })
           
        } catch (err) {
            return new Response("Error sending email", { status: 400 })
        }
    }

    if(event.type === "invoice.payment_succeeded") {
        try {
            const invoice = event.data.object as Stripe.Invoice
            const customer = await stripe.customers.retrieve(invoice.customer as string)
            console.log("Customer:", customer)
            console.log("Invoice:", invoice)
            if (invoice.lines.data.length > 0) {
                
            }
            // make sure it is not deleted customer so they have a name and email
            if("email" in customer && customer.email) {

               const startDate = invoice.lines.data[0].period.start
               const endDate = invoice.lines.data[0].period.end
                const periodStartDate = new Date(startDate * 1000).toLocaleDateString()
                const periodEndDate = new Date(endDate * 1000).toLocaleDateString()

                const message = {
                    to: customer.email, 
                    from: 'subscriptions@newgendigitalmedia.com',
                    subject: 'Payment Successful',
                    text: customer.name ? `${customer.name}, your payment for the period ${periodStartDate} to ${periodEndDate} was successful. Manage your subscription anytime here.` : `Your payment for the period ${periodStartDate} to ${periodEndDate} was successful. Manage your subscription anytime here.`,
                    html: customer.name ? `<p>${customer.name}, your payment for the period ${periodStartDate} to ${periodEndDate} was successful. Manage you subscription anytime <a href="https://www.newgendigitalmedia.com/profile">here</a>.</p>` : `<p>Your payment for the period ${periodStartDate} to ${periodEndDate} was successful. Manage you subscription anytime <a href="https://www.newgendigitalmedia.com/profile">here</a>.</p>`,
                }
                await sgMail.send(message)
            }
            return new Response("ok", { status: 200 })
        } catch (err) {
            return new Response("Error sending email", { status: 400 })
        }
    }

    return new Response("ok", { status: 200 })
}