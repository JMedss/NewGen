"use client"
import Lottie from "lottie-react"
import BulletPoint from "./BulletPoint"
import { useEffect, useState } from "react"

    type TabContentProps = {
        header: string
        subheader: string
        bulletPoints: { 
            bulletOne: string, 
            bulletTwo: string, 
            bulletThree: string,
            bulletFour: string,
            bulletFive: string,
            bulletSix: string
        }
        animationData: any
        animationName: string
    }

const TabContent = ({ header, subheader, bulletPoints, animationData, animationName } : TabContentProps) => {

    const [lottieWidth, setLottieWidth] = useState<string>("")

    useEffect(() => {
        if(animationName === "meetingData") {
            setLottieWidth("w-[100px]")
        } else if(animationName === "researchData") {
            setLottieWidth("w-[140px] -mb-8")
        } else if(animationName === "wireframeData") {
            setLottieWidth("w-[100px]")
        } else if(animationName === "designData") {
            setLottieWidth("w-[100px] mt-6")
        } else if(animationName === "developData") {
            setLottieWidth("w-[140px] -mb-8 -mt-4")
        } else if(animationName === "launchData") {
            setLottieWidth("w-[60px] mt-2")
        }
    }, [animationName])

  return (
    <div className='flex flex-col items-center w-full'>
      <h3 className="mt-16 lg:mt-24">{header}<span className='text-yellow-primary'>.</span></h3>
      <p className="text-yellow-primary tracking-[1px] -mt-1 lg:text-[18px]">{subheader}</p>

      <div className={lottieWidth}>
        <Lottie animationData={animationData}/>
      </div>
    

        <div className="flex flex-col w-full gap-4 mt-8">
            <div className="flex items-center w-full justify-center gap-1 lg:gap-4">
                <BulletPoint bulletPoint={bulletPoints.bulletOne}/>
                <BulletPoint bulletPoint={bulletPoints.bulletFour}/>
            </div>
            <div className="flex items-center w-full justify-center gap-1 lg:gap-4">
                <BulletPoint bulletPoint={bulletPoints.bulletTwo}/>
                <BulletPoint bulletPoint={bulletPoints.bulletFive}/>
            </div>
            <div className="flex items-center w-full justify-center gap-1 lg:gap-4">
                <BulletPoint bulletPoint={bulletPoints.bulletThree}/>
                <BulletPoint bulletPoint={bulletPoints.bulletSix}/>
            </div>
        </div>
    </div>
  )
}

export default TabContent
