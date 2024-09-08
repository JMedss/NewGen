"use client"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const DesktopNav = () => {
    const [cta, setCta] = useState({
        text: "GET STARTED",
        link: "/#contact-form"
    })
    const { data: session } = useSession()
    const router = useRouter()
    useEffect(() => {
        if (session) {
            setCta({
                text: "PROFILE",
                link: "/profile"
            })
        }
    }, [session])

    const handleSession = (link: string) => {
        router.push(link)
    }
  return (
    <div className='hidden md:flex items-center container pt-8 pb-4'>
        <Link className="custom-outline mr-4 lg:mr-8 xl:mr-10 2xl:mr-12 w-[150px]" href='/'>
            <Image src='/logo.svg' alt='NewGen Digital Media Logo' style={{width: "auto", height: "auto"}} width={100} height={100} priority />
        </Link>

        <div className="flex items-center justify-between text-[12px] lg:text-[14px] w-full">
            <nav>
                <ul className="flex items-center gap-2 text-white-primary">
                    <li>
                        <Link className="custom-outline tracking-[5%] hover:opacity-50 transiton duration-500 ease-in-ou" href='/'>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link className="custom-outline tracking-[5%] hover:opacity-50 transiton duration-500 ease-in-ou" href='/#website-packages'>
                            PACKAGES
                        </Link>
                    </li>
                    <li>
                        <Link className="custom-outline tracking-[5%] hover:opacity-50 transiton duration-500 ease-in-ou" href='/#hosting'>
                            HOSTING
                        </Link>
                    </li>
           
                </ul>
            </nav>
            <nav>
                <ul className="flex items-center gap-2 text-white-primary">
                    <li>
                        <Link className="custom-outline tracking-[5%] hover:opacity-50 transiton duration-500 ease-in-ou" href='/register'>
                            REGISTER
                        </Link>
                    </li>
                    <li>
                        <Link className="custom-outline tracking-[5%] hover:opacity-50 transiton duration-500 ease-in-ou" href='/sign-in'>
                            SIGN IN
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => handleSession(cta.link)} className="custom-outline rounded-[8px] px-8 py-2 lg:px-12 xl:px-16  font-extrabold bg-yellow-primary text-black hover:opacity-70 transiton duration-500 ease-in-out">
                            {cta.text}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

export default DesktopNav
