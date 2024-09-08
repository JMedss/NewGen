"use client"
import { useEffect, useState } from "react"
import Stripe from "stripe"
import HostingCard from "./HostingCard"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { IoClose } from "react-icons/io5"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
gsap.registerPlugin(ScrollTrigger)

type HostingPlanProps = {
  hostingPlans: Stripe.Plan[]
}


interface CustomSession extends Session {
  user: {
    id: string,
    name?: string | null,
    email?: string | null,
    image?: string | null
  }
}


const Hosting = ({ hostingPlans }: HostingPlanProps) => {
  const { data: session } = useSession()
  let customSession = session as CustomSession
  const router = useRouter()
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [showModal, setShowModal] = useState(false);
 
  const handleSubscribe = (id: string | null) => {
    if (!customSession) {
      setShowModal(true);
    } else {
      router.push(`services/checkout-${id}`)
    }
  }


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    gsap.fromTo('.hosting-heading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hosting-heading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.hosting-subheading', {
      opacity: 0,
      x: -200
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hosting-subheading',
        start: 'top 80%'
      }
    })

    gsap.fromTo('.hosting-container', {
      opacity: 0,
      x: windowWidth > 1279 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hosting-container',
        start: 'top 80%'
      },
    })

    gsap.fromTo('.hosting-box-one', {
      opacity: 0,
      x: windowWidth > 767 && windowWidth < 1280 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hosting-box-one',
        start: 'top 80%'
      },
    })

    gsap.fromTo('.hosting-box-two', {
      opacity: 0,
      x: windowWidth > 767 && windowWidth < 1280 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.hosting-box-two',
        start: 'top 80%'
      },
    })

    gsap.fromTo('.card-one', {
      opacity: 0,
      x: windowWidth < 768 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.card-one',
        start: 'top 80%'
      },
    })
    gsap.fromTo('.card-two', {
      opacity: 0,
      x: windowWidth < 768 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.card-two',
        start: 'top 80%'
      },
    })
    gsap.fromTo('.card-three', {
      opacity: 0,
      x: windowWidth < 768 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.card-three',
        start: 'top 80%'
      },
    })
    gsap.fromTo('.card-four', {
      opacity: 0,
      x: windowWidth < 768 ? 200 : 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.card-four',
        start: 'top 80%'
      },
    })
  }, [windowWidth])

  // turn scrolling off when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal])

  return (
    <div className="flex flex-col container">
        <div className="flex flex-col items-center">
            <h2 className="hosting-heading">HOSTING PLANS</h2>
            <h3 className="hosting-subheading text-center text-[16px] md:text-[18px] lg:text-[20px] font-medium text-yellow-primary md:font-bold leading-[125%]">ALL PLANS INCLUDE FREE DOMAIN</h3>
        </div>
        <div  className="flex flex-col items-center xl:flex-row xl:justify-center mt-12 md:mt-24 gap-8 hosting-container">
            <div className="flex flex-col md:flex-row gap-8 hosting-box-one">
                <div aria-hidden={showModal ? true : false} className="card-one">
                  <HostingCard name={hostingPlans[0].nickname} price={hostingPlans[0].amount} id={hostingPlans[0].id} onSubscribe={handleSubscribe} />
                </div>
                <div aria-hidden={showModal ? true : false} className="card-two">
                  <HostingCard name={hostingPlans[1].nickname} price={hostingPlans[1].amount} id={hostingPlans[1].id} onSubscribe={handleSubscribe} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 hosting-box-two">
                <div aria-hidden={showModal ? true : false} className="card-three">
                  <HostingCard name={hostingPlans[2].nickname} price={hostingPlans[2].amount} id={hostingPlans[2].id} onSubscribe={handleSubscribe} />
                </div>
                <div aria-hidden={showModal ? true : false} className="card-four">
                  <HostingCard name={hostingPlans[3].nickname} price={hostingPlans[3].amount} id={hostingPlans[3].id} onSubscribe={handleSubscribe} />
                </div>
            </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
            <div aria-hidden={showModal ? false : true} className="bg-light-blue  p-4 rounded-[8px] border border-white-primary/50 flex flex-col w-[80%] max-w-[500px]">
            <div className="w-full flex items-center justify-end">
              <button onClick={() => setShowModal(false)} className="">
                <IoClose className="text-yellow-primary text-[24px]" />
              </button>
            </div>
            <div className="w-full flex justify-center">
              <p className="text-white-primary md:text-[18px] lg:text-[20px]">You must register an account & sign in to subscribe to a plan.</p>
            </div>
              <div className="flex items-center justify-center font-light tracking-[1px] text-yellow-primary gap-4 underline my-2 md:text-[18px] lg:text-[20px]">
                <button onClick={() => router.push("/register")}>
                  Register
                </button>
                <button onClick={() => router.push("/sign-in")}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Hosting;
