"use client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Dashboard = () => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div>
      <h1>Account Dashboard</h1>
      <p>Hi, {session?.user?.name}</p>
      <div className="flex gap-2">
      <button className="bg-[#fee302] shadow-md px-4 py-2"><Link href="/pricing">Pricing</Link></button>
      <button onClick={() => signOut()} className="bg-[#fee302] shadow-md px-4 py-2">Sign Out</button>
      </div>
    </div>
  )
}

export default Dashboard

