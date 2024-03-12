"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"


type MobileNavProps = {
    state: boolean;
    setState: (state: boolean) => void;
    links: {
        links: {
            name: string;
            href: string;
        }[];
    }
}

const MobileNav = ({ state, setState, links }: MobileNavProps) => {
    // remove object from links
    const fixedLinks = links.links
    const router = useRouter()
    // disables scrolling when mobile nav is open
    useEffect(() => {
        if(state) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [state])

    // handle navigation
    const handleNav = (name: string) => {
        const link = fixedLinks.find(link => link.name === name)
        if(link) {
            router.push(link.href)
            setState(!state)
        }
    }
    
  return (
    <div className={state ? "fixed inset-0 bg-white/40 z-50" : "hidden"}>
      <div className="bg-gradient-to-r from-[#021628] to-[#00284C] h-screen min-w-[200px] w-[80%] max-w-[400px] absolute right-0 py-4 px-2 customshadow overflow-auto anim">
            <div className="flex flex-col w-full">
                <div className="w-full flex justify-end">
                    <button onClick={() => setState(!state)} className="text-[#fee302]">X</button>
                </div>
                <div className="flex w-full justify-center my-4">
                    <Image
                    src="/newgenlogodark.svg"
                    width={100}
                    height={100}
                    alt="NewGen Digital Media Logo"
                    priority
                    />
                </div>
                <hr className="w-full border-[#fee302] mt-4" />
                <nav>
                    <ul>
                        {fixedLinks && (
                            fixedLinks.map((link, index) => (
                                <li key={index}>
                                    <button onClick={() => handleNav(link.name)} className="text-[#fee302] font-normal text-center bg-white/5 rounded-sm p-2 mt-4 w-full hover:bg-[#fee302] hover:text-white hover:font-bold transition-all">
                                        {link.name}
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </nav>
            </div>
      </div>
    </div>
  )
}

export default MobileNav
