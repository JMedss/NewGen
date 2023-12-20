import Link from "next/link"
import Hero from "./components/hero/Hero"
import Services from "./components/services/Services"
import PricingSection from "./components/pricingsection/PricingSection"

export default async function Home() {

  return (
      <main>
        <Hero />
        <Services />
        <PricingSection />
      </main>
  )
}
