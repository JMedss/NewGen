"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc"
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"

const RegisterForm = () => {
    interface Data {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    const [data, setData] = useState<Data>({
        name:  "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const router = useRouter()

    // Types for passwords 
    const [passwordType, setPasswordType] = useState<"password" | "text">("password")
    // Types for confirm passwords
    const [confirmPasswordType, setConfirmPasswordType] = useState<"password" | "text">("password") 
    // state for password visibility
    const [newPasswordVisible, setNewPasswordVisible] = useState(false)
    // state for confirm password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    // state for passwords do not match alert
    const [passwordAlert, setPasswordAlert] = useState(false)
    // function to handle confirm password visibility
    const handleConfirmPassword = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
        setConfirmPasswordType(confirmPasswordVisible ? "password" : "text")
    }
    // function to handle password visibility
    const handlePasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible)
        setPasswordType(newPasswordVisible ? "password" : "text")
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validChars = e.target.value.replace(/[^a-zA-Z\s\-]/, '')
        setData({...data, name: validChars})
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, email: e.target.value})
    }

    interface ApiResponse {
        status: string;
        message: string;
    }


        const registerUser = async (e: React.FormEvent<HTMLFormElement>) : Promise<ApiResponse | void> => {
            e.preventDefault()
            if (data.password !== data.confirmPassword) {
                setPasswordAlert(true)
                setTimeout(() => {
                    setPasswordAlert(false)
                }, 5000)
                return
            } 
            try {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })

                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                toast.success("User registered successfully")
                router.push("/sign-in")
            } catch (err) {
                toast.error("Error registering user")
            } finally {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                })
            }
        }


  return (
    <div className="flex min-h-full flex-col justify-center py-12 w-[80%] mx-auto">

            <h2 className="text-white text-center">
                Register An Account
            </h2>


        <div className="mt-10 mx-auto w-full min-w-[150px] max-w-[450px]">
            <form className="space-y-6" onSubmit={registerUser}>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-[#fee302]">
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={data.name || ""}
                        onChange={handleNameChange}
                        required
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#fee302]">
                        Email address
                    </label>
                    <div className="mt-2">
                        <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={data.email || ""}
                        onChange={handleEmailChange}
                        required
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#fee302]">
                        Password
                        </label>
                    </div>
                    <div className="mt-2 relative z-0">
                        <input
                        id="password"
                        name="password"
                        type={passwordType}
                        autoComplete="current-password"
                        value={data.password || ""}
                        onChange={(e) => setData({...data, password: e.target.value})}
                        required
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                        />
                        <button type="button" onClick={handlePasswordVisibility} className="absolute z-50 top-1/2 -right-2 -translate-y-1/2 text-[#fee302] hover:-translate-y-1/2">
                            <MdVisibility className={newPasswordVisible ? "flex" : "hidden"} />
                            <MdVisibilityOff className={newPasswordVisible ? "hidden" : "flex"} />
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
                        value={data.confirmPassword || ""}
                        onChange={(e) => setData({...data, confirmPassword: e.target.value})}
                        required
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-md outline-none focus:outline-none focus:ring-[1.8px] focus:ring-[#fee302] shadow-black focus:scale-105 focus:shadow-lg focus:shadow-black focus:translate-x-2 placeholder:text-gray-400 sm:text-sm sm:leading-6 transition-all ease-in-out duration-150"
                        />
                            <button type="button" onClick={handleConfirmPassword} className="absolute z-50 top-1/2 -right-2 -translate-y-1/2 text-[#fee302] hover:-translate-y-1/2">
                            <MdVisibility className={confirmPasswordVisible ? "flex" : "hidden"} />
                            <MdVisibilityOff className={confirmPasswordVisible ? "hidden" : "flex"} />
                            </button>
                    </div>
                </div>
                
                <div className={passwordAlert ? "bg-red-500 py-2 px-1 rounded-md" : "hidden"}>
                    <p className="text-white">Passwords do not match. Please try again.</p>
                </div>

                <div className="flex flex-col w-full">
                    <button
                        type="submit"
                        className="flex w-full bg-gradient-to-r from-[#fee302]/60 to-[#fee302] justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white hover:translate-x-2 outline-none focus:ring-2 focus:ring-[#fff] focus:scale-105 focus:translate-x-2"
                        >
                        Sign Up
                    </button>
                </div>
            </form>
            <button
                onClick={() => signIn("google", {callbackUrl: "http://localhost:3000/dashboard"})}
                className="relative shadow-md shadow-black mt-4 flex justify-center w-full bg-black rounded-md px-3 py-1.5 text-sm font-semibold text-white hover:translate-x-2 outline-none focus:ring-2 focus:ring-[#fff] focus:scale-105 focus:translate-x-2 focus:shadow-lg focus:shadow-black hover:shadow-lg hover:shadow-black"
                >
                <span className="bg-black w-[20%] h-full flex items-center justify-center absolute left-0 top-0">
                    <FcGoogle className="text-2xl" />
                </span>
                Sign Up With Google
            </button>
        </div>
  </div>
  )
}

export default RegisterForm
