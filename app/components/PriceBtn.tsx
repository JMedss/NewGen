"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { IoClose } from "react-icons/io5"

type ButtonProps = {
    priceId: string

  }



const PriceBtn = ({ priceId }: ButtonProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  // controls modal if user is not signed in
  const [active, setActive] = useState<boolean>(false)




  const handleClick = async (e: any, priceId: string) => {
    e.preventDefault()
    if(status === "unauthenticated") {
      // pop up modal if user is not signed in
      setActive(true)
    } else {
      // otherwise push them to checkout
      const url = `/services/checkout-${priceId}` 
      router.push(url)
    }
  }

  // handle signed out users if they click the button on the modal to sign in or register
  const handleSignedOut = (e: any, url: string) => {
    e.preventDefault()
    router.push(url)
  }


  return (
    <>
      <button 
      onClick={(e) => handleClick(e, priceId)}
      className="bg-gradient-to-r from-[#fee302]/60 to-[#fee302]">
          SUBSCRIBE
      </button>


      {/* Modal */}


      <div className={active ? "fixed top-0 left-0 z-50 w-screen h-screen bg-black/40" : "hidden"}>
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  bg-gradient-to-r from-slate-400 to-slate-500 flex flex-col p-4 gap-2 anim shadow-lg shadow-black">
            <div className="w-full flex justify-end">
              <IoClose className="text-2xl cursor-pointer text-[#fee302] hover:-translate-y-1 transition ease-in-out" onClick={() => setActive(false)}/>
            </div>
            <div>
              <p className="w-[300px] font-bold text-white text-center">You must be signed in to subscribe. Please sign in or register an account.</p>
            </div>
            <div className="flex flex-row items-center justify-between">
              <button onClick={(e) => handleSignedOut(e, "/sign-in")} className="outline-black bg-gradient-to-r from-[#fee302]/60 to-[#fee302] shadow-md shadow-black/30">Sign In</button>
              <button onClick={(e) => handleSignedOut(e, "/register")} className="outline-black bg-gradient-to-r from-[#fee302]/60 to-[#fee302] shadow-md shadow-black/30">Register</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default PriceBtn
