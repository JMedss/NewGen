"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const MobileNav = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const [openNav, setOpenNav] = useState(false);
    const [formattedDate, setFormattedDate] = useState<string | null>(null);
    const [cta, setCta] = useState({
        text: "GET STARTED",
        link: "/#contact-form"
    })

    useEffect(() => {
        if(session) {
            setCta({
                text: "PROFILE",
                link: "/profile"
            })
        }
    }, [session])

    const handleRoute = (link: string) => {
        router.push(link)
        setOpenNav(!openNav)
    }

    const path = usePathname();

    const handleOpenNav = () => {
        setOpenNav(!openNav);
    };

  



    useEffect(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        
        const unformattedDate = date.toLocaleDateString('en-US', options);
        const lastAtIndex = unformattedDate.lastIndexOf(" at ");
        const datePart = unformattedDate.substring(0, lastAtIndex);
        const timePart = unformattedDate.substring(lastAtIndex + 4);
        const finalDate = `${datePart}`;
        setFormattedDate(finalDate);
    }, []);

    // Handle Navigation
    const handleNav = (path: string) => {
        setOpenNav(false);
        router.push(path);
    }

    return (
        <>

          {/* Mobile Nav Bar */}
          <div className='flex items-center container justify-between py-6 md:hidden'
            >
                <Link tabIndex={openNav? -1 : 0} className="custom-outline w-[120px]" href='/'>
                    <Image src='/logo.svg' alt='NewGen Digital Media Logo' style={{width: "auto", height: "auto"}} width={100} height={100} priority />
                </Link>

                <button aria-label={openNav ? "Close Navigation" : "Open Navigation"} onClick={handleOpenNav} className="z-[1001] flex flex-col justify-center gap-2 custom-outline cursor-pointer">
                    <hr className={`border w-10 h-[2px] transition-all duration-300 ${openNav ? 'transform rotate-45 translate-y-[10px]' : ''} border-yellow-primary`} />
                    <hr className={`border w-10 h-[2px] transition-all duration-300 ${openNav ? 'opacity-0' : ''} border-yellow-primary`} />
                    <hr className={`border w-10 h-[2px] transition-all duration-300 ${openNav ? 'transform -rotate-45 -translate-y-[10px]' : ''} border-yellow-primary`} />
                </button>
            </div>
            {/* Mobile Nav Menu */}
            <div
                className={`bg-blue fixed custom-menu-z inset-0 transition-transform duration-300 overflow-auto md:hidden ${
                    openNav ? 'translate-y-0' : '-translate-y-full'
                }`}
                aria-hidden={openNav ? false : true}
            >
                <div className="flex flex-col items-center justify-center pt-16">
                    <p aria-hidden="true" className="text-[16px] text-white-primary custom-outline pt-4">{formattedDate ? formattedDate : ""}</p>
                </div>
                <hr className="w-full border-t-8 border-yellow-primary my-2" />

                {/* Nav Menu */}
                <nav className="py-2">
                    <ul className="w-full flex flex-col items-center text-center text-white-primary text-[24px] font-light gap-6">
                        <li>
                            <button onClick={() => handleNav("/")} tabIndex={openNav ? 0 : -1} className={path === "/" ? "text-yellow-primary custom-outline" : "text-white-primary custom-outline"}>
                                HOME
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNav("/#website-packages")} tabIndex={openNav ? 0 : -1} className={path === "/#website-packages" ? "text-yellow-primary custom-outline" : "text-white-primary custom-outline"} >
                                PACKAGES
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNav("/#hosting")} tabIndex={openNav ? 0 : -1} className={path === "/#hosting" ? "text-yellow-primary custom-outline" : "text-white-primary custom-outline"} >
                                HOSTING
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNav("/sign-in")} tabIndex={openNav ? 0 : -1} className={path === "/sign-in" ? "text-yellow-primary custom-outline" : "text-white-primary custom-outline"} >
                                SIGN IN
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNav("/register")} tabIndex={openNav ? 0 : -1} className={path === "/register" ? "text-yellow-primary custom-outline" : "text-white-primary custom-outline"} >
                                REGISTER
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleRoute(cta.link)} tabIndex={openNav ? 0 : -1} className="bg-yellow-primary custom-outline rounded-[8px] text-black-primary px-12 py-2 text-[20px] font-extrabold tracking-[1px]">{cta.text}</button>
                        </li>
                    </ul>
                </nav>
                <div className="w-full flex items-center justify-center py-8">
                    <Image
                        src='/darklogo.svg'
                        alt='Newgen Digital Media logo'
                        style={{width: "auto", height: "auto"}}
                        width={150}
                        height={150}
                        priority
                    />
                </div>
            </div>


        </>
    )
}

export default MobileNav;
