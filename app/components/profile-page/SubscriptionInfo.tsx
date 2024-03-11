"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Stripe from 'stripe'
import ChangePaymentModal from './ChangePaymentModal'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CancelSubscriptionModal from './CancelSubscriptionModal'
import DeleteAccountModal from './DeleteAccountModal'

type Proptypes = {
  subscriptions: Stripe.Subscription[] | undefined | null,
  cardInfo: {
    brand: string,
    last4: string,
    exp_month: string,
    exp_year: string
  } | undefined | null,
  invoice: string | null | undefined,
  customerStripeId: string | undefined,
  customerId: string | undefined,
  provider: string | undefined
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const SubscriptionInfo = ({ subscriptions, cardInfo, invoice, customerStripeId, customerId, provider }: Proptypes) => {
  // state for loading
  const [loading, setLoading] = useState(true)
  // State for no active subscriptions
  const [noSubscription, setNoSubscription] = useState(false)

  // useEffect to check if subscriptions & cardInfo is loaded 
  useEffect(() => {
    if(subscriptions && cardInfo) {
      setLoading(false)
    } else if (subscriptions === null || cardInfo === null || invoice === null) {
      setNoSubscription(true)
      setLoading(false)
    }
  }, [subscriptions, cardInfo, invoice, noSubscription])
  // State for changing payment method modal
  const [showChangePaymentMethod, setShowChangePaymentMethod] = useState(false)

  // Function to handle change payment method modal
  const handleChangePayment = () => {
    setShowChangePaymentMethod(true)
  }

  // State for cancel subscription modal
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] = useState(false)

  // Function to handle cancel subscription modal
  const handleCancelSubscription = () => {
    setShowCancelSubscriptionModal(true)
  }

    // State for deleting account modal
    const [showDeleteAccount, setShowDeleteAccount] = useState(false) 

    // Function to handle delete account modal
    const handleDeleteAccount = () => {
        setShowDeleteAccount(true)
    }

  return (
    <div className="w-full border border-[#fee302] shadow-inner shadow-black py-8 px-2 min-w-[320px] lg:min-w-[650px]">
        <div className='flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-4'>
          <div className='w-full flex flex-col items-center lg:items-start'>
            <div className='flex justify-start w-full py-2 px-2 max-w-[400px] lg:max-w-full'>
              <h4 className="font-bold text-[20px] text-[#fee302] tracking-wider">Active Subscription: </h4>
            </div>
            <div className='flex items-center justify-center border border-gray-400 w-full h-full py-2 px-2 max-w-[400px] lg:max-w-[800px] lg:h-[120px]'>
                {loading && <p className='text-[#fee302] font-bold'>Loading...</p>}
                {subscriptions && cardInfo && (
                <div className='flex flex-col lg:flex-row lg:items-center lg:gap-10'>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='font-bold text-white text-[22px]'>${(subscriptions[0]?.items?.data[0]?.price?.unit_amount ?? 0) / 100}/MO</p>
                      <p className='text-gray-400 text-[18px] text-center'>{subscriptions[0].items.data[0].plan.nickname}</p>
                    </div>
                    <div className='flex flex-col items-center w-full h-full gap-4'>
                      <div>
                        <div className='flex items-center'>
                          <div className='flex flex-col lg:flex-row'>
                            <p className='text-[#fee302] mr-1 lg:text-[14px]'>Default Payment Method: </p>
                            <div className='flex items-center'>
                              <p className='text-white lg:text-[16px] mr-1'>{cardInfo.brand.toUpperCase()} </p>
                              <p className='text-white lg:text-[16px] mr-1'><span className='text-[12px]'>**** **** ****</span> {cardInfo.last4} </p>
                              <p className='text-white lg:text-[16px] mr-1'>{cardInfo.exp_month} </p>
                              <p className='text-white lg:text-[16px]'>{cardInfo.exp_year}</p>
                            </div>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          <div className='flex flex-col lg:flex-row mr-4'>
                            <p className='text-[#fee302] mr-1 lg:text-[14px]'>Current Billing Cycle: </p>
                            <p className='text-white lg:text-[12px]'>{new Date(subscriptions[0].current_period_start * 1000).toLocaleDateString()} - {new Date(subscriptions[0].current_period_end * 1000).toLocaleDateString()}</p>
                          </div>
                          <div className='flex items-center'>
                            <Link 
                            className='text-[#fee302] text-center lg:text-[16px] hover:underline'
                            href={invoice ? invoice : ""}
                            target='_blank'
                            rel='noreferrer noopener'
                            >View Latest Invoice</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                )}
                {noSubscription && <p className='text-[#fee302] font-bold'>No Active Subscription</p>}
            </div>
          </div>


          <div className='flex flex-col items-center w-full lg:w-[375px] xl:w-[50%]'>
            <div className='w-full py-2 px-2 max-w-[400px]'>
              <h4 className="font-bold text-[20px] text-[#fee302] tracking-wider">Manage Subscription: </h4>
            </div>
            <div className='flex items-center justify-center border border-gray-400 w-full max-w-[400px] py-2 px-2 lg:h-[120px]'>
                  <div className='flex flex-col w-full gap-2'>
                      <button disabled={noSubscription} onClick={handleChangePayment} className='bg-gray-500 lg:text-[18px] lg:px-0 hover:scale-100 hover:translate-y-0 hover:opacity-90 disabled:hidden'>Change Payment Method</button>
                      <button disabled={noSubscription} onClick={handleCancelSubscription} className='bg-gray-500 lg:text-[18px] lg:px-0 hover:scale-100 hover:translate-y-0 hover:opacity-90 disabled:hidden'>Cancel Subscription</button>
                      <button onClick={handleDeleteAccount} className='bg-red-500 lg:text-[18px] lg:px-0 hover:scale-100 hover:translate-y-0 hover:opacity-90'>Delete Account</button>
                  </div>
            </div>
          </div>
        </div>
        <div>
          <Elements stripe={stripePromise}>
            <ChangePaymentModal state={showChangePaymentMethod} setState={setShowChangePaymentMethod} customerStripeId={customerStripeId} customerId={customerId} subscriptions={subscriptions}/>
          </Elements>
          <CancelSubscriptionModal state={showCancelSubscriptionModal} setState={setShowCancelSubscriptionModal}  subscriptions={subscriptions} customerId={customerId}/>
          <DeleteAccountModal state={showDeleteAccount} setState={setShowDeleteAccount} stripeId={customerStripeId} userId={customerId} provider={provider}/>
        </div>
    </div>
  )
}

export default SubscriptionInfo