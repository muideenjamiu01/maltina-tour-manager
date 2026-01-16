import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import Image from "next/image"
import VotingEnded from "@/components/website/vote/VotingEnded"

export default function VoteEnd() {
  return (
     <div className="relative min-h-screen pt-20">
         
       
         <Image
           src="/assets/background.png"
           alt="Vote background"
           fill
           priority
           className="object-cover"
         />
          <div className="relative z-10">
      
     

      <VotingEnded />
     

  
    </div>
    </div>
  )
}
