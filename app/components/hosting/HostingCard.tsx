"use client"
import { useState, useEffect } from "react"


type HostingCardProps = {
    name: string | null
    price: number | null
    id: string | null
    onSubscribe: (id:string | null) => void
}

const HostingCard = ({ name, price, id, onSubscribe }: HostingCardProps) => {
    // State for features
    const [domain, setDomain] = useState(false)
    const [ssl, setSsl] = useState(false)
    const [sharedVps, setSharedVps] = useState(false)
    const [privateVps, setPrivateVps] = useState(false)
    const [maintenance, setMaintenance] = useState(false)
    const [monitoring, setMonitoring] = useState(false)
    const [developerHours, setDeveloperHours] = useState(false)
    const [websiteDiscount, setWebsiteDiscount] = useState(false)

    // Set features based on plan name
    useEffect(() => {
        if(name === "Basic Plan") {
            setDomain(true)
            setSsl(true)
            setSharedVps(true)
        } else if (name === "Premium Plan") {
            setDomain(true)
            setSsl(true)
            setPrivateVps(true)
        } else if (name === "Basic + Maintenance Plan") {
            setDomain(true)
            setSsl(true)
            setSharedVps(true)
            setMaintenance(true)
            setMonitoring(true)
            setDeveloperHours(true)
            setWebsiteDiscount(true)
        } else if (name === "Premium + Maintenance Plan") {
            setDomain(true)
            setSsl(true)
            setPrivateVps(true)
            setMaintenance(true)
            setMonitoring(true)
            setDeveloperHours(true)
            setWebsiteDiscount(true)
        }
    }, [name])



  return (
    <div className='bg-light-blue border border-white/50 rounded-[8px] w-[300px] lg:w-[250px]'>
        <div className="flex flex-col bg-black/20 py-4 relative rounded-t-[8px]">
            <div className="flex flex-col justify-center px-2 h-[80px] ">
                <p className="font-light text-white-primary text-[14px] leading-[110%]">{name}</p>
                <p className="text-white-primary text-[16px]">
                    <span className="font-black text-yellow-primary text-[28px]">{price ? (price / 100).toLocaleString("en-us", {currency: "USD", style: "currency"}) : "" } </span>
                    per month
                </p>

            </div>
            <div className="w-full bg-yellow-primary h-[1px] absolute bottom-0" />
        </div>
        <div className="flex flex-col px-2 mt-4">
            <div>
                <p className="font-black text-yellow-primary">Features</p>
            </div>
            <div className="flex flex-col text-[14px]">
                <p aria-hidden={!domain ? true : false} className={`text-white-primary ${!domain ? "opacity-30" : "opacity-100"}`}>Domain</p>
                <p aria-hidden={!ssl ? true : false} className={`text-white-primary ${!ssl ? "opacity-30" : "opacity-100"}`}>SSL Certificate</p>
                <p aria-hidden={!sharedVps ? true : false} className={`text-white-primary ${!sharedVps ? "opacity-30" : "opacity-100"}`}>Shared VPS</p>
                <p aria-hidden={!privateVps ? true : false} className={`text-white-primary ${!privateVps ? "opacity-30" : "opacity-100"}`}>Private VPS</p>
                <p aria-hidden={!maintenance ? true : false} className={`text-white-primary ${!maintenance ? "opacity-30" : "opacity-100"}`}>Maintenance</p>
                <p aria-hidden={!monitoring ? true : false} className={`text-white-primary ${!monitoring ? "opacity-30" : "opacity-100"}`}>Monitoring</p>
                <p aria-label="Two developer hours per month" aria-hidden={!developerHours ? true : false} className={`text-white-primary ${!developerHours ? "opacity-30" : "opacity-100"}`}>2 Developer Hours/Mo</p>
                <p aria-hidden={!websiteDiscount ? true : false} className={`text-white-primary ${!websiteDiscount ? "opacity-30" : "opacity-100"}`}>10% Off Website</p>
            </div>
            <button onClick={() => onSubscribe(id)} className="bg-yellow-primary custom-outline text-black-primary font-bold w-full rounded-[4px] py-2 my-4 text-[14px] md:text-[16px] lg:text-[18px] hover:opacity-80 transition-opacity duration-500 ease-in-out">
                SUBSCRIBE
            </button>
        </div>
    </div>
  )
}

export default HostingCard;
