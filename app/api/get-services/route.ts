import Stripe from "stripe";


export async function POST(request: Request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")
        // List services
        const unformmatedPrices = await stripe.prices.list({
            limit: 10,
            active: true
        })

        // pull the correct services
        let prices = unformmatedPrices.data.filter((price) => {
            return price.nickname === "Hosting Plan" || price.nickname === "Hosting & Maintenance Plan";
        })

        prices = prices.reverse()


        return new Response(JSON.stringify({prices}), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({message: "Error"}), { status: 500 })
    }
}