"use client"
import { useState } from "react"
import toast from "react-hot-toast"

const ResetPassword = () => {

    // state for the email input
    const [email, setEmail] = useState<string>("")

    // state for after the email is sent
    const [emailSent, setEmailSent] = useState<boolean>(false)
    console.log(email)

    type ApiRes = {
        status: number;
        message: string;
    }

    // function to send the email
    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault()
        console.log(email)
        try {
            const res = await fetch("/api/send-reset-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email})
            })
            const data: ApiRes = await res.json()
            if (res.ok) {
                toast.success(data.message)
                setEmailSent(true)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Internal Server Error")
        }
    }

  return (
    <main>
        <section className='h-screen min-h-[500px] overflow-hidden min-w-screen relative flex justify-center items-center'>
            <div className={emailSent ? "hidden" : "-mt-[120px] flex flex-col gap-2 bg-slate-300 rounded-md shadow-lg shadow-black p-6 w-1/2 max-w-[500px] min-w-[300px]"}>
               <form className="flex flex-col gap-2" action="submit" onSubmit={sendEmail}>
                    <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="email" className="block text-sm font-bold leading-6 text-black">
                                Please enter the email associated with your account.
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email || ""}
                                placeholder="Please enter your email address"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                                />
                            </div>
                        </div>
                    <button type="submit" className='block bg-[#fee302] text-black w-full rounded-md py-1.5 text-gray-90a shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-white shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150'>Send Email</button>
               </form>
            </div>

            <div className={emailSent ? "-mt-[120px] flex flex-col gap-2 bg-slate-300 rounded-md shadow-lg shadow-black p-6 w-1/2 max-w-[500px] min-w-[300px]" : "hidden"}>
                <div>
                    <div className="flex items-center justify-between">
                        <p className="font-bold">If an account is assoicated with {email}, then an email has been sent. Please check your email for a reset password link.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default ResetPassword
