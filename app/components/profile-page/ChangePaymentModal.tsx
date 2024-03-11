"use client"
import { useState, useEffect } from "react"
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js"
import toast from "react-hot-toast"
import { Country, State } from 'country-state-city'
import Stripe from "stripe"

type Proptypes = {
    state: boolean,
    setState: (state: boolean) => void,
    customerStripeId: string | undefined,
    customerId: string | undefined,
    subscriptions: Stripe.Subscription[] | undefined | null
}



const ChangePaymentModal = ({ state, setState, customerStripeId, customerId, subscriptions }: Proptypes) => {
    const stripe = useStripe()
    const elements = useElements()
    // State for subscriptionId
    const [subscriptionId, setSubscriptionId] = useState<string>("")
    // UseEffect to set the subscriptionId
    useEffect(() => {
        if(subscriptions) {
            setSubscriptionId(subscriptions[0].id)
        }
    }, [subscriptions])
    // State to hold form data
    const [data, setData] = useState({
        id: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        cardholderName: "",
    })
    // useEffect to set the data.id to customerId
    useEffect(() => {
        setData({...data, id: customerId || ""})
    }, [customerId])

    // useEffect that disables body scroll when modal is open
    useEffect(() => {
        if(state) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [state])



    // Options for styling the card element
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

    // State to clear card element
    const [cardElementKey, setCardElementKey] = useState(Date.now())

    // Function to handle closing the modal
    const handleClose = () => {
        setState(false)
        setData({
            ...data,
            streetAddress: "",
            city: "",
            state: "",
            country: "",
            cardholderName: "",
        })
        // clear card element
        setCardElementKey(Date.now())
    }

    // Function to handle the form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
             // Check if stripe and elements are available
        if (!stripe || !elements) {
            toast.error("Stripe was unable to load.")
            return
        }
        // get card element
        const cardElement = elements.getElement(CardElement)

        // if no card element, return error
        if (!cardElement) {
            toast.error("Card details are not entered correctly");
            return;
        }
        // create payment method
       const paymentMethod = await stripe.createPaymentMethod({
            type: "card" || "link",
            card: cardElement,
            billing_details: {
                name: data.cardholderName,
                address: {
                    line1: data.streetAddress,
                    city: data.city,
                    state: data.state,
                    country: data.country
                }
            }
        })
        // if error, return error
        if (paymentMethod.error) {
            toast.error("Card details are not entered correctlyCard details are not entered correctly")
            return
        }
        const paymentMethodId = paymentMethod.paymentMethod?.id

        // initialize subscriptionId & make sure subscriptions are available
        if(!subscriptionId || !subscriptions) return

        // update the payment method
        const response = await fetch("/api/update-payment-method", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ customerId, paymentMethodId, subscriptionId, customerStripeId })
        })
        // if error, return error
        if (!response.ok) {
            toast.error("Error updating payment method")
            return
        }
        // if successful, return success
        toast.success("Payment method updated")
        } catch (err) {
            toast.error("Error updating payment method")
        } finally {
            handleClose()
        }
    }
  

    // state to disable button
    const [disable, setDisable] = useState(true)

    // state for card element
    const [cardFilledOut, setCardFilledOut] = useState(false)

    // useEffect to check if data is filled
    useEffect(() => {
        const isDataFilled = data.streetAddress && data.city && data.state && data.country
        setDisable(!(isDataFilled && cardFilledOut))
    }, [data, cardFilledOut])


  return (
    <div className={state ? "bg-white/40 fixed inset-0 z-50 overflow-y-auto" : "hidden"}>
      <div className="absolute bg-gradient-to-r from-[#021628] to-[#00284C] shadow-lg shadow-black rounded-md py-2 px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] min-w-[320px] max-w-[600px] max-h-[90vh] flex flex-col items-center overflow-y-auto">
            <div className="flex flex-col w-full min-h-full">
                <div className="w-full flex justify-end my-2">
                    <button onClick={handleClose}>X</button>
                </div>
                <div className="w-full flex justify-center mb-4">
                    <h3 className="text-white font-bold text-[24px]">Please enter your card information.</h3>
                </div>
                    <form onSubmit={handleSubmit} className="w-full min-w-[300px] flex flex-col gap-4">
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
                                id="state"
                                required
                                >
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
                                id="country"
                                required
                                >
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
                        <div key={cardElementKey} className='border border-white rounded-md py-3 px-2 shadow-lg shadow-black focus:outline focus:outline-[#fee302]'>
                            <CardElement onChange={(event) => setCardFilledOut(event.complete)} options={CARD_OPTIONS} />
                        </div>
                    </div>
                    <button 
                    disabled={disable}
                    className='bg-[#fee302] disabled:border disabled:border-[#fee302] disabled:bg-[#fee302]/0 disabled:hover:scale-100 disabled:hover:translate-y-0 focus:outline-1 focus:outline-white font-bold py-2 px-4 rounded-md shadow-lg shadow-black transition ease-in-out duration-300'
                    type="submit" 
                    >
                        ADD CARD
                    </button>
                </form>     
            </div>
      </div>
    </div>
  )
}

export default ChangePaymentModal
