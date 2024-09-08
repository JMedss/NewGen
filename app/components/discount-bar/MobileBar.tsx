import React from 'react'

const MobileBar = () => {
  return (
    <div className='text md:hidden'>
        <div className='text-slide'>
            <div className='flex items-center'>
                <h5 className='font-extrabold text-white mr-2'>LIMITED-TIME OFFER<span className='text-white-primary'>:</span></h5>
                <p className='text-black-primary font-light'>Receive 10% off website when purchasing a maintenance plan.</p>
            </div>
        </div>
        <div className='text-slide'>
            <div aria-hidden="true" className='flex items-center'>
                <h5 className='font-extrabold text-white mr-2'>LIMITED-TIME OFFER<span className='text-white-primary'>:</span></h5>
                <p className='text-black-primary font-light'>Receive 10% off website when purchasing a maintenance plan.</p>
            </div>
        </div>
        <div className='text-slide'>
            <div aria-hidden="true" className='flex items-center'>
                <h5 className='font-extrabold text-white mr-2'>LIMITED-TIME OFFER<span className='text-white-primary'>:</span></h5>
                <p className='text-black-primary font-light'>Receive 10% off website when purchasing a maintenance plan.</p>
            </div>
        </div>
    </div>
  )
}

export default MobileBar
