import ConfirmVoteSection from "@/components/website/vote/ConfirmVote"
import Image from "next/image"

export default function BeforeConfirming() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/background.png"
        alt="Vote background"
        fill
        priority
        className="object-cover"
      />

      {/* Page content */}
      <div className="relative z-10 min-h-screen">
        <ConfirmVoteSection />
      </div>
    </div>
  )
}
