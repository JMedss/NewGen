import HeroSection from "./components/hero-section/HeroSection"
import DiscountBar from "./components/discount-bar/DiscountBar"
import FeaturesSection from "./components/features/FeaturesSection"
import BenefitsSection from "./components/benefits/BenefitsSection"
import ProcessSection from "./components/process/ProcessSection"
import WebsitePackages from "./components/websitepackages/WebsitePackages"
import HostingPlans from "./components/hosting/HostingPlans"
import CTA from "./components/cta/CTA"



export default async function Home() {

  return (
    <main>
        <HeroSection />
        <DiscountBar />
        <FeaturesSection />
        <BenefitsSection />
        <ProcessSection />
        <WebsitePackages />
        <HostingPlans />
        <CTA />
    </main>
  )
}


 