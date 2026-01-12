import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import AlreadyVoted from "@/components/website/AlreadyVoted"
import Image from "next/image"


export default function lookLike() {
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

      <AlreadyVoted />
     

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
