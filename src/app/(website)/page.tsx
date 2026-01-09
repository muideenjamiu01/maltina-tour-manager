import Header from "./components/layout/Header"
import HeroCanvas from "./components/HeroCanvas"
import HeroOverlay from "./components/HeroOverlay"
import Footer from "./components/layout/Footer"
import IntroSection from "./components/IntroSection"
import ChildrenReached from "./components/ChildrenReached"
//import HowItWorks from "./components/HowItWorks"
//import CallToAction from "./components/CallToAction"

export default function Home() {
  return (
    <main
      className="w-full overflow-hidden bg-fixed bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/assets/background.png')" }}
    >
      
      {/* HERO CANVAS (Bus background + overlays) */}
      <HeroCanvas>
        <Header />
        <HeroOverlay />
      </HeroCanvas>
       <IntroSection /> 
        <ChildrenReached />
       {/* <HowItWorks /> */}
      {/*<CallToAction /> *
      {/* Footer */}
      <Footer />
    </main>
  )
}
