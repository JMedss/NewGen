"use client"
import Hosting from "./Hosting";
import { useEffect, useState } from "react";
import Stripe from "stripe";

const HostingPlans = () => {
    const [hostingPlans, setHostingPlans] = useState<[]>([]);
    useEffect(() => {
        const fetchHostingPlans = async () => {
            try {
                const res = await fetch("/api/get-services", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                
                if(res.ok) {
                    const data = await res.json();
                    setHostingPlans(data)
                    
                }
                
            } catch (error) {
                console.error(error);
            }    
        }
        fetchHostingPlans()
    }, [])

    useEffect(() => {
        console.log(hostingPlans);
    }, [hostingPlans])

    // Check if hostingPlans is not null or empty before rendering
    if (!hostingPlans || hostingPlans.length === 0) {
        return (
            <section id="hosting" className='w-screen h-screen flex items-center justify-center bg-reversed-blue-gradient overflow-hidden mt-24 pb-12'>
                <h3 className="text-yellow-primary">Loading...</h3>
            </section>
        );
    }

    return (
       
        <section id="hosting" className='w-screen bg-reversed-blue-gradient overflow-hidden mt-24 pb-12'>
            <Hosting hostingPlans={hostingPlans} />
        </section>
    );
}

export default HostingPlans;

