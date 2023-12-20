"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"


const Navbar = () => {
    const router = useRouter()
    const handleSignIn = (e) => {
        e.preventDefault()
        router.push("/login")
    }
    const handleRegister = (e) => {
        e.preventDefault()
        router.push("/register")
    }
  return (
    <header className="fixed py-[40px] shadow-lg top-0 left-0 w-full z-50 bg-white">
        <div className='w-[80%] m-auto flex items-center justify-between'>
            <div>
                <Image 
                src="/newgenlogo.svg"
                width={150}
                height={150}
                alt="NewGen Digital Media Logo"
                priority
                />
            </div>
            <div className="flex gap-4 flex-col md:flex-row">
                <button onClick={handleSignIn} className="bg-[#fee302] px-6 sm:px-7 md:px-10 lg:px-12 py-1 md:py-2">SIGN IN</button>
                <button onClick={handleRegister} className="bg-[#fee302] px-6 sm:px-7 md:px-10 lg:px-12 py-1 md:py-2">REGISTER</button>
            </div>
        </div>
    </header>
  )
}

export default Navbar
