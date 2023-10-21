import axios from "axios"
import Link from "next/link"

const PricingCard = ({ price }) => {

  const handleSubscription = async (e) => {
    e.preventDefault()
    const { data } = await axios.post("/api/payment",
    {
      priceId: price.id
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
    <div>
      <div className="w-full shadow-lg p-4 h-[150px] flex flex-col items-center gap-3">
        <h2 className="font-bold">{price.nickname}</h2>
        <div>
            <h1 className="font-bold">
                {(price.unit_amount / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                })} / MO
            </h1>
        </div>
        <button className="bg-[#fee302] shadow-md px-4 py-2" onClick={handleSubscription}>BUY NOW</button>
      </div>
    </div>
  )
}

export default PricingCard
