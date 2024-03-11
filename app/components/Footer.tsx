import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-12 bg-gradient-to-r from-[#021628] to-[#00284C]"> 
        <div className='w-[80%] m-auto flex flex-col items-center gap-10 md:flex-row justify-between'>
            <Image 
            src="/newgenlogodark.svg"
            width={100}
            height={100}
            alt="NewGen Digital Media Logo"
            />
            <div className="flex flex-col items-center text-white">
                <h3 className="font-bold ">Contact</h3>
                <ul className="flex flex-col items-center">
                    <li><Link href="tel:+18282849760">828-284-9760</Link></li>
                    <li><Link href="mailto:joshmeadows@newgendigitalmedia.com">joshmeadows@newgendigitalmedia.com</Link></li>
                </ul>
            </div>
            <div className="flex flex-col items-center text-white">
                <h3 className="font-bold ">Policies</h3>
                <ul className="flex flex-col items-center">
                    <li><Link href="/terms-of-use">Terms Of Use</Link></li>
                    <li><Link href="/cancellation-policy">Cancellation & Refund</Link></li>
                    <li><Link href="/privacy-policy">Privacy</Link></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer
