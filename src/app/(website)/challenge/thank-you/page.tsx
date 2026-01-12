import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/websites/challenge/thank-you.png)' }}
    >
      <div className="w-full max-w-5xl text-center space-y-8">
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="font-lilita text-5xl md:text-6xl lg:text-7xl font-normal text-white leading-tight">
            Thank you!<br />
            Your design has been submitted.
          </h1>
          <div className="text-lg md:text-xl text-gray-900 space-y-2 max-w-3xl mx-auto">
            <p className="font-medium">A confirmation message has been recorded.</p>
            <p>If your child is shortlisted, we'll contact you using the details you provided.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link href="/challenge">
            <Button className="min-w-[260px] h-14 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
              Submit Design for a different child
            </Button>
          </Link>
          <Link href="/home">
            <Button className="min-w-[200px] h-14 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
