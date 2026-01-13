"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NominateThankYouPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [schoolName, setSchoolName] = useState('');

  useEffect(() => {
    const name = searchParams.get('school');
    if (name) {
      setSchoolName(decodeURIComponent(name));
    }
  }, [searchParams]);

  return (
    <div
      className="min-h-screen py-12 px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/websites/challenge/step-6.png')",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-4">
            Thank you!
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-lilita mb-6">
            Your design has been submitted.
          </h2>
          <p className="text-base md:text-lg text-gray-900 font-semibold max-w-2xl mx-auto">
            Your nomination has been successfully submitted. Our team will review your submission and contact you if we need additional information.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-white/95 rounded-lg p-6 md:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            What Happens Next
          </h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5A623] text-white font-bold flex items-center justify-center text-xl">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Review Process</h3>
                <p className="text-gray-700">
                  Our team will review your nomination along with others from the area
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5A623] text-white font-bold flex items-center justify-center text-xl">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Selection</h3>
                <p className="text-gray-700">
                  Schools are selected based on need, location, and community support.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5A623] text-white font-bold flex items-center justify-center text-xl">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Notification</h3>
                <p className="text-gray-700">
                  We'll email you with updates on your nominated school's status.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nominated School */}
        {schoolName && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nominated School</h2>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-lg font-semibold text-gray-900">{schoolName}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/nominate')}
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8 py-6 h-auto rounded-lg shadow-md"
          >
            Nominate Another School
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="bg-white/80 text-gray-900 hover:bg-white font-semibold text-base px-8 py-6 h-auto rounded-lg border-none shadow-md w-full"
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
