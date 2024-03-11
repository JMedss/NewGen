"use client"
import { useState, useEffect } from "react"
import Benefits from "../components/Benefits"
import PriceBtn from "../components/PriceBtn"
import toast from "react-hot-toast"
import Stripe from "stripe"



const Services = () => {

  // State for services
  const [prices, setPrices] = useState<Stripe.Price[]>()
  // fetch services from stripe
  useEffect(() => {
    try {
      const fetchServices = async () => {
        const response = await fetch("/api/get-services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        if(response.ok) {
          setPrices(data.prices)
        }
      }
      fetchServices()
    } catch (error) {
      toast.error("Error fetching services")
    }  
  }, [])


  return (
    <main>
        <section className='min-h-screen w-screen relative'>
            <div className='flex flex-col items-center'>
                <h2 className='my-12'>Services</h2>
                <div className='flex flex-wrap gap-4 items-center justify-center'>
                    {prices && prices.length > 0 && prices.map((price) => (
                      <div 
                      className="flex flex-col items-center gap-2 bg-gradient-to-r from-[#021628] to-[#00284C] border border-[#fee302] w-[250px] md:w-[350px] h-full min-h-[350px] px-4 py-6 shadow-xl shadow-black rounded-md"
                      key={price.id}>
                        <h3 className="font-bold text-white text-[14px] sm:text-[16px] lg:text-[22px]">{price.nickname}</h3>
                        <span><p className="font-bold text-[#fee302] text-[12px] sm:text-[14px] lg:text-[18px]">{(price.unit_amount! / 100 ).toLocaleString("en-us", {
                          style: "currency",
                          currency: "USD",
                        })} / MO
                        </p></span>
                        <Benefits priceNickname={price.nickname} />
                        <PriceBtn priceId={price.id} /> 
                      </div>
                    ))}
                </div>
            </div>
        </section>
    </main>
  )
}

export default Services 
