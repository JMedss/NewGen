import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    let data = await request.json()
    let priceId = data.priceId
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1
            }
        ],
        mode: "subscription",
        success_url: "https://www.newgendigitalmedia.com/dashboard",
        cancel_url: "https://www.newgendigitalmedia.com/pricing"
    })

    return NextResponse.json(session.url)
}