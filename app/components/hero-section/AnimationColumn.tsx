"use client"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Descriptor from "./Descriptor"




// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)


const AnimationColumn = () => {
   // Animations
   useEffect(() => {

    // Mobile Icon Animation (slides in from the left)
    gsap.fromTo(".desktop-icon", {
      x: -200, // Start 200px to the left
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".desktop-icon",
        start: "top 80%", // Start 80% from the top 
      }
    })

    // Desktop Icon Animation (slides in from the right)
    gsap.fromTo(".mobile-icon", {
      x: 200, // Start 200px to the right
      opacity: 0,
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out", // Smooth easing
      scrollTrigger: {
        trigger: ".desktop-icon",
        start: "top 80%", 
      }
    })


    // Circle Animation after icons
    gsap.fromTo(".circle", {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      delay: 1,
      scrollTrigger: {
        trigger: ".desktop-icon",
        start: "top 80%",
      }
    })

    // Line Animation after circle
    gsap.fromTo(".line", {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "left center",
    }, {
      opacity: 1,
      scaleX: 1,
      duration: 0.5,
      ease: "power3.out",
      delay: 1.5,
      scrollTrigger: {
        trigger: ".circle",
        start: "top 80%",
      }
    })

    // Descriptor Animation
    gsap.fromTo(".descriptor", {
      scaleX: 0,
      transformOrigin: "left center",
    }, {
      scaleX: 1,
      duration: 0.8,
      ease: "power3.out",
      delay: 2,
      scrollTrigger: {
        trigger: ".line",
        start: "top 80%",
      }
    })
  }, [])

  // Image Sources for binary code animation
  const imgs = [
    "binary_one.svg",
    "binary_two.svg",
    "binary_three.svg",
    "binary_four.svg",
  ]

  // State for changing images
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  // Set Timeout for changing images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % imgs.length)
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Get Screen Size for Responsiveness
  const [screenWidth, setScreenWidth] = useState<number>(0)



  return (
    <div className="flex items-center justify-center w-full md:pt-24 md:justify-end">
      <div className='flex min-w-[350px] md:min-w-[250px] h-[400px] md:h-[300px] lg:min-w-[350px] lg:h-[400px] justify-center items-center relative'>

      
        
        {/* Binary Code */}
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full z-10 opacity-10">
          <Image 
            src={imgs[currentImageIndex]}
            alt='Binary Code Animation'
            aria-hidden='true'
            style={{ height: '100%', width: '100%'  }} 
            height={100}
            width={100}
            priority
          />
        </div>

        {/* Desktop and Mobile Icons */}
        <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-full'>
          <Image 
            className="opacity-80 desktop-icon"
            src='desktopicon.svg'
            alt='Desktop Icon'
            aria-hidden='true'
            style={{ height: 'auto', width: 'auto'}} 
            height={100}
            width={100}
            priority
          />
          {/* Mobile Phone Icon */}
          <div className='absolute -right-2 top-24 z-40 mobile-icon md:w-[100px] lg:w-auto'>
            <Image 
              className="opacity-90"
              src='mobileicon.svg'
              alt='Mobile Icon'
              aria-hidden='true'
              style={{ height: 'auto', width: 'auto'}} 
              height={100}
              width={100}
              priority
            />
          </div>

          {/* Circle, Lines, and Descriptors */}
          <div className="absolute z-50 top-4 left-20 circle md:left-12 lg:left-20">
            <Image
              src='circle.svg'
              alt='Circle Icon'
              aria-hidden='true'
              style={{ height: 'auto', width: '16px'}} 
              height={100}
              width={100}
              priority
            />
          </div>
          <div className="absolute z-50 top-4 left-52 circle md:left-36 lg:left-52">
            <Image
              src='circle.svg'
              alt='Circle Icon'
              aria-hidden='true'
              style={{ height: 'auto', width: '16px'}} 
              height={100}
              width={100}
              priority
            />
          </div>
          <div className="absolute z-50 bottom-24 left-64 circle md:left-44 md:bottom-8 lg:bottom-24 lg:left-64">
            <Image
              src='circle.svg'
              alt='Circle Icon'
              aria-hidden='true'
              style={{ height: 'auto', width: '16px'}} 
              height={100}
              width={100}
              priority
            />
          </div>

          {/* Lines */}
          <div className="absolute z-[60] top-[22px] left-[89px] -rotate-45 line md:left-[56px] lg:left-[89px]">
              <div className="relative bg-yellow-primary h-[2px] w-[32px]">
                  <div className="h-[6px] w-[6px] rotate-45 bg-yellow-primary absolute top-1/2 -translate-y-1/2 right-0" />
              </div>
          </div>

          <div className="absolute z-[60] top-[22px] left-[216px] -rotate-45 line md:left-[154px] lg:left-[216px]">
              <div className="relative bg-yellow-primary h-[2px] w-[38px]">
                  <div className="h-[6px] w-[6px] rotate-45 bg-yellow-primary absolute top-1/2 -translate-y-1/2 right-0" />
              </div>
          </div>

          <div className="absolute z-[60] bottom-[102px] left-[264px] custom-rotate line md:bottom-[40px] md:left-[184px] lg:bottom-[102px] lg:left-[264px]">
              <div className="relative bg-yellow-primary h-[2px] w-[44px]">
                  <div className="h-[6px] w-[6px] rotate-45 bg-yellow-primary absolute top-1/2 -translate-y-1/2 right-0" />
              </div>
          </div>

          {/* Descriptors */}
          <div className="descriptor absolute z-50 -top-[42px] left-16 sm:-top-[45px] md:left-4 lg:left-16">
            <Descriptor text='HAND-CODED' link='/#features' />
          </div>

          <div className="descriptor absolute z-50 -top-[44px] left-52 sm:-top-[48px] md:left-36 lg:left-52">
            <Descriptor text='HIGH-SPEED' link='/#features' />
          </div>

          <div className="descriptor absolute z-50 bottom-[136px] left-[220px] md:bottom-[74px] md:left-[140px] lg:bottom-[136px] lg:left-[220px]">
            <Descriptor text='RESPONSIVE' link='/#features' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationColumn;
