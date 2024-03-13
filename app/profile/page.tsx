"use client"
import { useSession } from "next-auth/react"
import { Session } from "inspector"
import { useState, useEffect } from "react"
import AccountInfo from "../components/profile-page/AccountInfo"
import SubscriptionInfo from "../components/profile-page/SubscriptionInfo"
import Stripe from "stripe"


interface CustomSession extends Session {
  expires: string,
  user: {
    id: string,
    provider?: string,
    name?: string | null,
    email?: string | null,
    image?: string | null
  }
}

type Greeting = "Good Morning" | "Good Afternoon" | "Good Evening"

const Profile = () => {
  // Get the session
  let { data: session, status } = useSession()

  // State for basic information
    const [customer, setCustomer] = useState<{
    id?: string,
    provider?: string,
    name?: string | null,
    email?: string | null,
    image?: string | null
  }>({})

  // useEffect to set the state
  useEffect(() => {
    // Check if there's a session and session data is available
    if (session && (session as CustomSession).user) {
      // Extract user information from the session
      const { id, provider, name, email, image } = (session as CustomSession).user
      // Update the customer state with the extracted information
      setCustomer({ id, provider, name, email, image })
    }
  }, [session])

  // initialize customer & subscription state for stripe
  const [subscriptions, setSubscriptions] = useState<Stripe.Subscription[] | null >()
  const [customerInfo, setCustomerInfo] = useState<Stripe.Customer | null>()
  const [cardInfo, setCardInfo] = useState<{
    type: string,
    brand: string,
    last4: string,
    exp_month: string,
    exp_year: string,
    linkUrl: string
  } | null >()
  const [invoice, setInvoice] = useState<string | null | undefined>()
  // get the customer & supscription info from stripe
  useEffect(() => {
    try {
    if(session && customer && customer.email && customer.id) {
      const getCustomer = async () => {
        const response = await fetch("/api/get-customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ sessionEmail: customer.email, sessionId: customer.id})
        })
        const data = await response.json()
        if(data.subscriptions && data.cardInfo && data.latestInvoice && data.customer) {
          setInvoice(data.latestInvoice)
          setCardInfo(data.cardInfo)
          setSubscriptions(data.subscriptions)
          setCustomerInfo(data.customer)
        } else if (!data.subscriptions && !data.cardInfo && !data.latestInvoice) {
          setSubscriptions(null)
          setCardInfo(null)
          setInvoice(null)
          setCustomerInfo(data.customer)
        } else if (response.status === 404) {
          setCustomerInfo(null)
        }
      }
      getCustomer()
    }
  } catch (error) {
    throw new Error("Error getting customer")
  }
  }, [customer, status])

  // State for if card type is link or card
  const [cardType, setCardType] = useState<"link" | "card" | null>()
  // useEffect to set the card type
  useEffect(() => {
    if(cardInfo) {
      if(cardInfo.type === "card") {
        setCardType("card")
      } else if(cardInfo.type === "link"){
        setCardType("link")
      } else {
        setCardType(null)
      }
    }
  }, [cardInfo])


  // function to get the time of day and returns the proper greeting
  const getGreeting = () => {
    //get & format the time
    const timestamp = new Date().getTime()
    const time = new Date(timestamp).toLocaleString() 
    const hours = time.split(" ")[1].split(":")[0]
    // convert hours to number
    const hoursNum = parseInt(hours)
    const AM_PM = time.split(" ").pop()

    if (AM_PM === "AM") {
      return "Good Morning"
    } else if (AM_PM === "PM" && hoursNum < 5) {
      return "Good Afternoon"
    } else {
      return "Good Evening"
    }
  }
  // Get The Time
  const greeting: Greeting = getGreeting()
  return (
    <main>
      <section className="w-screen min-h-screen">
        <div className="flex flex-col w-[80%] mx-auto gap-10">
          <h3 className="text-white font-bold text-[24px] my-12 tracking-wider">{greeting}, {session?.user?.name}</h3>
          <AccountInfo email={customer.email} name={customer.name} provider={customer.provider} id={customer.id} stripeId={customerInfo?.id}/>
          <SubscriptionInfo subscriptions={subscriptions} cardInfo={cardInfo} invoice={invoice} customerStripeId={customerInfo?.id} customerId={customer.id} provider={customer.provider} cardType={cardType}/>
        </div>
      </section>
    </main>
  )
}

export default Profile
