"use client"


import Image from "next/image"

import { useState, useMemo } from "react"
import VoteHero from "@/components/website/vote/VoteHeroforFav"
import VoteStats from "@/components/website/vote/VoteStats"
import VoteFilters from "@/components/website/vote/VoteFilters."
import VoteGrid from "@/components/website/vote/VoteGrid"
import VotingRules from "@/components/website/vote/VotingRules"


// Define the Design type exactly once
export type Design = {
  id: number;
  name: string;
  category: string;
  zone: string;
  votes: number;
  date: string;
  image: string; // required to match VoteGrid
};

// Sample designs data
const designs: Design[] = [
  { id: 1, name: "Student 1", category: "Primary", zone: "North", votes: 120, date: "2024-01-12", image: "/assets/aboy_.png" },
  { id: 2, name: "Student 2", category: "Secondary", zone: "South", votes: 80, date: "2024-01-20", image: "/assets/aboy_.png" },
  { id: 3, name: "Student 3", category: "Primary", zone: "South-West", votes: 80, date: "2024-01-20", image: "/assets/aboy_.png" },
  { id: 4, name: "Student 4", category: "Secondary", zone: "East", votes: 80, date: "2024-01-20", image: "/assets/aboy_.png" },
  { id: 5, name: "Student 5", category: "Secondary", zone: "East", votes: 80, date: "2024-01-20", image: "/assets/aboy_.png" },
];

// Filters type
type Filters = {
  category: string;
  zone: string;
  sort: string;
  time: string;
};



export default function VoteForFavorite() {
    const [filters, setFilters] = useState({
    category: "All",
    zone: "All",
    sort: "popular",
    time: "all",
  })

  const filteredDesigns = useMemo(() => {
    let result = [...designs]

    if (filters.category !== "All") {
      result = result.filter(d => d.category === filters.category)
    }

    if (filters.zone !== "All") {
      result = result.filter(d => d.zone === filters.zone)
    }

    if (filters.sort === "popular") {
      result.sort((a, b) => b.votes - a.votes)
    }

    if (filters.sort === "newest") {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }

    return result
  }, [filters])
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

