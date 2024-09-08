import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"


const Navbar = () => {
  return (
    <header id="header-content" className='w-full bg-gray flex flex-col justify-center fixed top-0 left-0 custom-header-z h-[100px]'>
        <MobileNav />
        <DesktopNav />
    </header>
  )
}

export default Navbar
