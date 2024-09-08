"use client"
import React, { useState } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import PrimaryButton from '../PrimaryButton'

const contentTabs = [
  {
    title: 'WEBSITES AS LOW AS $300',
    content: 'Perfect for small business owners who want to enhance their digital presence without the hassle. Get a one-page optimized website starting at just $300, or upgrade to a multi-page site starting at only $450. Additional pages starting at $100 each. But hurry—this exclusive offer is available for a limited time only!'
  },
  {
    title: 'ANIMATIONS',
    content: 'Spice up your website with eye-catching animations that start at just $20 per page. Perfect for adding that extra flair and keeping your visitors engaged.'
  },
  {
    title: 'SLIDERS',
    content: 'Add dynamic sliders to your website starting at just $25 each. Perfect for showcasing multiple images, testimonials or messages in an interactive and engaging way.'
  },
  {
    title: 'CONTACT FORMS',
    content: 'Every website comes with a built-in contact form, making it easy for your visitors to get in touch with you directly. Need more forms? Additional or customized forms are available starting at just $25 each.'
  },
  {
    title: 'CUSTOM CMS',
    content: "Take control of your website's content with a custom CMS starting at $200. The basic content management systems allow you to easily update and manage your site’s content with just a few clicks."
  },
  {
    title: 'SSL CERTIFICATES',
    content: 'Purchase a hosting plan starting at only $10 per month and enjoy the added security of an SSL certificate. This essential feature provides HTTPS protection, ensuring your site is secure and trusted by visitors.'
  },
]

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const toggleTab = (index: number | null) => {
    setActiveTab(activeTab === index ? null : index);
  }

  return (
    <div className='flex flex-col mt-24 gap-2 md:max-w-[800px]'>
      {contentTabs.map((tab, index) => (
        <div key={index} className='relative mb-2'>
          <div className='flex items-center justify-between py-2 ='>
            <h3 >{tab.title}<span className='text-yellow-primary'>.</span></h3>
            <button 
              aria-label="Learn more"
              onClick={() => toggleTab(index)}
              className={`transition-transform duration-300 ease-in-out transform custom-outline   ${activeTab === index ? 'rotate-180' : 'rotate-0'}`}
            >
              {activeTab === index ? (
                <FaMinus className='text-yellow-primary' size={30}/>
              ) : (
                <FaPlus className='text-yellow-primary' size={30}/>
              )}
            </button>
          </div>
          <div  className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === index ? 'max-h-96' : 'max-h-0'}`}>
            <p aria-hidden={activeTab ? false : true} className='my-2 ext-[16px] lg:text-[18px] font-light text-white-primary/90 leading-[150%] tracking-[1px]'>{tab.content}</p>
            <p aria-hidden={activeTab ? false : true} className='text-yellow-primary text-[12px] text-center mb-2'>*Prices may change depending on complexity*</p>
          </div>
          <div className='absolute bottom-0 w-full h-[1px] bg-yellow-primary transition-width duration-300 ease-in-out' />
        </div>
      ))}
        <PrimaryButton text='GET STARTED' link="/#contact-form" classes="bg-yellow-primary text-black-primary my-6 md:my-8 lg:my-12" />
    </div>
  )
}

export default Tabs

