import Buttons from "../Buttons/Buttons"
import Image from "next/image"

const Hero = () => {
  return (
    <section className='mt-[120px] h-[screen - 120px] w-screen'>
        <div className='w-[80%] m-auto flex flex-col md:flex-row items-center justify-center mt-60'>
            <div className='flex flex-col'>
                <h1 className='text-[64px] w-[80%] text-center md:text-left leading-tight'>Web Development Agency</h1>
                <p>Elevating Digital Presence: Crafting Innovative Web Solutions for Your Success</p>
                    <Buttons />
            </div>
            <div className="mt-24 md:mt-0">
                <Image 
                src="/heroicon.svg"
                width={600}
                height={600}
                alt=""
                priority
                />
            </div>
        </div>
    </section>
  )
}

export default Hero
