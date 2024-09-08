"use client"
import { useState, useEffect } from "react"
import Lottie from "lottie-react"
import BulletPoint from "./BulletPoint"

type SlideProps = {
    tab: string
    header: string
    subheader: string
    bulletPoints: {
        bulletOne: string
        bulletTwo: string
        bulletThree: string
        bulletFour: string
        bulletFive: string
        bulletSix: string
    }
    animationData: any
    animationName: string
}

const Slide = ({ tab, header, subheader, bulletPoints, animationData, animationName }: SlideProps) => {

    // State for see more button
    const [seeMore, setSeeMore] = useState(false)

    // State for setting the animation size and slide height
    const [animationWidth, setAnimationWidth] = useState("")
    const [slideHeight, setSlideHeight] = useState("")
    const [bulletHeight, setBulletHeight] = useState("")
    // Dynamically set the animation size based on animationName, and slide height
    useEffect(() => {
        if(animationName === 'meetingData') {
            setAnimationWidth('w-[80px]')
            setSlideHeight('h-[460px]')
            setBulletHeight('h-[100px]')
        } else if(animationName === 'researchData') {
            setAnimationWidth('w-[100px]')
            setSlideHeight('h-[460px]')
            setBulletHeight('h-[120px]')

        } else if(animationName === 'wireframeData') {
            setAnimationWidth('w-[80px] -mt-4 -mr-4')
            setSlideHeight('h-[540px]')
            setBulletHeight('h-[140px]')

        } else if(animationName === 'designData') {
            setAnimationWidth('w-[80px]')
            setSlideHeight('h-[520px]')
            setBulletHeight('h-[110px]')

        } else if(animationName === 'developData') {
            setAnimationWidth('w-[100px]')
            setSlideHeight('h-[560px]')
            setBulletHeight('h-[120px]')

        } else if(animationName === 'launchData') {
            setAnimationWidth('w-[60px]')
            setSlideHeight('h-[540px]')
            setBulletHeight('h-[140px]')

        }
    }, [animationName])

    return (
        <div className={`bg-light-blue border border-white/50 w-[340px] rounded-[8px] pb-4 transition-all duration-300 ease-in-out ${seeMore ? slideHeight : 'h-[440px]'}`}>
            <div className='bg-yellow-primary rounded-t-[8px] flex w-full justify-center items-center py-1'>
                <p className="font-bold text-[20px] md:text-[22px]">{tab}</p>
            </div>
            <div className='flex flex-col mt-12 px-2'>
                <div className='flex flex-col justify-center items-center'>
                    <h3 className="text-center w-full">{header}<span className='text-yellow-primary'>.</span></h3>
                    <p className="text-center w-full tracking-[1px] leading-[110%] text-yellow-primary font-light -mt-1">{subheader}</p>
                </div>

                <div className="flex justify-center items-center w-full h-[100px]">
                    <Lottie animationData={animationData} className={animationWidth} />
                </div>
           
                <div className={`transition-all duration-300 ease-in-out flex flex-col gap-2 ${seeMore ? bulletHeight : "h-[160px]"}`}>
                    <BulletPoint bulletPoint={bulletPoints.bulletOne} />
                    <BulletPoint bulletPoint={bulletPoints.bulletTwo} />
                    <BulletPoint bulletPoint={bulletPoints.bulletThree} />
                </div>


                <div className={`flex flex-col gap-2 mt-2 transition-[max-height,opacity] duration-300 ease-in-out ${seeMore ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <BulletPoint bulletPoint={bulletPoints.bulletFour} />
                    <BulletPoint bulletPoint={bulletPoints.bulletFive} />
                    <BulletPoint bulletPoint={bulletPoints.bulletSix} />
                </div>
            </div>
            <div className={`transition-all duration-300 ease-in-out mt-4 ${seeMore ? "" : "flex-grow"}`}>
                    <button 
                    aria-hidden="true"
                    onClick={() => setSeeMore(!seeMore)} 
                    className=" -mt-1 flex w-full justify-center text-yellow-primary tracking-[1px] custom-outline underline text-[14px]"
                    >
                        {seeMore ? "See Less" : "See More"}
                    </button>
                </div>
        </div>
    )
}

export default Slide
