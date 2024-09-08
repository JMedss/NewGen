import Stripe from "stripe";


export async function POST(request: Request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        const allPlans = await stripe.plans.list({
            active: true,
            limit: 20
        });

        const plans = allPlans.data.filter((plan) => {
            return plan.nickname === "Basic Plan" || 
                   plan.nickname === "Basic + Maintenance Plan" || 
                   plan.nickname === "Premium Plan" || 
                   plan.nickname === "Premium + Maintenance Plan";
        });

        return new Response(JSON.stringify(plans), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify([]), { status: 500 });
    }
}