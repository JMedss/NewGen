"use client"
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState } from 'react';

type BenefitTabProps = {
    header: string;
    subheader: string;
    copy: string; // Add a new prop for the dropdown content
}

const BenefitTab = ({ header, subheader, copy }: BenefitTabProps) => {
  
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='relative py-2 my-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
            <h3>{header}<span className='text-yellow-primary'>.</span></h3>
            <p className='font-medium text-yellow-primary mr-1 tracking-[1px] leading-5 md:text-[16px] lg:text-[18px]'>{subheader}</p>
        </div>
        <button 
          aria-label="Open dropdown"
          onClick={() => setIsActive(!isActive)}
          className={`transition-transform duration-300 ease-in-out transform custom-outline   ${isActive ? 'rotate-180' : 'rotate-0'}`}
        >
            {isActive ? (
                <FaMinus className='text-yellow-primary' size={30}/>
            ) : (
                <FaPlus className='text-yellow-primary' size={30}/>
            )}
        </button>
      </div>
      <div aria-hidden={isActive ? false : true} className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-96' : 'max-h-0'}`}>
        <p className='mt-2 body'>{copy}</p>
      </div>
      <div className='absolute bottom-0 w-full h-[1px] bg-gray' />
    </div>
  )
}

export default BenefitTab;

