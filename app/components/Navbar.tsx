"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Nav from "./Nav"


const Navbar =  () => {

  const { data: session } = useSession()
  
  let links = []
  if(session) {
    links = [
      {name: "Dashboard", href: "/dashboard"},
      {name: "Profile", href: "/profile"},
      {name: "Services", href: "/services"},
    ]
  } else {
    links = [
      {name: "Home", href: "/"},
      {name: "Services", href: "/services"},
      {name: "Sign In", href: "/sign-in"},
      {name: "Register", href: "/register"},
    ]
  }
  return (
    <header className='bg-gradient-to-r from-[#021628] to-[#00284C] shadow-lg shadow-black py-12'>
        <div className="w-[80%] m-auto flex justify-between min-w-[300px]">
            <Image 
            src="/newgenlogodark.svg"
            width={100}
            height={100}
            alt="NewGen Digital Media Logo"
            priority
            />
          <Nav links={links} />
        </div>
    </header>
  )
}

export default Navbar
