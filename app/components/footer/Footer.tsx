import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className='w-screen relative'>
        <div className='bg-yellow-primary h-[2px] w-full absolute top-0'></div>
        <div className='flex flex-col-reverse items-center py-8 md:py-16 gap-8 container md:flex-row md:justify-between'>
            <div className="w-[120px]">
                <Image
                style={{ width: 'auto', height: 'auto' }}
                src='/logo.svg'
                width={100} 
                height={100} 
                alt='NewGen Digital Media Logo' />
            </div>
            <div className="flex flex-col items-center">
                <h4>PAGES<span className="text-yellow-primary">.</span></h4>
                <ul className="flex flex-col items-center text-yellow-primary tracking-[1px] text-[12px] lg:text-[14px] ">
                    <li><Link className="custom-outline" href="/">HOME</Link></li>
                    <li><Link className="custom-outline" href="/">SIGN IN</Link></li>
                    <li><Link className="custom-outline" href="/">REGISTER</Link></li>
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <h4>POLICIES<span className="text-yellow-primary">.</span></h4>
                <ul className="flex flex-col items-center text-yellow-primary tracking-[1px] text-[12px] lg:text-[14px]">
                    <li><Link className="custom-outline" href="/terms-of-use">TERMS OF USE</Link></li>
                    <li><Link className="custom-outline" href="/terms-of-use#cancellationRefund">CANCELLATION & REFUND</Link></li>
                    <li><Link className="custom-outline" href="/privacy-policy">PRIVACY</Link></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
