"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import { usePathname } from 'next/navigation'
import { RxHamburgerMenu } from "react-icons/rx"
import MobileNav from "./MobileNav"


type NavProps = {
    links: {
        name: string;
        href: string;
    }[];
}

const Nav = (props: NavProps) => {
    const pathname = usePathname()

  // Mobile Nav State
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const openMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  return (
    <>
        <nav className="hidden md:flex md:text-white">
        <ul className="flex gap-4">
            {props.links.map((link, index) => (
                <li key={index}>
                    <Link
                     className={pathname === link.href ? "text-[#fee302] font-bold" : "text-white"}
                     href={link.href}>
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
      </nav>
      <button onClick={openMobileNav} className="text-[#fee302] text-2xl md:hidden"><RxHamburgerMenu /></button>
      <MobileNav state={mobileNavOpen} setState={setMobileNavOpen} links={props}/>
    </>

  )
}

Nav.propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

export default Nav
