"use client"
import DesktopBar from './DesktopBar'
import MobileBar from './MobileBar'
import { useRef, useEffect } from 'react'


const DiscountBar = () => {
 

    // Create a reference to the discount bar to change the position to fixed when it hits the bottom of navbar (100px)

    const discountBarRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (discountBarRef.current) {
                const rect = discountBarRef.current.getBoundingClientRect()
          
                if(rect.top === 100 || rect.top < 100) {
                    discountBarRef.current.classList.add("fixed-bar")
                }
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll)

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

  return (
    <>
        <div className="mt-36 h-[40px] md:h-[50px] w-screen">
            <div ref={discountBarRef} className='discount-bar w-screen flex items-center justify-center bg-yellow-primary mt-36 opacity-0 fade-in h-[40px] md:h-[50px]'>
                <MobileBar />
                <DesktopBar />
            </div>
        </div>
    </>
  )
}

export default DiscountBar
