"use client"
import { FiLink2 } from "react-icons/fi";
import Link from "next/link";



type DescriptorProps = {
    text: string;
    link: string;
}

const Descriptor = ({ text, link }: DescriptorProps) => {
  return (
    <div aria-hidden="true" className="bg-[#265D77] rounded-[4px] custom-shadow w-full py-2 px-4">
        <h5 className="text-[10px] lg:text-[12px] font-bold text-yellow-primary whitespace-nowrap">{text}</h5>
            <Link className="flex items-center gap-2 custom-outline   " href={link}>
                <p className="text-white-primary text-[10px]  font-light whitespace-nowrap">Learn More</p>
                <FiLink2 className="text-yellow-primary" size={12}/>
            </Link>
  </div>
  )
}

export default Descriptor
