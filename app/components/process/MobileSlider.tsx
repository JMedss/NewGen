"use client";
import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import Slide from './Slide';
import meetingData from '../../../public/animations/meeting.json';
import researchData from '../../../public/animations/research.json';
import wireframeData from '../../../public/animations/wireframe.json';
import designData from '../../../public/animations/design.json';
import developData from '../../../public/animations/develop.json';
import launchData from '../../../public/animations/launch.json';

type MobileSliderProps = {
  inView: boolean;
};

const MobileSlider = ({ inView }: MobileSliderProps) => {
    // Window width to change the animation direction based on screen size
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [initialLoad, setInitialLoad] = useState(true);

    //use effect to set initial load to false after inView is true

    useEffect(() => {
      if (inView) {
        setInitialLoad(false);
      }
    }, [inView]);
  
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


  const [activeIndex, setActiveIndex] = useState(0);
  const slideWidth = 340; // Update with your slide width
  const slideMargin = windowWidth < 640 ? 4 : 8 // Update with your slide margin
  const slideAmount = windowWidth < 640 ? 356 : 3
  const slides = [
    {
      header: 'GETTING STARTED',
      subheader: 'FIRST STEP',
      tab: 'MEETING',
      bulletPoints: {
        bulletOne: 'Discuss business goals & needs',
        bulletTwo: 'Discuss target audience & value proposition',
        bulletThree: 'Discuss key features for the website',
        bulletFour: 'Explore design preferences',
        bulletFive: 'Exchange logos, fonts, colors, etc',
        bulletSix: 'Set timelines for the project',
      },
      animationData: meetingData,
      animationName: 'meetingData',
    },
    {
      header: 'CONDUCT RESEARCH',
      subheader: 'INDUSTRY OVERVIEW',
      tab: 'RESEARCH',
      bulletPoints: {
        bulletOne: 'Identify target audience behaviors',
        bulletTwo: 'Identify target audience pain points',
        bulletThree: 'Research SEO practices for industry',
        bulletFour: 'Analyze competitor websites',
        bulletFive: 'Identify industry trends',
        bulletSix: 'Begin writing copy for website',
      },
      animationData: researchData,
      animationName: 'researchData',
    },
    {
      header: 'WIREFRAMING',
      subheader: 'STRUCTURE & FLOW',
      tab: 'WIREFRAME',
      bulletPoints: {
        bulletOne: 'Outline overall layout of the website',
        bulletTwo: 'Map out user journey for the website',
        bulletThree: 'Identify essential elements like CTAs, forms, and interactive features',
        bulletFour: 'Incorporate placeholder content for visualization',
        bulletFive: 'Begin gathering content for the website',
        bulletSix: 'Review and refine wireframes based on initial feedback',
      },
      animationData: wireframeData,
      animationName: 'wireframeData',
    },
    {
      header: 'CRAFT THE DESIGN',
      subheader: 'BRINGING IDEAS TO LIFE',
      tab: 'DESIGN',
      bulletPoints: {
        bulletOne: 'Begin creating an aesthetically pleasing UI',
        bulletTwo: 'Apply brand colors, typography, and visual elements consistently',
        bulletThree: 'Ensure the design is responsive',
        bulletFour: 'Ensure accessibility standards are met in the designs',
        bulletFive: 'Optimize design assets for fast loading and performance',
        bulletSix: 'Refine designs based on initial feedback',
      },
      animationData: designData,
      animationName: 'designData',
    },
    {
      header: 'BUILD THE WEBSITE',
      subheader: 'WEBSITE CONSTRUCTION',
      tab: 'DEVELOP',
      bulletPoints: {
        bulletOne: 'Set up the technical foundation for a high-performing website',
        bulletTwo: 'Ensure the website is optimized for search engines',
        bulletThree: 'Create custom that meet your business needs',
        bulletFour: 'Build reusable components for a maintainable codebase',
        bulletFive: 'Make sure the website looks great and works perfectly on all devices',
        bulletSix: 'Implement best practices for performance & long-term maintenance',
      },
      animationData: developData,
      animationName: 'developData',
    },
    {
      header: 'LAUNCH DAY',
      subheader: 'GOING LIVE',
      tab: 'LAUNCH',
      bulletPoints: {
        bulletOne: 'Conduct thorough testing to ensure everything works perfectly',
        bulletTwo: 'Finalize content and make last-minute adjustments',
        bulletThree: 'Ensure SEO settings are in place for search engine visibility',
        bulletFour: 'Set up analytics to track website performance and user behavior',
        bulletFive: 'Deploy the website to a VPS',
        bulletSix: 'Monitor the website post-launch for any issues',
      },
      animationData: launchData,
      animationName: 'launchData',
    },
  ];

  const handleSwipedLeft = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleSwipedRight = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipedLeft,
    onSwipedRight: handleSwipedRight,
    trackMouse: true,
  });


  const translateX = -activeIndex * slideAmount

  return (
    <div
      {...handlers}
      className="slider-container absolute-center w-screen md:hidden"
    >
      <div
        className="slider flex items-start"
        style={{
          paddingLeft: activeIndex === 0 ? 'calc(50% - 170px)' : 'pl-0',
          transform: `translateX(${translateX}px)`,
          transition: initialLoad && activeIndex === 0 ? 'none' : 'transform 0.5s ease',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide flex-shrink-0 mr-4 sm:mr-8"
          >
            <Slide
              header={slide.header}
              subheader={slide.subheader}
              tab={slide.tab}
              bulletPoints={slide.bulletPoints}
              animationData={slide.animationData}
              animationName={slide.animationName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSlider;
