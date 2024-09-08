"use client"
import React from 'react'
import ContactForm from './ContactForm'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const CTA = () => {

  useEffect(() => {
    gsap.fromTo('.cta-heading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-heading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.cta-subheading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-subheading',
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
        trigger: '.cta-line',
        start: 'top 80%'
      },
    })
    gsap.fromTo('.cta-paragraph', {
      opacity: 0,
      x: -200
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-paragraph',
        start: 'top 80%'
      },
    })

    gsap.fromTo('.cta-container', {
      opacity: 0,
      x: 200
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.cta-container',
        start: 'top 80%'
      },
    })
  }, [])

  return (
    <section id='contact-form' className='bg-blue-gradient w-screen py-24 md:py-48 overflow-hidden'>
        <div className='flex flex-col md:flex-row md:items-start container md:gap-4 lg:gap-8'>
            <div className='flex flex-col w-full'>
                <h2 className='md:pt-0 cta-heading'>ARE YOU <span className='text-yellow-primary'>READY</span> TO GET STARTED?</h2>
                <h3 className="subheading cta-subheading">WILL RESPOND WITHIN 24 HOURS</h3>
                <div className='cta-line bg-yellow-primary w-full h-[2px] md:hidden'></div>
                <div className='mt-8'>
                  <p className="body cta-paragraph">Ready to enhance your online presence with a high-performing website? Let us handle the stress—get a beautifully designed, powerful site that drives results today! </p>
                </div>
            </div>
            <div className='w-full cta-container'>
              <ContactForm />
            </div>
        </div>
    </section>
  )
}

export default CTA
