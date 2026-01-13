"use client";

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { School } from '@/types/tour.types';
import { mockSchools } from '@/data/tour-mock-data';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function SchoolDetailPage() {
  const params = useParams();
  
  const school = useMemo(() => {
    return mockSchools.find(s => s.id === params.id);
  }, [params.id]);

  if (!school) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5A623] via-[#F9B850] to-[#FF8C42] flex items-center justify-center">
        <div className="text-white text-xl">School not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5A623] via-[#F9B850] to-[#FF8C42] py-8 mt-12 md:mt-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <Link href="/track">
          <Button
            variant="ghost"
            className="text-gray-900 hover:text-white hover:bg-white/20 flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Tour Tracker
          </Button>
        </Link>

        {/* School Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-white font-lilita">
            {school.name}
          </h1>
          <p className="text-lg text-gray-900">
            {school.lga}, {school.state}
          </p>
        </div>

        {/* About School */}
        <Card className="bg-gradient-to-r from-[#F66F39]/90 to-[#F5A623]/90 border-2 border-[#F66F39]">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">About this school</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-white/80 text-sm mb-1">State</p>
                <p className="text-white font-semibold">{school.state}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">LGA</p>
                <p className="text-white font-semibold">{school.lga}</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">School Type</p>
                <p className="text-white font-semibold">{school.schoolType} School</p>
              </div>
              <div>
                <p className="text-white/80 text-sm mb-1">Ownership</p>
                <p className="text-white font-semibold">{school.ownership}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact at a glance */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white text-center">Impact at a glance</h2>
          <Card className="bg-gradient-to-r from-[#F66F39]/90 to-[#F5A623]/90 border-2 border-[#F66F39]">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-5xl font-black text-white mb-2">
                    {school.studentsReached?.toLocaleString()}
                  </p>
                  <p className="text-white font-semibold">Students Reached</p>
                </div>
                <div>
                  <p className="text-5xl font-black text-white mb-2">
                    {school.samplesDistributed?.toLocaleString()}
                  </p>
                  <p className="text-white font-semibold">Samples Distributed</p>
                </div>
                <div>
                  <p className="text-5xl font-black text-white mb-2">{school.visitDate}</p>
                  <p className="text-white font-semibold">Visit Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* The Story of Our Visit */}
        {school.story && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white text-center">The Story of Our Visit</h2>
            <Card className="bg-white/95">
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">{school.story}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Moments of Discovery */}
        {school.images && school.images.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Moments of Discovery</h2>
              <p className="text-gray-900">Captured moments from an unforgettable day of learning</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {school.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Image {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience the Excitement */}
        {school.videos && school.videos.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Experience the Excitement</h2>
              <p className="text-gray-900">Students share their experience</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {school.videos.map((video, index) => (
                <Card key={index} className="bg-white overflow-hidden">
                  <div className="aspect-video bg-gray-800 flex items-center justify-center relative group cursor-pointer">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                    <Play className="w-16 h-16 text-white z-10" />
                  </div>
                  <CardContent className="p-4">
                    <p className="font-semibold text-gray-900">{video.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Voices from the Classroom */}
        {school.testimonials && school.testimonials.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Voices from the Classroom</h2>
              <p className="text-gray-900">Students share their experience</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {school.testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                    <p className="text-sm text-gray-600 font-semibold">— {testimonial.class}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Lasting Impact */}
        <Card className="bg-gradient-to-r from-[#F66F39]/90 to-[#F5A623]/90 border-2 border-[#F66F39]">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Lasting Impact</h2>
            <p className="text-white leading-relaxed max-w-3xl mx-auto">
              The Maltina Science Nourishment Tour at {school.name} successfully inspired{' '}
              {school.studentsReached} young minds to explore science, understand the importance of
              nutrition, and dream bigger about their futures.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
