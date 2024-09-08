
import React from 'react'
import HeaderColumn from './HeaderColumn'
import AnimationColumn from './AnimationColumn'

const HeroSection = () => {
  
  return (
    <section className='relative h-full w-screen overflow-x-clip bg-blue-gradient pt-12 md:pt-0 mt-[100px]'>
      <div className='flex flex-col gap-20 justify-center md:flex-row md:items-center container'>
        <HeaderColumn />
        <AnimationColumn />
      </div>
    </section>
  )
}

export default HeroSection
