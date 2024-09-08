"use client"
import React, { useRef, useEffect, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Image from 'next/image'
import Link from 'next/link'

type DesktopCardProps = {
    header: string;
    subheader: string;
    animation: any;
    animationName?: string;
    beforeText?: string;
    afterText?: string;
    linkText?: string;
    linkHref: string;
    animationCompleted: boolean;
}

const DesktopCard = ({ header, subheader, animation, animationName, beforeText, afterText, linkHref, linkText, animationCompleted }: DesktopCardProps ) => {
    
    const lottieRef = useRef<LottieRefCurrentProps>(null); // Create a ref for the Lottie component

    const [width, setWidth] = useState<string>("")

    useEffect(() => {
        if(animationName) {
            if(animationName === 'speedData') {
                setWidth("w-[70px] -ml-2 -mt-2")
            } 
            else if(animationName === 'accessibilityData' ) {
                setWidth("w-[50px]")                
            } else if (animationName === 'seoData' ) {
                setWidth("w-[50px]")
            } else if (animationName === 'responsiveData') {
                setWidth("w-[60px] mt-2")
            }
        }
    }, [animationName])

    useEffect(() => {
        if (animationCompleted && lottieRef.current) {
            lottieRef.current.play(); // Play the animation when animationCompleted is true
        } else if (lottieRef.current) {
            lottieRef.current.goToAndStop(0, true); // Ensure the animation is paused initially
        }
    }, [animationCompleted]);


    return (
        <div  className='bg-light-blue hover:bg-hover-gradient transition-all duration-1000 ease-in-out rounded-[8px] border border-white/50 w-full flex flex-col h-[400px] pb-4'>
        <div className='w-[80%] m-auto'>
            <div className='w-full flex items-start'>
                <div className="relative h-[80px]">
                    <Lottie lottieRef={lottieRef} className={width} animationData={animation} loop={false} />
                    <div className='h-[40px] w-[40px] bg-yellow-primary blur-lg absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 pulse' />
                </div>
            </div>
                <div className='flex flex-col mt-2'>
                    <p className='text-yellow-primary font-light tracking-[1px] sm:text-[18px] lg:text-[20px]'>{subheader}</p>
                    <h3>{header}<span className='text-yellow-primary'>.</span></h3>
                </div>
                <div>
                    <p className='body'>
                        {beforeText}
                        <Link href={linkHref} target='_blank' className='font-medium text-yellow-primary underline custom-outline'>
                            {linkText}
                        </Link>
                        {afterText}
                    </p>
                </div>
        </div>
    </div>
    )
}

export default DesktopCard
