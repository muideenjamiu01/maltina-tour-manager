
import VoteRecordedSection from "@/components/website/vote/VoteRecorded"
import Image from "next/image"


export default function VoteRecorded() {
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
     
        <VoteRecordedSection />
      
    
    </div>
    </div>
  )
}
