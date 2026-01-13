import React from 'react';
import VoteHero from '@/components/website/VoteHero'
import HowToVote from '@/components/website/HowToVote'
import Footer from '@/components/website/layout/footer'
import Navbar from '@/components/website/layout/navbar'
import { motion } from "framer-motion";

export default function VotePage() {
  return (
    <div className="relative min-h-screen">
      <VoteHero />
      <HowToVote/>
    </div>
  );
}
