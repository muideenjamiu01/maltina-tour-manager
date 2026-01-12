import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import VoteRecordedSection from "@/components/website/VoteRecorded"
import Image from "next/image"


export default function VoteRecorded() {
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
        <VoteRecordedSection />
      
     

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
