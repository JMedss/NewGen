
import Link from "next/link"

export default async function Home() {

  return (
   <div>
    <h1 className="py-4 font-bold">NewGen Digital Media</h1>
    <div className="flex gap-2">
      <button className="bg-[#fee302] shadow-md px-4 py-2">
        <Link href="/login">Login</Link> <br />
      </button> 
      <button className="bg-[#fee302] shadow-md px-4 py-2">
          <Link href="/register">Register</Link>
      </button>
    </div>
   </div>
  )
}
