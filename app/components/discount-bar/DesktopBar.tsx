import React from 'react'

const DesktopBar = () => {
  return (
    <div className='hidden md:flex items-center justify-center container whitespace-nowrap py-4'>
        <h5 className='font-extrabold text-white mr-2 lg:mr-8 lg:text-[18px]'>LIMITED-TIME OFFER<span className='text-white-primary'>:</span></h5>
        <p className='text-black-primary font-light lg:text-[16px]'>Receive 10% off website when purchasing a maintenance plan.</p>
    </div>
  )
}

export default DesktopBar
