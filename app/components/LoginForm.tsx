"use client"
import { useState } from "react"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc"
import Link from "next/link";
import { MdVisibility } from "react-icons/md"
import { MdVisibilityOff } from "react-icons/md"



const LoginForm = () => {
    interface Data {
        email: string;
        password: string;
    }
    const [data, setData] = useState<Data>({
        email: "",
        password: "",
    })
    const router = useRouter()

    // function to login user
    const loginUser = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault()
        signIn("credentials", {...data, redirect: false })
        .then((callback) => {
            if(callback?.error) {
                toast.error(callback.error)
            }
            if (callback?.ok) {
            toast.success("Logged in successfully")
            router.push("/profile")
            }
        })
        .finally(() => setData({email: "", password: ""}))
    }

    // state to show password
    const [showPassword, setShowPassword] = useState(false)

    // state for password type
    const [passwordType, setPasswordType] = useState<"password" | "text">("password")

    // function to toggle password visibility
    const toggleVisibility = () => {
        setShowPassword(!showPassword)
        if (passwordType === "password") {
            setPasswordType("text")
        } else {
            setPasswordType("password")
        }
    }
  return (
    <div className="flex min-h-full flex-col justify-center py-12 w-[80%] mx-auto">

    <h2 className="text-white text-center">
        Sign In To Your Account
    </h2>


    <div className="mt-10 mx-auto w-full min-w-[150px] max-w-[450px]">
        <form className="space-y-6" onSubmit={loginUser}>

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
                    onChange={(e) => setData({...data, email: e.target.value})}
                    required
              className="block w-full rounded-[8px] border-0 py-1.5 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"
                    
                    />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#fee302]">
                    Password
                    </label>
                </div>
                <div className="mt-2 relative">
                    <input
                    id="password"
                    name="password"
                    type={passwordType}
                    autoComplete="current-password"
                    value={data.password || ""}
                    onChange={(e) => setData({...data, password: e.target.value})}
                    required
              className="block w-full rounded-[8px] border-0 py-1.5 text-black-primary shadow-sm ring-1 ring-inset ring-yellow-primary placeholder:text-black-primary/40 focus:ring-2 focus:ring-inset focus:ring-yellow-primary sm:text-sm sm:leading-6"
                    
                    />
                    <button type="button" className="absolute top-1/2 -translate-y-1/2 right-2 text-[#fee302] hover:-translate-y-1/2">
                        <MdVisibility onClick={toggleVisibility} className={showPassword ? "flex" : "hidden"}/>
                        <MdVisibilityOff onClick={toggleVisibility} className={showPassword ? "hidden" : "flex"}/>
                    </button>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full bg-gradient-to-r from-[#fee302]/60 to-[#fee302] justify-center rounded-[8px] px-3 py-1.5 text-sm font-semibold text-white  outline-none focus:ring-2 focus:ring-[#fff] "
                    >
                    Sign In
                </button>
            </div>
        </form>
        <button
                onClick={() => signIn("google", {callbackUrl: "/profile"})}
                className="relative  mt-4 flex justify-center w-full bg-black rounded-[8px] px-3 py-1.5 text-sm font-semibold text-white outline-none focus:ring-2 focus:ring-[#fff]  focus:shadow-lg  "
                >
                <span className="bg-black w-[20%] rounded-[8px] h-full flex items-center justify-center absolute left-0 top-0">
                    <FcGoogle className="text-2xl" />
                </span>
                Sign In With Google
            </button>
            <div className="flex flex-col items-center md:flex-row md:justify-between">
                <p className="text-white text-[16px] mt-4">Don&apos;t have an account? <Link className="text-[#fee302] text-[16px] underline" href="/register">Sign Up</Link></p>
                <p className="text-white text-[16px] mt-4">Forgot Password? <Link className="text-[#fee302] text-[16px] underline" href="/reset-password">Reset Password</Link></p>
            </div>
    </div>
</div>
  )
}

export default LoginForm
