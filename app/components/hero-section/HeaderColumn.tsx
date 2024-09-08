"use client"
import PrimaryButton from '../PrimaryButton'
import { useEffect } from 'react'
import { gsap } from 'gsap'


const HeaderColumn = () => {
  useEffect(() => {
    gsap.fromTo('.head', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out'
    })
  }, []) 


  return (
    <div className='flex flex-col w-full md:pt-24 head'>
        <h1><span className='text-yellow-primary'>HIGH-PERFORMING </span>WEBSITES FOR SMALL BUSINESSES</h1>
        <h2 className="subheading mb-6 sm:mb-8 -mt-24">Custom, hand-coded websites tailored to your audience. Create a unique digital presence for your brand. </h2>
        <PrimaryButton text='VIEW PACKAGES' link='/#website-packages' classes='bg-yellow-primary text-black-primary' />
    </div>
  )
}

export default HeaderColumn
