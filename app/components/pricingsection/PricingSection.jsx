"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"



const PricingSection = () => {
    const [prices, setPrices] = useState({})
    const benefits = [
        { id: 1, text: "Reliable Hosting" },
        { id: 2, text: "Proactive Maintenance" },
        { id: 3, text: "SSL Security" },
        { id: 4, text: "Responsive Support" },
    ]
    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const { data } = await axios.get("/api/getproducts")
        setPrices(data[1])
    }

    const handleSubscription = async (e) => {
        e.preventDefault()
        const { data } = await axios.post("/api/payment",
        {
          priceId: prices.id
        },
        {
          headers: {
            "Content-Type": "application/json", 
          }
        }
        )
        window.location.assign(data)
      }

  return (
    <section className="pb-40">
        <div className='flex flex-col w-[80%] m-auto items-center'>
            <h2>Pricing</h2>
            <div className='bg-[#F1F1F1] shadow-2xl flex flex-col items-center p-6'>
                <h3>{prices.nickname} Plan</h3>
                <div className="mt-4">
                    <h4 className="text-[#fee302] text-[32px]">
                        {(prices.unit_amount / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                        })} / <span className="text-black">PER MONTH</span>
                    </h4>
                </div>
                <div className="my-12">
                    {benefits.map((benefit) => (
                        <div key={benefit.id} className="flex items-center">
                            <Image 
                            src="/bullet.svg"
                            width={20}
                            height={20}
                            alt=""
                            />
                            <p className="pl-1">{benefit.text}</p>
                        </div>
                    ))}
                </div>
                <button onClick={handleSubscription} className="bg-[#fee302] w-[200px] p-2">BUY NOW</button>
            </div>
        </div>
    </section>
  )
}

export default PricingSection
