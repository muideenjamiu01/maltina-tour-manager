"use client"

import Image from "next/image"
import { useState, useMemo, useEffect } from "react"
import VoteHero from "@/components/website/vote/VoteHeroforFav"
import VoteStats from "@/components/website/vote/VoteStats"
import VoteFilters from "@/components/website/vote/VoteFilters."
import VoteGrid from "@/components/website/vote/VoteGrid"
import VotingRules from "@/components/website/vote/VotingRules"
import { Design, Filters } from '@/types/vote.types'
import { fetchDesigns } from '@/lib/api/vote'

export default function VoteForFavorite() {
  const [designs, setDesigns] = useState<Design[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    category: "All",
    zone: "All",
    sort: "popular",
    time: "all",
  })

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchDesigns()
      .then((data) => {
        if (mounted) setDesigns(data)
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const filteredDesigns = useMemo(() => {
    let result = [...designs]

    if (filters.category !== "All") {
      result = result.filter((d) => d.category === filters.category)
    }

    if (filters.zone !== "All") {
      result = result.filter((d) => d.zone === filters.zone)
    }

    if (filters.sort === "popular") {
      result.sort((a, b) => b.votes - a.votes)
    }

    if (filters.sort === "newest") {
      result.sort(
        (a, b) => new Date((b.date || '')).getTime() - new Date((a.date || '')).getTime()
      )
    }

    return result
  }, [filters, designs])

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
   

      {/* Hero Section (Title + subtitle + background) */}
      <VoteHero />

      {/* Stats row (Days left, Votes, Designs, etc.) */}
      <VoteStats />

      {/* Filters (Category, Zone, Sort) */}
      <VoteFilters filters={filters} setFilters={setFilters} />

      {/* Design Cards Grid */}
      <VoteGrid designs={filteredDesigns} />

      {/* Voting Rules */}
      <VotingRules />

      {/* Footer */}
  
    </div>
    </div>
  )
}

