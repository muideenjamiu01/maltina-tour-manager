'use client';
import { useState,useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VoteModal from '@/components/website/vote/vote-modal';

interface DesignerDetailCardProps {
  images: string[];      
  image: string[];         // <-- updated to accept multiple images
  childImageUrl?: string;         // <-- child thumbnail
  name: string;
  school?: string;
  zone?: string;
  location?: string;
  dateSubmitted?: string;
  description?: string;
  votes: number;
  id?: number;
}

export default function DesignerDetailCard({
  
   images,
  image,
  childImageUrl,
  name,
  school,
  zone,
  location,
  dateSubmitted,
  description,
  votes,
  id,
}: DesignerDetailCardProps) {
  const safeImages = images?.length ? images : ["/assets/sampleperson.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVoteModal, setShowVoteModal] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === safeImages.length - 1 ? 0 : prev + 1
    );
  }, 3000); // change every 3 seconds

  return () => clearInterval(interval);
}, [safeImages.length]);


  return (
    <div className="w-full pt-10">

      {/* BACK BUTTON */}
      <Link
        href="/vote/finalist"
        className="inline-flex items-center gap-2 mb-6 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
      >
        ← Back to all Finalists
      </Link>
       <button
               onClick={() => setShowVoteModal(true)}
              className="bg-orange-400 transition text-white py-3 px-6 ml-2 rounded-md hover:bg-orange-500 font-semibold">
                Vote Now
              </button>

      {/* MAIN LAYOUT */}
      <div className="grid md:grid-cols-[340px_1fr] gap-10 items-start">

        {/* LEFT CARD */}
        <div className="bg-white shadow-lg overflow-hidden relative">

          {/* IMAGE CAROUSEL */}
                   <div className="relative h-[300px] w-full overflow-hidden">
            <Image
              src={safeImages[currentIndex]}
              alt={`${name} - image ${currentIndex + 1}`}
              fill
              className="object-cover"
            />

            {/* Carousel Buttons */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            <button
              onClick={() => setCurrentIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
          {/* DESIGNER INFO */}
          <div className="px-5 py-8">
            <h3 className="font-semibold text-gray-900">
              {name}
            </h3>
            <p className="text-sm text-gray-600">
              {school || '—'}
            </p>
            <p className="text-sm text-gray-500">
              Zone: {zone}
            </p>
          </div>

          {/* CARD ACTIONS (BOTTOM RIGHT) */}
          <div className="flex justify-end gap-3 px-5 pb-4">
            <button 
              onClick={() => setShowVoteModal(true)}
              className="text-sm font-medium border-2 border-orange-400 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-400 hover:text-white transition"
            >
              Vote
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
           {/* Child image */}
           <div className="flex items-center gap-4 ">

              {/* Title */}
  <h1 className="text-4xl font-semibold">
   {name}
  </h1>
  {/* Child image */}
  {childImageUrl && (
    <div className="relative h-[120px] w-[120px] border-2 border-orange-400 rounded-full overflow-hidden">
      <Image
        src={childImageUrl}
        alt="Child Image"
        fill
        className="object-cover"
      />
    </div>
  )}

 
</div>
          <h3 className="text-2xl font-semibold mb-1">
            Student Information
          </h3>

          {/* INFO ROWS */}
          <div className="space-y-5 text-sm">
            <div>
              <div className="flex justify-between">
                <span className="text-black">Name</span>
                <span>{name}</span>
              </div>



              
              <div className="h-[2px] bg-orange-500 " />
            </div>
            

            <div>
              <div className="flex justify-between">
                <span className="text-black">School</span>
                <span className="font-medium">{school || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">Location</span>
                <span className="font-medium">{location || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">Zone</span>
                <span className="font-medium">{zone || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 " />
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-black">Date Submitted</span>
                <span className="font-medium">{dateSubmitted || '—'}</span>
              </div>
              <div className="h-[2px] bg-orange-500 mb-4" />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3 max-w-2xl">
            <h3 className="font-semibold">Design Description</h3>
            <p className="text-sm text-black leading-relaxed">
              {description || 'No description provided.'}
            </p>
          </div>

          {/* VOTING SECTION */}
          <div className="flex flex-col items-start gap-3">
             {/* <p className="text-md font-semibold">Current Votes:</p>
            <p className=" font-bold text-orange-500">
              {votes}{" "}
             
            </p> */}

              <button
               onClick={() => setShowVoteModal(true)}
              className="bg-gray-200 transition text-black px-3 py-3 rounded-md hover:bg-orange-500 font-semibold ">
                Vote for this Design
              </button>
        
          </div>
        </div>
      </div>

      {/* Vote Modal */}
      {showVoteModal && id && (
        <VoteModal 
          designId={id} 
          designName={name}
          onClose={() => setShowVoteModal(false)} 
        />
      )}
    </div>
  );
}
