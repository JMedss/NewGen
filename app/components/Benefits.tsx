"use client"
import { useEffect, useState } from "react"
import { TiFlash } from "react-icons/ti"

type BenefitsProps = {
    priceNickname: string | null
  }


const Benefits = ({priceNickname}: BenefitsProps) => {
    const [benefits, setBenefits] = useState<string[]>([])

    useEffect(() => {
        if (priceNickname === "Hosting Plan") {
            setBenefits(["SSL Certificate", "Domain Name", "Analytics Report" ,"Sitemap", "Security Monitoring"])
        } else if (priceNickname === "Hosting & Maintenance Plan") {
            setBenefits(["SSL Certificate", "Domain Name", "Advanced Analytics Report" ,"Sitemap", "Security Monitoring", "Monthly Updates", "Monitor Performance"])
        }
    }, [priceNickname])

  return (
    <div className="flex flex-col h-[175px]">
        {benefits && benefits.map((benefit: string, i: number) => (
            <div key={i} className="flex items-center text-white">
                <span className="text-[#fee302]"><TiFlash /></span>
                <span>{benefit}</span>
            </div>
        ))}
    </div>
  )
}

export default Benefits
