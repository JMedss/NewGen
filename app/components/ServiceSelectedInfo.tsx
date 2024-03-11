"use client"
import { TiArrowBack } from "react-icons/ti"
import { FaStripe } from "react-icons/fa6"
import Link from "next/link"
import { useRouter } from "next/navigation"


type PropType = {
    price: {
        id: string | null
        unit_amount: number | null
        nickname: string | null
    }
}

const ServiceSelectedInfo = ({price}: PropType ) => {
    const router = useRouter()
  return (
    <div className="flex flex-col h-full items-center">
        <button onClick={() => router.push("/services")} className="flex items-center">
            <TiArrowBack className="text-[#fee302]"/>
            <p className="text-[#fee302]">Go Back</p>
        </button>
        <div className="flex flex-col mt-4">
            <h3 className="text-white font-bold">Subscribe to {price.nickname}</h3>
            <p className="font-bold text-2xl text-[#fee302]">${(price.unit_amount! / 100).toFixed(2)}/MO</p>
            <div className="hidden md:flex items-center text-[12px] mt-6">
                <p className="text-white/60 flex items-center">Powered By <span className="mx-1"> <FaStripe size={40}/></span></p>
                <div className="bg-white/60 h-[18px] w-[1px]" />
                  <Link href="https://stripe.com/legal/consumer"><p className="text-white/60 mx-1">Stripe&apos;s Terms</p></Link>
                <div className="bg-white/60 h-[18px] w-[1px]" />
                  <Link href="https://stripe.com/privacy"><p className="text-white/60 mx-1">Stripe&apos;s Privacy</p></Link>
            </div>
        </div>
    </div>
  )
}

export default ServiceSelectedInfo
