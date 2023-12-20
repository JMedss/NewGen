"use client"
import { useRouter } from "next/navigation"

const Buttons = () => {
  const router = useRouter()
  return (
    <div className="mt-8 flex gap-2">
        <button className="bg-[#fee302] min-w-[200px] max-w-[550px] py-2">Services</button>
        <button className="bg-[#fee302] min-w-[175px] max-w-[550px] py-2">Pricing</button>
    </div>
  )
}

export default Buttons
