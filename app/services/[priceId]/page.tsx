"use client"
import { useState, useEffect } from "react"
import Checkout from "@/app/components/Checkout";
import ServiceSelectedInfo from "@/app/components/ServiceSelectedInfo";
import Stripe from "stripe";
import toast from "react-hot-toast";



type ParamsType = {
    params: {
        priceId: string
    }
}

type StripePrice = {
    id: string | null
    unit_amount: number | null
    nickname: string | null
}

const CheckoutPage = ({ params }: ParamsType) => {
    const unformattedPriceId = params.priceId
    const priceId = unformattedPriceId.replace("checkout-", "")

    // State for selected service
    const [selectedService, setSelectedService] = useState<StripePrice>({
        id: null,
        unit_amount: null,
        nickname: null
    })
    // fetch services from stripe
    useEffect(() => {
        if(priceId) {
            const fetchServices = async () => {
                try {
                    const response = await fetch("/api/get-services", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    const data = await response.json()

                    if(response.ok) {
                        const selectedService = data.prices.find((price: Stripe.Price) => price.id === priceId)
                        setSelectedService({
                            id: selectedService.id,
                            unit_amount: selectedService.unit_amount,
                            nickname: selectedService.nickname
                        })
                    }
                } catch (error) {
                    toast.error("Error fetching selected service. Please reload the page.")
                }
            }
            fetchServices()
        }
    }, [priceId])

    console.log(selectedService)

  return (
    <main>
        <section className="w-screen min-h-screen flex justify-center">
            <div className="flex flex-col items-center gap-24 md:gap-0 md:flex-row md:items-start justify-between h-full w-[80%] mx-auto my-24">
                <ServiceSelectedInfo price={selectedService} />
                <Checkout price={selectedService} />
            </div>
        </section>
    </main>
  )
}

export default CheckoutPage
