"use client"
import React, { useEffect, useState } from 'react';
import Mobile from './Mobile';
import Desktop from './Desktop';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import PrimaryButton from '../PrimaryButton';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {


  useEffect(() => {
    gsap.fromTo('.features-heading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-heading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.features-subheading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-subheading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.features-line', {
      opacity: 0,
      x: -200
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.features-line',
        start: 'top 80%'
      },
    })
  }, [])

  return (
    <section id='features' className="features-section md:pt-12 lg:pt-24 pb-48 bg-reversed-blue-gradient overflow-hidden">
      <div className="flex flex-col container">
        <div className="flex flex-col">
          <h2 className="features-heading features-heading">
            ENGINEERED FOR <span className="text-yellow-primary">SPEED,</span> OPTIMIZED FOR PERFORMANCE.
          </h2>
          <h3 className="subheading features-subheading">EFFICIENT - FLEXIBLE - IMPACTFUL</h3>
          <div className="features-line w-full h-[2px] bg-yellow-primary md:hidden"></div>
        </div>
        <Mobile />
        <Desktop  />
        <div className='w-full flex justify-center my-24 md:my-32'>
          <PrimaryButton text="VIEW PACKAGES" link='/#website-packages' classes='bg-yellow-primary text-black-primary w-full md:w-[400px]' />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
