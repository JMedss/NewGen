"use client"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import Stripe from "stripe"


type PropTypes = {
    state: boolean,
    setState: (state: boolean) => void,
    subscriptions: Stripe.Subscription[] | undefined | null,
    customerId: string | undefined
}

const CancelSubscriptionModal = ({ state, setState, subscriptions, customerId }: PropTypes) => {
    // Function to handle closing modal
    const handleCloseModal = () => {
        setState(false)
    }

        // useEffect that disables body scroll when modal is open
        useEffect(() => {
            if(state) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
        }, [state])

        // Function to handle canceling subscription
        const handleCancelSubscription = async () => {
            try {
                if(subscriptions && customerId) {
                    // fetch request to cancel subscription
                    const response = await fetch("/api/cancel-subscription", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ subscriptionId: subscriptions[0].id, customerId })
                    })
                    if(response.ok) {
                        toast.success("Subscription Canceled")
                        setState(false)
                    }
                }
            } catch (err) {
                toast.error("Failed to cancel subscription")
            }
        }
  return (
    <div className={state ? "bg-black-primary/40 fixed inset-0 z-50 overflow-y-auto" : "hidden"}>
      <div className='bg-light-blue border flex items-center justify-center border-white-primary/50 rounded-[8px] p-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  min-w-[300px] min-h-[20vh]'>
        <div className='w-full flex flex-col items-center justify-center gap-6'>
            <div className="flex w-full justify-center">
                <p className='text-white font-bold text-[16px] text-center md:text-left md:text-[20px] lg:text-[24px]'>Are you sure you want to cancel your subscription?</p>
            </div>
            <div className='w-full flex flex-col items-center md:flex-row justify-center gap-2'>
                <button className='bg-black-primary/60 text-yellow-primary font-bold w-full py-1.5 rounded-[8px]' onClick={handleCloseModal}>Cancel</button>
                <button className='bg-yellow-primary w-full font-bold text-black-primary py-1.5 rounded-[8px]' onClick={handleCancelSubscription}>Cancel Subscription</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CancelSubscriptionModal
