"use client"
import React from 'react'
import ProcessDesktop from './ProcessDesktop'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useState } from 'react'
import MobileSlider from './MobileSlider'



gsap.registerPlugin(ScrollTrigger)


const ProcessSection = () => {

  // to stop weird animation thing happeing to first mobile slide
  const [inView, setInView] = useState(false)


  useEffect(() => {
    gsap.fromTo('.process-heading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-heading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.process-subheading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-subheading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.process-line', {
      opacity: 0,
      x: -200
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.process-line',
        start: 'top 80%'
      },
    })

    gsap.fromTo('.slider', {
      opacity: 0,
      x: 200
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.slider',
        start: 'top 80%'
      },
      onComplete: () => setInView(true)
    })
  }, [])

  return (
    <section className='w-screen h-[1200px] relative bg-blue-gradient -mt-24 pt-48 overflow-hidden'>
        <div className='flex flex-col container'>
              <h2 className='process-heading'>WHAT TO <span className='text-yellow-primary'>EXPECT</span> IN THE WEB DEVELOPMENT PROCESS</h2>
              <h3 className="subheading process-subheading">DESIGN - DEVELOP - LAUNCH</h3>
              <div className="process-line w-full h-[2px] bg-yellow-primary md:hidden" />
          
            <div className='mt-80 md:mt-32 slider relative'>
                <ProcessDesktop />
                <MobileSlider inView={inView}/>
            </div>
        </div>
    </section>
  )
}

export default ProcessSection
