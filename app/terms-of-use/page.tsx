import React from 'react'
import TermsCard from '../components/termsofuse/TermsCard'

const TermsOfUse = () => {
  return (
    <main>
        <section className='flex justify-center'>
            <div className='w-[75%] min-w-[300px] max-w-[700px] flex flex-col justify-center'>
                <div className='flex w-full justify-center my-12 text-[16px]'>
                    <h2 className=''>Terms of Use</h2>
                </div>
                <div className='flex flex-col gap-8'>
                    <TermsCard 
                    id="introduction" 
                    header='Welcome To NewGen Digital Media' 
                    subheader='Introduction' 
                    paragraphOne='Thank you for choosing NewGen Digital Media for your website development and hosting needs. We specialize in building websites from scratch for our clients and offering tailored hosting solutions to ensure your digital presence is robust, reliable, and responsive.'
                     paragraphTwo='By using our services your are agreeing to the following terms of use. Please read them carefully and contact us if you have any questions.'
                     />

                    <TermsCard 
                    id="services" 
                    header='Our Services' 
                    subheader='Website Development and Hosting Plans' 
                    paragraphOne='Our website development services are tailored to meet the needs of our clients. We can design and develop a website from scratch or update an existing website. We use modern technologies and frameworks to ensure your website is responsive, reliable, and robust such as Node.js, React, MongoDB, and more.'
                     paragraphTwo='Our hosting plans are designed to meet the needs of our clients. Some people do not need many changes and updates to their website and only need a reliable hosting solution. We offer a basic hosting plan for these clients. Other clients need regular updates and changes to their website and we offer a hosting & maintenance plan for these clients.'
                     />

                    
                    <TermsCard 
                    id="access" 
                    header='Access to Data and Consumer Information' 
                    subheader='Data Collection and Privacy' 
                    paragraphOne='Due to the nature of our services, if your website involves collecting consumer data, we will need to access this data to ensure your website is functioning properly & make updates if needed. We will never share this data with any third parties and will only use it to ensure your website is functioning properly.'

                     paragraphTwo='Read our privacy policy for more information on how we handle consumer data, what data we collect, and how we use it. This is more tailored to our hosting & maintenance clients, not the consumers of our clients.'
                     />

                    <TermsCard 
                    id="usersResponsibility" 
                    header='User Responsibilities' 
                    subheader='Up to Date Information' 
                    paragraphOne='Clients should ensure that the information they provide is accurate and up-to-date. This includes contact information, billing information, and any other information that is required to ensure your website is functioning properly.'

                     paragraphTwo='Clients are responsible for ensuring that their content and data collection practices comply with all applicable laws and regulations. This includes but is not limited to GDPR, CCPA, and other data privacy laws.'
                    />

                    <TermsCard 
                    id="cancelationRefunds" 
                    header='Cancellation & Refund Policy' 
                    subheader='Cancellation' 
                    paragraphOne='Clients can cancel their hosting plan at any time. Upon cancellation you will recieve the files for your website and your website will remain up for the remainder of your billing cycle. If you would like to cancel your website development services, please go to your profile page.'

                     paragraphTwo='Refunds are not available for our services. You have the right to cancel your hosting plan at any time and you will not be billed for the next billing cycle.'
                     />


                    <TermsCard 
                    id="modifications" 
                    header='Terms of Use Modifications' 
                    subheader='Our Right to Modify' 
                    paragraphOne='We reserve the right to modify these terms of use at any time. If we make changes to these terms of use, we will post the changes on our website and notify you by email.'

                     paragraphTwo=''
                     />

                    <TermsCard 
                    id="contact" 
                    header='Contact Us' 
                    subheader='We Are Here to Help' 
                    paragraphOne='If you have any questions about our terms of use, please contact us at any time. We are here to help and are happy to answer any questions you may have.'

                     paragraphTwo=''
                     />
                </div>
            </div>
        </section>
    </main>
  )
}

export default TermsOfUse
