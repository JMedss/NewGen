import TermsCard from "../components/termsofuse/TermsCard"

const PrivacyPolicy = () => {
  return (
    <main>
    <section className='flex justify-center bg-blue-gradient mt-[100px] pb-24'>
        <div className='w-[75%] min-w-[300px] max-w-[700px] flex flex-col justify-center'>
            <div className='flex w-full justify-center my-12 text-[16px]'>
                <h2 className=''>Privacy Policy</h2>
            </div>
            <div className='flex flex-col gap-8'>
                <TermsCard 
                id="introduction" 
                header='Welcome To NewGen Digital Media' 
                subheader='Introduction' 
                paragraphOne='Thank you for choosing NewGen Digital Media for your website development and hosting needs. We specialize in building websites from scratch for our clients and offering tailored hosting solutions to ensure your digital presence is robust, reliable, and responsive.'
                 paragraphTwo='By using our services your are agreeing to the following privacy policy. Please read them carefully and contact us if you have any questions.'
                 />
                
                <TermsCard 
                id="dataCollection" 
                header='Data Collection' 
                subheader='How We Use Your Data' 
                paragraphOne='As of now, we only collect data from our clients to process payments and to ensure that our services are functioning properly such as but not limited to email, name, billing address, default payment method, etc. We do not collect any data from the consumers of our clients, but can access it if needed to perform our services. If this changes, we will update our privacy policy and notify our clients.'
                 paragraphTwo='We do plan to collect data to enhance our services in the future. This data will be used to improve our services and to ensure that our services are functioning properly. We will never share this data with any third parties. We do and will comply with laws such as the GDPR and CCPA.'
                 />

                <TermsCard 
                id="dataSecurity" 
                header='Data Security' 
                subheader='How We Store Your Data' 
                paragraphOne='Your basic data is stored securely on our servers. We use modern technologies and frameworks to ensure that your data is secure such as but not limited to Node.js, React, MongoDB, and more. We also use ssl certificates to ensure that your data is encrypted when it is being transmitted. '
                 paragraphTwo='It is important to note, we do not store any payment methods on our servers. These are stored by Stripe, our payment processor. We do not have access to this data. Please read Stripe&apos;s privacy policy for more information. They are industry leaders in payment processing and data security.'
                 />

                <TermsCard 
                id="usersRights" 
                header='User Rights' 
                subheader='Your Rights to Your Data' 
                paragraphOne='You have the right to request a copy of the data we have collected from you. You also have the right to request that we delete this data. Please contact us if you would like to request a copy of your data or if you would like us to delete your data.'
                 paragraphTwo=''
                 />


                <TermsCard 
                id="modifications" 
                header='Privacy Policy Modifications' 
                subheader='Our Right to Modify' 
                paragraphOne='We reserve the right to modify the privacy policy at any time. If we make changes to these terms of use, we will post the changes on our website and notify you by email.'

                paragraphTwo=''
                />

                <TermsCard 
                id="contact" 
                header='Contact Us' 
                subheader='We Are Here to Help' 
                paragraphOne='If you have any questions about our privacy policy, please contact us at any time. We are here to help and are happy to answer any questions you may have.'
                paragraphTwo=''
                />
            </div>
        </div>
    </section>
</main>
    )
}

export default PrivacyPolicy
