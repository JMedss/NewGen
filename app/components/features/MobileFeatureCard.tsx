"use client"
import React, { useRef, useEffect, useState } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import Link from 'next/link'


type MobileFeatureCardProps = {
    subheader: string;
    header: string;
    animation: any;
    animationName: string;
    triggerAnimation: boolean; //prop to control animation
    beforeText?: string;
    afterText?: string;
    linkText?: string;
    linkHref: string;
}

const MobileFeatureCard = ({ subheader, header, animation, triggerAnimation, animationName, beforeText, afterText, linkText, linkHref } : MobileFeatureCardProps) => {
    // Ensure animation plays after component animates in
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (triggerAnimation && lottieRef.current) {
            lottieRef.current.goToAndPlay(0, true); // Start animation when triggerAnimation is true
        }
    }, [triggerAnimation]);

    
    // useEffect to set width of animations

    const [width, setWidth] = useState<string>("")

    useEffect(() => {
        if(animationName) {
            if(animationName === 'speedData') {
                setWidth("w-[75px] -ml-2 -mt-2")
            } 
            else if(animationName === 'accessibilityData' ) {
                setWidth("w-[60px]")                
            } else if (animationName === 'seoData' ) {
                setWidth("w-[50px]")
            } else if (animationName === 'responsiveData') {
                setWidth("w-[60px]")
            }
        }
    }, [animationName])


    return (  

        
            <div  className='bg-light-blue rounded-[8px] border border-white/50 w-full flex flex-col h-[320px] min-w-[300px] pb-4'>
                <div className='w-[80%] m-auto'>
                    <div className='w-full flex items-start'>
                        <div className="relative h-[70px]">
                            <Lottie lottieRef={lottieRef} className={width} animationData={animation} loop={false} />
                            <div className='h-[40px] w-[40px] bg-yellow-primary blur-lg absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 pulse' />
                        </div>
                    </div>
                        <div className='flex flex-col mt-2'>
                            <p className='text-yellow-primary font-light tracking-[1px] sm:text-[18px]'>{subheader}</p>
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

export default MobileFeatureCard
