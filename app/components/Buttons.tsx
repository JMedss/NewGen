"use client"
import { useRouter } from "next/navigation"

const Buttons = () => {
    const router = useRouter()
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      const btnText = e.currentTarget.textContent
      if (btnText === 'Sign In') {
        router.push('/sign-in')
      } else {
        router.push('/register')
      }
    }
  return (
    <div className='flex gap-2'>
        <button className="primary" onClick={handleClick}>Sign In</button>
        <button className="primary" onClick={handleClick}>Register</button>
    </div>
  )
}

export default Buttons
