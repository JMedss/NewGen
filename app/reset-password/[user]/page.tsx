"use client"
import { useState, useEffect } from "react"
import { MdVisibilityOff } from "react-icons/md"
import { MdVisibility } from "react-icons/md"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

type Params = {
    params: {
        user: string
    }
}

const ResetPasswordPage = ({ params }: Params) => {

    const user = params.user
    const router = useRouter()

    // state for the password input
    const [password, setPassword] = useState<string>("")
    // state for the confirm password input
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    // state for password type
    const [passwordType, setPasswordType] = useState<"password" | "text">("password")
    // state for confirm password type
    const [confirmPasswordType, setConfirmPasswordType] = useState<"password" | "text">("password")
    // state for the password visibility
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    // state for the confirm password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false)
    // function to handle the password visibility
    const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }
    }

    // function to handle the confirm password visibility
    const handleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text")
        } else {
            setConfirmPasswordType("password")
        }
    }
    // State for password do not match alert
    const [passwordAlert, setPasswordAlert] = useState<boolean>(false)
    // function to change the password
    const changePassword = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setPasswordAlert(true)
            setTimeout(() => {
                setPasswordAlert(false)
            }, 5000)
            return
        } 
        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: user, password, confirmPassword})
            })
            const data = await res.json()
            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Internal Server Error")
        } finally {
            setPassword("")
            setConfirmPassword("")
            router.push("/sign-in")
        }
    }
  return (
    <main>
        <section className="min-w-screen h-screen min-h-[600px] flex justify-center">
            <div className="w-[60%] min-w-[300px] max-w-[500px] mt-[120px] flex flex-col">
                <h3 className="font-bold text-white text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] mb-4">Please enter your new password.</h3>
                <form className="space-y-6" onSubmit={changePassword}>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#fee302]">
                            New Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                            id="password"
                            name="password"
                            type={passwordType}
                            value={password || ""}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                            required
                            className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                            />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 -right-1 text-[#fee302] hover:-translate-y-1/2">
                                <MdVisibilityOff onClick={handlePasswordVisibility} className={passwordVisible ? "hidden" : "flex"}/>
                                <MdVisibility onClick={handlePasswordVisibility} className={passwordVisible ? "flex" : "hidden"}/>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-[#fee302]">
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2 relative">
                            <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={confirmPasswordType}
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                            />
                            <button type="button" className="absolute top-1/2 -translate-y-1/2 -right-1 text-[#fee302] hover:-translate-y-1/2">
                                <MdVisibilityOff onClick={handleConfirmPasswordVisibility} className={confirmPasswordVisible ? "hidden" : "flex"}/>
                                <MdVisibility onClick={handleConfirmPasswordVisibility} className={confirmPasswordVisible ? "flex" : "hidden"}/>
                            </button>
                        </div>
                    </div>
                    
                    <div className={passwordAlert ? "bg-red-500 py-2 px-1 rounded-md" : "hidden"}>
                        <p className="text-white">Passwords do not match. Please try again.</p>
                    </div>

                    <button type="submit" className='block bg-[#fee302] text-black w-full rounded-md py-1.5 text-gray-90a shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-white shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150'>Change Password</button>
                </form>
            </div>
        </section>
    </main>
  )
}

export default ResetPasswordPage
