"use client"
import { useSession } from "next-auth/react"
import SignOutBtn from "../components/SignOutBtn"


const Dashboard = () => {

  const { data: session } = useSession()


  return (
    <main>
        <section className='w-screen min-h-screen flex flex-col items-center'>
            <h1 className='text-white text-3xl font-bold'>Dashboard</h1>
            <h2>{JSON.stringify(session?.user?.name)}</h2>
            <SignOutBtn />
        </section>
    </main>
  )
}

export default Dashboard
