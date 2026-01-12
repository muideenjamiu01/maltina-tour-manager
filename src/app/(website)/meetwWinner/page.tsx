import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import MeetWinner from "@/components/website/MeetWinner"
import Image from "next/image"


export default function MeettheWinners() {
  return (
     <div className="relative min-h-screen">
      
    
      <Image
        src="/assets/background.png"
        alt="Vote background"
        fill
        priority
        className="object-cover"
      />
       <div className="relative z-10">
      {/* Header */}
      <Navbar />

      <MeetWinner />

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
