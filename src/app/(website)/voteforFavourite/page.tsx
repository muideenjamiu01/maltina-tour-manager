import Navbar from "@/components/website/layout/navbar"
import Footer from "@/components/website/layout/footer"
import Image from "next/image"
import VoteHero from "@/components/website/VoteHeroforFav"
import VoteStats from "@/components/website/VoteStats"
import VoteFilters from "@/components/website/VoteFilters."
import VoteGrid from "@/components/website/VoteGrid"
import VotingRules from "@/components/website/VotingRules"

export default function VoteForFavorite() {
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

      {/* Hero Section (Title + subtitle + background) */}
      <VoteHero />

      {/* Stats row (Days left, Votes, Designs, etc.) */}
      <VoteStats />

      {/* Filters (Category, Zone, Sort) */}
      <VoteFilters />

      {/* Design Cards Grid */}
      <VoteGrid />

      {/* Voting Rules */}
      <VotingRules />

      {/* Footer */}
      <Footer />
    </div>
    </div>
  )
}
