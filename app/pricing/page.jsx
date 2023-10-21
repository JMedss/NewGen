"use client"
import PricingCard from "../components/PricingCard"
import { useState, useEffect } from "react"
import axios from "axios"

const Pricing = () => {
    const [prices, setPrices] = useState([])

    useEffect(() => {
        fetchPrices()
    }, [])

    const fetchPrices = async () => {
        const { data } = await axios.get("/api/getproducts")
        setPrices(data)
        console.log(data)
    }

  return (
    <div>
      <h1>NewGen Hosting Plan</h1>
        <div className="flex">
            {prices && prices.map((price) => (
                <PricingCard price={price} key={price.id} />
            ))}
        </div>
    </div>
  )
}

export default Pricing
