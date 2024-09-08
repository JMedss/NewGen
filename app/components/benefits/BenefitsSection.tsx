"use client"
import { useState, useEffect, useRef } from 'react'
import BenefitTab from './BenefitTab'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import animationData from '../../../public/animations/thumbs-up.json'
import PrimaryButton from '../PrimaryButton'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BenefitsSection = () => {
  // State for when animation starts
  const [startAnimation, setStartAnimation] = useState(false);
  // Window width to change the animation direction based on screen size
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo('.benefit-heading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.benefit-heading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.benefit-subheading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.benefit-subheading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.benefit-line', {
      opacity: 0,
      x: -200
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.benefit-line',
        start: 'top 80%'
      },
    })

    // Tabs Slide-in Animation
    gsap.fromTo('.tabs', {
      opacity: 0,
      x: windowWidth >= 768 ? -200 : 200,  // -200 for desktop, 200 for mobile
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.tabs',
        start: 'top 80%',
      },
    })

    // Lottie Animation Slide-in from the Right
    gsap.fromTo('.animation', {
      opacity: 0,
      x: 200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.animation',
        start: 'top 80%',
      },
      onEnter: () => {
        if (lottieRef.current) {
          lottieRef.current.goToAndStop(0, true);  // Ensure it starts from the beginning
          setStartAnimation(true);  // Trigger the animation
        }
      }
    })

  }, []); 

  // Start the animation when in view
  useEffect(() => {
    if (startAnimation && lottieRef.current) {
      lottieRef.current.goToAndPlay(0, true); // Start animation from the beginning
    }
  }, [startAnimation]);

  return (
    <section className='w-screen bg-light-blue relative z-10 rounded-[24px] md:rounded-[32px] -mt-24 pb-24 md:pt-24 overflow-hidden'>
        <div className='flex flex-col container'>
            <div className='flex flex-col'>
                <h2 className='benefit-heading'>A LONG-LASTING DIGITAL <span className='text-yellow-primary'>PARTNER </span>COMMITED TO YOUR SUCCESS</h2>
                <h3 className="subheading benefit-subheading">STRATEGY - VISION - GROWTH</h3>
                <div className='w-full h-[2px] bg-yellow-primary md:hidden benefit-line' />
            </div>
            <div className='flex flex-col md:flex-row md:justify-between mt-24'>
                <div className='md:w-[50%] tabs'>
                  <BenefitTab
                    header="STRESS-FREE"
                    subheader="DOMAIN, HOSTING, UPDATES -- WE DO IT ALL."
                    copy='Forget the clutter of traditional website builders that overpromise and underdeliver. We strip away unnecessary features that cause websites to underperform. Our approach gives you a high-performing website without the hassle, so you can focus on what you do best—running your business.'
                    />
                  <BenefitTab
                    header="SUPPORT"
                    subheader="BUILD AN ON-GOING DIGITAL PARTNERSHIP."
                    copy="We’re more than just a service provider—we’re your digital partner. From launch to long-term success, we’re here every step of the way, offering continuous support & guidance. Your growth is our priority, and we're committed to ensuring your website thrives as your business does."
                    />
                  <BenefitTab
                    header="TAILORED"
                    subheader="WE RESEARCH EVERY INDUSTRY FOR OUR CLIENTS."
                    copy="We dive deep into your industry & target audience, crafting a website that’s not just visually appealing but strategically designed to resonate with your customers. This approach ensures that your site isn’t just another template—it is a powerful tool tailored to achieve your business goals."
                    />
                  <BenefitTab
                    header="HAND-CODED"
                    subheader="COMPLETELY CUSTOM WEBSITES. YOU WANT IT, WE BUILD IT."
                    copy="Experience the freedom of limitless customization with completely hand-coded websites. Unlike cookie-cutter templates, your website will be built from the ground up, allowing for unique features and designs that perfectly align with your vision and business needs."
                    />

                    <PrimaryButton text="VIEW PACKAGES" link='/#website-packages' classes='bg-yellow-primary text-black-primary w-full my-4' />
                </div>

                {/* Lottie Animation */}
                <div className='my-8 md:my-0 animation'>
                  <Lottie lottieRef={lottieRef} animationData={animationData} loop={false} className='h-[200px] md:h-[400px] md:mt-8' />  
                </div>
            </div>
        </div>
    </section>
  )
}

export default BenefitsSection
