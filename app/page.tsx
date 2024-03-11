import Image from "next/image"
import Buttons from "./components/Buttons"



export default async function Home() {

  return (
    <main>
        <section className="w-screen min-h-screen flex justify-center mt-32">
             <div className="flex flex-col items-center">
                  <h1 className="my-32">WEBSITE UNDER CONSTRUCTION</h1> 
                  <Buttons />
             </div>
        </section>
    </main>
  )
}
