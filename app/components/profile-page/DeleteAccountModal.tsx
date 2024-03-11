"use client"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"


type PropTypes = {
  state: boolean,
  setState: (state: boolean) => void,
    userId: string | undefined,
    stripeId: string | undefined,
    provider: string | undefined
}

const DeleteAccountModal = ({ state, setState, userId, stripeId, provider }: PropTypes) => {
    // disable body scroll when modal is open
    useEffect(() => {
        if(state) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [state])

    const router = useRouter()
    // Function to handle delete account
    const handleDeleteAccount = async () => {
        try {
        if(userId && provider) {
            const res = await fetch("/api/delete-account", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, stripeId, provider })
            })
            if(res.ok) {
                toast.success("Account Deleted")
                setState(false)
                signOut({ redirect: false })
                router.push("/register")
            }
        }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        } 
    }
  return (
    <div className={state ? "bg-white/40 fixed inset-0 z-50 overflow-y-auto" : "hidden"}>
        <div className='bg-gradient-to-r from-[#021628] to-[#00284C] shadow-lg shadow-black rounded-md py-2 px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col min-w-[300px] min-h-[20vh]'>
            <div className='w-full flex justify-end items-center'>
                <button className='text-[#fee302]' onClick={() => setState(false)}>X</button>
            </div>
            <div className='w-full flex flex-col items-center gap-6'>
                <p className='text-white font-bold text-[16px] text-center md:text-left md:text-[20px] lg:text-[24px]'>Are you sure you want to delete your account?</p>
                <div className='w-full flex flex-col items-center md:flex-row justify-center gap-2'>
                    <button className='bg-gray-500 px-0 w-[80%]' onClick={() => setState(false)}>Cancel</button>
                    <button className='bg-[#fee302] px-0 w-[80%]' onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteAccountModal
