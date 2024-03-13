"use client"
import { signOut } from "next-auth/react"

const SignOutBtn = () => {
  return (
    <button className="primary" onClick={() => signOut({redirect: true, callbackUrl: "https://www.newgendigitalmedia.com/sign-in"})}>
        Sign Out
    </button>
  )
}

export default SignOutBtn
