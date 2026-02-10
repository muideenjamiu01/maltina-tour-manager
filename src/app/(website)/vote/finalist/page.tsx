"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

import VoteHero from "@/components/website/vote/VoteHeroforFav";
import VoteStats from "@/components/website/vote/VoteStats";
import VoteFilters from "@/components/website/vote/VoteFilters.";
import VoteGrid from "@/components/website/vote/VoteGrid";
import VotingRules from "@/components/website/vote/VotingRules";

import { Design, Filters } from "@/types/vote.types";
import { fetchDesigns } from "@/lib/api/vote";

export default function VoteForFavorite() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    query: "",
    zone: "All",
    sort: "latest",
    time: "all",
  });

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchDesigns()
      .then((data) => {
        if (mounted) setDesigns(data);
      })
      .catch(() => {
        if (mounted) setError("Failed to load designs.");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const filteredDesigns = useMemo(() => {
    let result = designs;

    // Zone filter
    if (filters.zone !== "All") {
      result = result.filter((d) => d.zone === filters.zone);
    }

    // Search filter (by anything)
    if (filters.query.trim() !== "") {
      const q = filters.query.toLowerCase().trim();

      result = result.filter((d) => {
        return (
          (d.name ?? "").toLowerCase().includes(q) ||
          (d.school ?? "").toLowerCase().includes(q) ||
          (d.location ?? "").toLowerCase().includes(q) ||
          (d.zone ?? "").toLowerCase().includes(q) ||
          (d.category ?? "").toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [filters, designs]);

  return (
    <div className="relative min-h-screen pt-20 w-full overflow-hidden">

      {/* Background Image */}
      <Image
        src="/images/websites/vote/background.png"
        alt="Background"
        fill
        priority
        className="object-cover "
      />

      {/* Page Content */}
      <div className="relative z-10 space-y-2">
        <VoteHero />
        <VoteStats />
        <VotingRules />
        <VoteFilters filters={filters} setFilters={setFilters} />

        {error && (
          <div className="py-10 text-center text-red-500">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <VoteGrid designs={filteredDesigns} />
        )}
      </div>
    </div>
  );
}
