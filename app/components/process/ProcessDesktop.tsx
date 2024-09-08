"use client"
import React, { useState } from 'react';
import TabContent from './TabContent';
import PrimaryButton from '../PrimaryButton';
import meetingData from '../../../public/animations/meeting.json'
import researchData from '../../../public/animations/research.json'
import wireframeData from '../../../public/animations/wireframe.json'
import designData from '../../../public/animations/design.json'
import developData from '../../../public/animations/develop.json'
import launchData from '../../../public/animations/launch.json'

const tabs = ['Meeting', 'Research', 'Wireframe', 'Design', 'Develop', 'Launch'];

const ProcessDesktop = () => {


   // State to track the active tab
  const [activeTab, setActiveTab] = useState(0)

  // Set the active tab when a button is clicked
  const handleTabClick = (index: number) => {
    setActiveTab(index)
  };

  return (
    <div className='hidden md:flex flex-col bg-light-blue overflow-hidden rounded-[8px] pb-2 border border-white/50'>
      <div className="flex w-full items-center font-medium text-white-primary text-[20px] lg:text-[22px] justify-around">
      {tabs.map((tab, index) => (
          <button
            aria-label={`${tab} tab`}
            key={tab}
            aria-controls={tab.toLowerCase()}
            onClick={() => handleTabClick(index)}
            className={`w-full py-2 transition-colors duration-300 custom-outline ${
              index === activeTab ? 'bg-black/20 text-yellow-primary' : ''
            } ${
              index === 0 ? 'rounded-tl-[8px]' : ''
            } ${
              index === tabs.length - 1 ? 'rounded-tr-[8px]' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='flex items-center w-full overflow-hidden'>
        <div
          className='flex w-full transition-transform duration-300'
          style={{ transform: `translateX(-${activeTab * 100}%)` }} // Slide content based on active tab
        >
          <div className="w-full flex-shrink-0">
            <TabContent
              header='GETTING STARTED'
              subheader='FIRST STEP'
              bulletPoints={{
                bulletOne: 'Discuss business goals & needs',
                bulletTwo: 'Discuss target audience & value proposition',
                bulletThree: 'Discuss key features for the website',
                bulletFour: 'Explore design preferences',
                bulletFive: 'Exchange logos, fonts, colors, etc',
                bulletSix: 'Set timelines for the project'
              }}
                animationData={meetingData}
                animationName='meetingData'
            />
          </div>
          <div className="w-full flex-shrink-0">
            <TabContent
              header='CONDUCT RESEARCH'
              subheader='INDUSTRY OVERVIEW'
              bulletPoints={{
                bulletOne: 'Identify target audience behaviors',
                bulletTwo: 'Identify target audient pain points',
                bulletThree: 'Research SEO practices for industry',
                bulletFour: 'Analyze competitor websites',
                bulletFive: 'Identify industry trends',
                bulletSix: 'Begin writing copy for website'
              }}
              animationData={researchData}
              animationName='researchData'
            />
          </div>
          <div className="w-full flex-shrink-0">
            <TabContent
              header='WIREFRAMING'
              subheader='STRUCTURE & FLOW'
              bulletPoints={{
                bulletOne: 'Outline overall layout of the website',
                bulletTwo: 'Map out user journey for the website',
                bulletThree: 'Identify essential elements like CTAs, forms, and interactive features',
                bulletFour: 'Incorporate placeholder content for visualization',
                bulletFive: 'Begin gathering content for the website',
                bulletSix: 'Review and refine wireframes based on initial feedback'
              }}
              animationData={wireframeData}
              animationName='wireframeData'
            />
          </div>
          <div className="w-full flex-shrink-0">
            <TabContent
              header='CRAFT THE DESIGN'
              subheader='BRINGING IDEAS TO LIFE'
              bulletPoints={{
                bulletOne: 'Begin creating an aesthetically pleasing UI',
                bulletTwo: 'Apply brand colors, typography, and visual elements consistently',
                bulletThree: 'Ensure the design is responsive',
                bulletFour: 'Ensure accessibility standards are met in the designs',
                bulletFive: 'Optimize design assets for fast loading and performance',
                bulletSix: 'Refine designs based on initial feedback'
              }}
              animationData={designData}
              animationName='designData'
            />
          </div>
          <div className="w-full flex-shrink-0">
            <TabContent
              header='BUILD THE WEBSITE'
              subheader='WEBSITE CONSTRUCTION'
              bulletPoints={{
                bulletOne: 'Set up the technical foundation for a high-performing website',
                bulletTwo: 'Ensure the website is optimized for search engines',
                bulletThree: 'Create custom that meet your business needs',
                bulletFour: 'Build reusable components for a  maintainable codebase',
                bulletFive: 'Make sure the website looks great and works perfectly on all devices',
                bulletSix: 'Implement best practices for performance & long-term maintenance'
              }}
              animationData={developData}
              animationName='developData'
            />
          </div>
          <div className="w-full flex-shrink-0">
            <TabContent
              header='LAUNCH DAY'
              subheader='GOING LIVE'
              bulletPoints={{
                bulletOne: 'Conduct thorough testing to ensure everything works perfectly',
                bulletTwo: 'Finalize content and make last-minute adjustments',
                bulletThree: 'Ensure SEO settings are in place for search engine visibility',
                bulletFour: 'Set up analytics to track website performance and user behavior',
                bulletFive: 'Deploy the website to a VPS',
                bulletSix: 'Monitor the website post-launch for any issues'
              }}
              animationData={launchData}
              animationName='launchData'
            />
          </div>
          
        </div>
      </div>
      <div className='flex w-full justify-center'>
        <PrimaryButton text="VIEW PACKAGES" link="/#website-packages" classes='bg-yellow-primary text-black-primary w-[50%] my-4 lg:my-8' />
      </div>
    </div>
  );
};

export default ProcessDesktop;
