"use client"
import Image from "next/image"
import DesktopCard from "./DesktopCard"
import speedData from '../../../public/animations/highspeed.json'
import seoData from '../../../public/animations/barchart.json'
import accessibilityData from '../../../public/animations/accessibility.json'
import responsiveData from '../../../public/animations/responsive.json'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { useEffect, useState } from "react"

gsap.registerPlugin(ScrollTrigger)


const Desktop = () => {

    const [completionStates, setCompletionStates] = useState({
        tl1Completed: false,
        tl2Completed: false,
        tl3Completed: false,
        tl4Completed: false,
    });

    useEffect(() => {
        // Timeline 1
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.main-line',
                start: 'top 60%',
                end: 'top 40%',
                scrub: true,
            },
            onComplete: () => {
                setCompletionStates(prev => ({ ...prev, tl1Completed: true }));
            }
        });

        tl1.fromTo('.main-line', {
            height: '0px',
        }, {
            height: '1100px',
            duration: 1,
            ease: 'none',
            scrub: true,
        })

        tl1.fromTo('.line-one', {
            scaleX: 0,
            transformOrigin: 'right',
        }, {
            scaleX: 1,
            duration: 1,
            ease: 'none',
        })
        .fromTo('.box-one', {
            scaleY: 0,
            transformOrigin: 'center',
        }, {
            scaleY: 1,
            duration: 2,
            ease: 'power8.out',
        }, '-=0.5');
       
        // Repeat similar for other timelines (tl2, tl3, tl4)
        // Timeline 2
        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.main-line',
                start: 'top 40%',
                end: 'top 20%',
                scrub: true,
            },
            onComplete: () => {
                setCompletionStates(prev => ({ ...prev, tl2Completed: true }));
            }
        });

        tl2.fromTo('.line-two', {
            scaleX: 0,
            transformOrigin: 'left',
        }, {
            scaleX: 1,
            duration: 1,
            ease: 'none',
        })
        .fromTo('.box-two', {
            scaleY: 0,
            transformOrigin: 'center',
        }, {
            scaleY: 1,
            duration: 2,
            ease: 'power8.out',
        }, '-=0.5');

        // Timeline 3
        const tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '.main-line',
                start: 'top 10%',
                end: 'top 0%',
                scrub: true,
            },
            onComplete: () => {
                setCompletionStates(prev => ({ ...prev, tl3Completed: true }));
            }
        });

        tl3.fromTo('.line-three', {
            scaleX: 0,
            transformOrigin: 'right',
        }, {
            scaleX: 1,
            duration: 1,
            ease: 'none',
        })
        .fromTo('.box-three', {
            scaleY: 0,
            transformOrigin: 'center',
        }, {
            scaleY: 1,
            duration: 2,
            ease: 'power8.out',
        }, '-=0.5');

        // Timeline 4
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: '.main-line',
                start: 'top 0%',
                end: 'top -10%',
                scrub: true,
            },
            onComplete: () => {
                setCompletionStates(prev => ({ ...prev, tl4Completed: true }));
            }
        });

        tl4.fromTo('.line-four', {
            scaleX: 0,
            transformOrigin: 'left',
        }, {
            scaleX: 1,
            duration: 1,
            ease: 'none',
        })
        .fromTo('.box-four', {
            scaleY: 0,
            transformOrigin: 'center',
        }, {
            scaleY: 1,
            duration: 2,
            ease: 'power8.out',
        }, '-=0.5');

    }, []);

  return (
    <div className='hidden md:flex relative w-full mt-48'>
        {/* Lines and Circle */}

        <div className="absolute left-1/2 -translate-x-1/2 -top-24">
            <div className="relative circle">
                <Image
                style={{ width: "auto", height: "auto" }}
                src="circle.svg"
                width={100}
                height={100}
                alt="Circle Decoration"
                aria-hidden="true"
                />
                {/* Main Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-4 w-[2px] h-[1100px] bg-yellow-gradient main-line" />
                {/* Small Lines */}
                <div className="absolute -left-[53px] top-[295px] line-one">
                    <div className="relative w-[77px] h-[2px] bg-yellow-primary">
                        <div className="bg-yellow-primary h-[8px] w-[8px] rotate-45 absolute left-0 top-1/2 -translate-y-1/2" />
                    </div>
                </div>


                <div className="absolute left-[24px] top-[400px] line-two">
                    <div className="relative w-[77px] h-[2px] bg-yellow-primary">
                        <div className="bg-yellow-primary h-[8px] w-[8px] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                <div className="absolute -left-[53px] top-[790px] line-three">
                    <div className="relative w-[77px] h-[2px] bg-yellow-primary">
                        <div className="bg-yellow-primary h-[8px] w-[8px] rotate-45 absolute left-0 top-1/2 -translate-y-1/2" />
                    </div>
                </div>


                <div className="absolute left-[24px] top-[880px] line-four">
                    <div className="relative w-[77px] h-[2px] bg-yellow-primary">
                        <div className="bg-yellow-primary h-[8px] w-[8px] rotate-45 absolute right-0 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>
        </div>

        <div className="flex gap-36 h-[1000px]">
            <div className="flex flex-col w-full gap-24">
                <div className="box-one">
                    <DesktopCard
                    subheader="HIGH-SPEED"
                    header="EACH SECOND COUNTS"
                    animation={speedData}
                    animationName="speedData"
                    animationCompleted={completionStates.tl1Completed}
                    linkText="Studies shows strong correlation "
                    afterText="between loading speed and conversion rates."
                    linkHref="https://blog.hubspot.com/marketing/page-load-time-conversion-rates"
                    />
                </div>
                <div className="box-three">
                    <DesktopCard
                    subheader="ACCESSIBLE"
                    header="A WEBSITE FOR ALL"
                    animation={accessibilityData}
                    animationName="accessibilityData"
                    linkText="16% of the world population"
                    afterText=" has some form of a disability. Ensuring usability by all fosters a more friendly user-experience."
                    linkHref="https://accessiblyapp.com/blog/web-accessibility-statistics/#:~:text=Over%2096%25%20of%20the%20world%E2%80%99s%20top%20one%20million,accessibility%20errors%20per%20website%20home%20page%20is%2050.8."
                    animationCompleted={completionStates.tl3Completed}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full gap-24 justify-end">
                <div className="box-two">
                    <DesktopCard
                        subheader="SEO"
                        header="SEO-FRIENDLY"
                        animation={seoData}
                        animationName="seoData"
                        linkText="The framework"
                        afterText=" used in our websites was engineered to be high-performing and seo-friendly."
                        linkHref="https://nextjs.org/"
                        animationCompleted={completionStates.tl2Completed}
                    />
                </div>
                <div className="box-four">
                    <DesktopCard
                        subheader="RESPONSIVE"
                        header="WORKS ON ALL DEVICES"
                        animation={responsiveData}
                        animationName="responsiveData"
                        linkText="In 2023, mobile devices made up 65.49% of website traffic."
                        afterText=" Ensuring usability on all screen sizes is crucial as the world becomes more digital."
                        linkHref="https://blog.hubspot.com/marketing/web-design-stats-for-2020"
                        animationCompleted={completionStates.tl4Completed}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Desktop
