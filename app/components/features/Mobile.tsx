"use client"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import MobileFeatureCard from "./MobileFeatureCard"
import speedData from '../../../public/animations/highspeed.json'
import seoData from '../../../public/animations/barchart.json'
import accessibilityData from '../../../public/animations/accessibility.json'
import responsiveData from '../../../public/animations/responsive.json'

import { useEffect, useState } from "react"
gsap.registerPlugin(ScrollTrigger)

const Mobile = () => {
    const [animationTriggers, setAnimationTriggers] = useState({
        boxOne: false,
        boxTwo: false,
        boxThree: false,
        boxFour: false,
    });

    useEffect(() => {
        const createAnimation = (lineClass: string, boxClass: string, height: string, setTrigger: (val: boolean) => void) => {
            gsap.fromTo(`.${lineClass}`, {
                opacity: 0,
                height: '0px',
            }, {
                height: height, // Use the height parameter for flexibility
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: `.${boxClass}`,
                    start: 'top 85%',  // Adjusted start point
                    end: 'top 65%',    // Adjusted end point
                    onEnter: () => setTrigger(true), // Trigger Lottie animation on enter
                    once: true // Ensures the animation only happens once
                }
            });

            gsap.fromTo(`.${boxClass}`, {
                opacity: 0,
                y: -50,
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: `.${boxClass}`,
                    start: 'top 85%',
                    end: 'top 65%',
                    onEnter: () => {
                        gsap.to(`.${boxClass}`, { opacity: 1, y: 0, duration: 1 });
                    },
                    once: true // Ensures the animation only happens once
                }
            });
        };

        createAnimation('line-one', 'box-one', '116px', (val) => setAnimationTriggers(prev => ({ ...prev, boxOne: val })));
        createAnimation('line-two', 'box-two', '100px', (val) => setAnimationTriggers(prev => ({ ...prev, boxTwo: val })));
        createAnimation('line-three', 'box-three', '100px', (val) => setAnimationTriggers(prev => ({ ...prev, boxThree: val })));
        createAnimation('line-four', 'box-four', '100px', (val) => setAnimationTriggers(prev => ({ ...prev, boxFour: val })));
    }, []);

    return (
        <div className='flex flex-col w-full items-center gap-24 mt-24 relative md:hidden'>
            <div className="w-[32px] circle">
                <Image 
                src="circle.svg"
                style={{height: 'auto', width: 'auto'}}
                width={100}
                height={100}
                aria-hidden="true"
                alt="Circle Decoration"
                />
            </div>
            <div className="w-full box-one">
                <MobileFeatureCard 
                subheader="HIGH-SPEED"
                header="EACH SECOND COUNTS"
                animation={speedData}
                animationName="speedData"
                triggerAnimation={animationTriggers.boxOne} // Pass trigger to Lottie
                linkText="Studies shows strong correlation "
                afterText="between loading speed and conversion rates."
                linkHref="https://blog.hubspot.com/marketing/page-load-time-conversion-rates"
                />
            </div>
            <div className="w-full box-two">
                <MobileFeatureCard 
                subheader="SEO"
                header="SEO-FRIENDLY"
                animation={seoData}
                animationName="seoData"
                triggerAnimation={animationTriggers.boxTwo} // Pass trigger to Lottie
                linkText="The framework"
                afterText=" used in our websites was engineered to be high-performing and seo-friendly."
                linkHref="https://nextjs.org/"
                />
            </div>
            <div className="w-full box-three">
                <MobileFeatureCard 
                subheader="ACCESSIBLE"
                header="A WEBSITE FOR ALL"
                animation={accessibilityData}
                animationName="accessibilityData"
                triggerAnimation={animationTriggers.boxThree} // Pass trigger to Lottie
                linkText="16% of the world population"
                afterText=" has some form of a disability. Ensuring usability by all fosters a more friendly user-experience."
                linkHref="https://accessiblyapp.com/blog/web-accessibility-statistics/#:~:text=Over%2096%25%20of%20the%20world%E2%80%99s%20top%20one%20million,accessibility%20errors%20per%20website%20home%20page%20is%2050.8."
                />
            </div>
            <div className="w-full box-four">
                <MobileFeatureCard 
                subheader="RESPONSIVE"
                header="WORKS ON ALL DEVICES"
                animation={responsiveData}
                animationName="responsiveData"
                triggerAnimation={animationTriggers.boxFour} // Pass trigger to Lottie
                linkText="In 2023, mobile devices made up 65.49% of website traffic."
                afterText=" Ensuring usability on all screen sizes is crucial as the world becomes more digital."
                linkHref="https://blog.hubspot.com/marketing/web-design-stats-for-2020"
                />
            </div>

            {/* Animated Lines */}
            <div className="absolute z-10 top-4">
                <div className="bg-yellow-primary w-[2px] h-[100px] relative line-one">
                    <div className="absolute h-[6px] w-[6px] rotate-45 bg-yellow-primary left-1/2 -translate-x-1/2 bottom-0"/>
                </div>
            </div>
            <div className="absolute z-10 top-[448px]">
                <div className="bg-yellow-primary w-[2px] h-[100px] relative  line-two">
                    <div className="absolute h-[6px] w-[6px] rotate-45 bg-yellow-primary left-1/2 -translate-x-1/2 bottom-0"/>
                </div>
            </div>
            <div className="absolute z-10 top-[864px] ">
                <div className="bg-yellow-primary w-[2px] h-[100px] relative line-three">
                    <div className="absolute h-[6px] w-[6px] rotate-45 bg-yellow-primary left-1/2 -translate-x-1/2 bottom-0"/>
                </div>
            </div>
            <div className="absolute z-10 top-[1280px] ">
                <div className="bg-yellow-primary w-[2px] h-[100px] relative line-four">
                    <div className="absolute h-[6px] w-[6px] rotate-45 bg-yellow-primary left-1/2 -translate-x-1/2 bottom-0"/>
                </div>
            </div>

        </div>
    )
}

export default Mobile
