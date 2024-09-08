"use client"
import React from 'react'
import Tabs from './Tabs'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WebsitePackages = () => {

    useEffect(() => {
        gsap.fromTo('.website-heading', {
          opacity: 0,
          x: -200
        }, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.website-heading',
            start: 'top 80%'
          }
        })
    
        gsap.fromTo('.website-subheading', {
          opacity: 0,
          x: -200
        }, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.website-subheading',
            start: 'top 80%'
          }
        })
    
        gsap.fromTo('.website-line', {
          opacity: 0,
          x: -200
        }, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.website-line',
            start: 'top 80%'
          },
        })
        gsap.fromTo('.website-paragraph', {
          opacity: 0,
          x: -200
        }, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.website-paragraph',
            start: 'top 80%'
          },
        })
    
        gsap.fromTo('.tabs-container', {
          opacity: 0,
          x: 200
        }, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.tabs-container',
            start: 'top 80%'
          },
        })
      }, [])


  return (
    <section id='website-packages' className='bg-blue md:mt-24 lg:mt-48 overflow-hidden'>
        <div className='flex flex-col  container md:items-center'>
            <div className="flex flex-col">
                <h2 className='website-heading'><span className='text-yellow-primary'>LIMITED-TIME</span> ALL-IN-ONE WEBSITE PACKAGE</h2>
                <h3 className="subheading website-subheading">DESIGN - DEVELOP - COPYWRITING</h3>
                <div className='bg-yellow-primary w-full h-[2px] website-line md:hidden'/>
                <div className='mt-8 md:mt-4 website-paragraph'>
                    <p className='body'>Take the stress out of getting your business online with our all-in-one web development package! For only $300, we’ll handle everything— design, development & copy, so you can focus on what you do best. It’s the easy, worry-free way to establish your online presence and start enhancing your online presence.</p>
                </div>
            </div>
            <div className='tabs-container'>
                <Tabs />
            </div>
        </div>
    </section>
  )
}

export default WebsitePackages
