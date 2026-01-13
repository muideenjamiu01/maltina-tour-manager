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
        backgroundImage: "url('/images/websites/nominate/background.png')",
      }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white font-lilita mb-4 drop-shadow-md">
            Thank you!
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-lilita mb-6 drop-shadow-md max-w-4xl mx-auto leading-tight">
            Your Nomination has been submitted.
          </h2>
          <p className="text-base md:text-lg text-gray-900 font-semibold max-w-2xl mx-auto">
            Your nomination has been successfully submitted. Our team will review your submission and contact you if we need additional information.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="rounded-2xl p-6 md:p-10 mb-12 shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 pl-2 border-l-4 border-[#F5A623] inline-block">
            What Happens Next
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[#F5A623] text-white shadow-sm">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Review Process</h3>
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                Our team will review your nomination along with others from the area
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[#F5A623] text-white shadow-sm">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Selection</h3>
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                Schools are selected based on need, location, and community support.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold bg-[#F5A623] text-white shadow-sm">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Notification</h3>
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                We'll email you with updates on your nominated school's status.
              </p>
            </div>
          </div>
        </div>

        {/* Nominated School */}
        {schoolName && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pl-2 drop-shadow-sm text-white">Nominated School</h2>
            <div className="bg-white rounded-xl p-6 md:p-8 w-full shadow-lg">
              <p className="text-xl md:text-2xl font-bold text-gray-900">{schoolName}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 pb-12">
          <Button
            onClick={() => router.push('/nominate')}
            className="bg-white text-gray-900 hover:bg-gray-50 text-base md:text-lg px-8 py-6 h-auto rounded-xl shadow-lg border border-gray-100 font-bold min-w-[250px]"
          >
            Nominate Another School
          </Button>
          <Link href="/">
            <Button
              className="bg-white text-gray-900 hover:bg-gray-50 text-base md:text-lg px-8 py-6 h-auto rounded-xl shadow-lg border border-gray-100 font-bold min-w-[250px]"
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
