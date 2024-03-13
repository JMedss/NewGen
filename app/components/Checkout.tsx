"use client"
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useEffect, useState } from "react"
import Link from "next/link"
import { FaStripe } from "react-icons/fa6"
import { Country, State } from 'country-state-city'
import { loadStripe } from "@stripe/stripe-js"
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

type PropType = {
    price: {
        id: string | null
        unit_amount: number | null
        nickname: string | null
    }
}

interface CustomSession extends Session {
    user: {
      id: string,
      name?: string | null,
      email?: string | null,
      image?: string | null
    }
  }




const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)


const CheckoutForm = ({price}: PropType) => {
    let { data: session } = useSession()
    //set session to custom session
    const customSession = session as CustomSession
    const [disabled, setDisabled] = useState(true)
    const [agreement, setAgreement] = useState(false)    
    const [stripeAgreement, setStripeAgreement] = useState(false)
    const [data, setData] = useState({
        id: "",
        name: "",
        email: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        cardholderName: "",
    });
    
    useEffect(() => {
        if (customSession?.user?.id && customSession?.user?.email) {
            setData({
                id: customSession.user.id,
                name: customSession.user.name!,
                email: customSession.user.email!,
                streetAddress: "",
                city: "",
                state: "",
                country: "",
                cardholderName: "",
            })
        }
    }, [customSession?.user?.id, customSession?.user?.email, customSession?.user?.name])


    const stripe = useStripe();
    const elements = useElements();



    // Check if the form is filled out to activate the submit button
    useEffect(() => {

        const isFormFilled = !!(data.name && data.email && data.streetAddress && data.city && data.state && data.country && data.cardholderName)
        const isAgreementChecked = agreement && stripeAgreement
        setDisabled(!(isFormFilled && isAgreementChecked))
    },[agreement, stripeAgreement, data.name, data.email, data.streetAddress, data.city, data.state, data.country, data.cardholderName])

    const CARD_OPTIONS = {
        style: {
            base: {
                color: "#fff",
                fontSize: "16px",
                fontFamily: "Futura PT, sans-serif",
            },
            invalid: {
                color: "#9e2146",
            },
        }
    }


    // Submit the form with the card details
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements ) {
            toast.error("Stripe is not loaded")
            return;
        }
        // logic for processing the payment
        const cardElement = elements.getElement(CardElement)

        if (!cardElement) {
            toast.error("Card details are not entered correctly");
            return;
        }

        try {
            const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card" || "link",
                card: cardElement,
                billing_details: {
                    name: data.cardholderName,
                    email: data.email,
                    address: {
                        line1: data.streetAddress,
                        city: data.city,
                        state: data.state,
                        country: data.country,
                    }
                }
            })
            if (paymentMethodReq.error) {
                toast.error("Card details are not entered correctly");
                return;
            } 
            
            const paymentMethodId = paymentMethodReq.paymentMethod?.id
           
            const res = fetch("/api/create-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priceId: price.id,
                    email: data.email,
                    id: data.id,
                    name: data.name,
                    paymentMethodId: paymentMethodId,
                }),
            })
            .then(async(res) => {
                if (!res.ok) {
                    toast.error("Payment unsuccessful")
                }
                await res.json();
                toast.success("Payment successful")
            })
        } catch (error) {
            toast.error("Error processing payment")
        } finally {
            setData({
                id: data.id,
                name: data.name,
                email: data.email,
                streetAddress: "",
                city: "",
                state: "",
                country: "",
                cardholderName: "",
            })
        }
    }

    return (
            <form onSubmit={handleSubmit} className="w-full min-w-[350px] flex flex-col gap-4">
                <h4 className="font-bold lg:text-[24px] text-white">Billing Address</h4>
                <div className="flex flex-col">
                    <label className="text-[#fee302]" htmlFor="address">Street Address</label>
                    <input
                        className="w-full bg-transparent border-b border-white rounded-md focus:border-none focus:ring-1 focus:ring-[#fee302] text-white shadow-lg shadow-black"
                        id="address"
                        type="text"
                        value={data.streetAddress}
                        onChange={(e) => setData({...data, streetAddress: e.target.value})}
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <div className="flex items-center w-full justify-between gap-2">
                    <div className="flex flex-col w-full">
                        <label className="text-[#fee302]" htmlFor="city">City</label>
                        <input
                            className="w-full bg-transparent border-b border-white rounded-md focus:border-none focus:ring-1 focus:ring-[#fee302] text-white shadow-lg shadow-black"
                            id="city"
                            type="text"
                            value={data.city}
                            onChange={(e) => setData({...data, city: e.target.value})}
                            placeholder="Enter your city"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#fee302]" htmlFor="state">State</label>
                        <select 
                            className="w-full bg-transparent border-b border-white rounded-md focus:border-none focus:ring-1 focus:ring-[#fee302] text-white shadow-lg shadow-black"
                            name="state" 
                            value={data.state}
                            onChange={(e) => setData({...data, state: e.target.value})}
                            id="state">
                           {State.getStatesOfCountry("US").map((state) => (
                                 <option key={state.isoCode} value={state.name}>{state.isoCode}</option>
                           ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col">
                        <label className="text-[#fee302]" htmlFor="country">Country</label>
                        <select 
                            className="w-full country bg-transparent border-b border-white rounded-md focus:border-none focus:ring-1 focus:ring-[#fee302] text-white shadow-lg shadow-black"
                            name="country"
                            value={data.country}
                            onChange={(e) => setData({...data, country: e.target.value})} 
                            id="country">
                           {Country.getAllCountries().map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>{country.isoCode}</option>
                           ))}
                        </select>
                    </div>

                    <h4 className="font-bold lg:text-[24px] text-white my-4">Card Details</h4>


                    <div className="flex flex-col w-full">
                        <label className="text-[#fee302]" htmlFor="cardHolderName">Cardholder Name</label>
                        <input
                            className="w-full bg-transparent border-b border-white rounded-md focus:border-none focus:ring-1 focus:ring-[#fee302] text-white shadow-lg shadow-black"
                            value={data.cardholderName}
                            onChange={(e) => setData({...data, cardholderName: e.target.value})}
                            id="cardHolderName"
                            type="text"
                            placeholder='Enter the name on your card'
                            required
                        />
                    </div>

               

                <div className="flex flex-col">
                    <label className="text-[#fee302]">Card Details</label>
                    <div className='border border-white rounded-md py-3 px-2 shadow-lg shadow-black focus:outline focus:outline-[#fee302]'>
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <div className='flex items-center'>
                        <label className='text-white/80 text-[10px] sm:text-[12px] md:text-[14px]' htmlFor="agreement">
                            <input 
                            className='mr-2 rounded-full w-[12px] h-[12px]'
                            id='agreement'
                            type="checkbox" 
                            checked={agreement}
                            onChange={(e) => setAgreement(!agreement)}
                            />
                            By completing this purchase, you agree to our <Link className="text-[#fee302]" href="/terms-of-use">Terms of Use</Link> and <Link className="text-[#fee302]" href="/privacy-policy">Privacy Policy.</Link> Additionally, you acknowledge that your subscription will be charged to your default payment method monthly. You can manage or cancel your subscription at any time.
                        </label>
                    </div>
                    <div className='flex items-center'>
                        <label className='text-white/80 text-[10px] sm:text-[12px] md:text-[14px]' htmlFor="stripe-agreement">
                            <input 
                            className='mr-2 rounded-full w-[12px] h-[12px]'
                            id='stripe-agreement'
                            type="checkbox" 
                            checked={stripeAgreement}
                            onChange={(e) => setStripeAgreement(!stripeAgreement)}
                            />
                            By completing this purchase, you agree to Stripe&apos;s <Link  className="text-[#fee302]" href="https://stripe.com/legal/consumer">Terms of Service</Link> and <Link className="text-[#fee302]"  href="https://stripe.com/privacy">Privacy Policy.</Link> All card transactions are securely processed through Stripe, a leader in online payment systems, ensuring the highest levels of security and data protection.
                        </label>
                    </div>
                </div>
                <button 
                disabled={disabled}
                className='bg-[#fee302] disabled:border disabled:border-[#fee302] disabled:bg-[#fee302]/0 disabled:hover:scale-100 disabled:hover:translate-y-0 focus:outline-1 focus:outline-white font-bold py-2 px-4 rounded-md shadow-lg shadow-black transition ease-in-out duration-300'
                type="submit" 
                >
                    Pay
                </button>
            </form>
    );
};



const Checkout = ({ price }: PropType) => {  
    return (

            <div className="w-[50%] min-w-[350px] flex flex-col items-center">
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price}/>
                </Elements>
                <div className="flex items-center text-[12px] mt-6 md:hidden">
                    <p className="text-white/60 flex items-center">Powered By <span className="mx-1"> <FaStripe size={40}/></span></p>
                    <div className="bg-white/60 h-[18px] w-[1px]" />
                        <Link href="https://stripe.com/legal/consumer"><p className="text-white/60 mx-1">Stripe&apos;s Terms</p></Link>
                    <div className="bg-white/60 h-[18px] w-[1px]" />
                        <Link href="https://stripe.com/privacy"><p className="text-white/60 mx-1">Stripe&apos;s Privacy</p></Link>
                </div>
            </div>    
  )
}

export default Checkout
