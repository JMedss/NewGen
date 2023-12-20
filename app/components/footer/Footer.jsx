import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className='w-screen'>
        <hr />
        <div className='flex flex-col md:flex-row items-center justify-around w-[80%] m-auto'>
            <div className="my-6">
                <Image 
                src="/newgenlogo.svg"
                width={150}
                height={150}
                alt=""
                />
            </div>
            <div className="flex flex-col items-center my-6">
                <h5 className="font-bold">Contact</h5>
                <Link href="tel:+18282849760">828-284-9760</Link>
                <Link href="mailto:joshmeadows@newgendigitalmedia.com">joshmeadows@newgendigitalmedia.com</Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer
