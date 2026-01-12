import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ClosedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5A623] via-[#F9B850] to-[#FF8C42] px-4 py-12">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Alert Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#FF6B6B] flex items-center justify-center shadow-xl">
            <AlertCircle className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita leading-tight mb-4">
            Design Submissions Have Closed
          </h1>
          <p className="text-xl text-gray-900 font-semibold">
            Thank you for your interest in the Maltina Lunch Bag Design Competition
          </p>
        </div>

        {/* Information Cards */}
        <div className="space-y-6 bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          {/* Submission Window Closed */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Submission Window Closed
            </h2>
            <p className="text-gray-700">
              The design submission period ended on September 30, 2024. We are no longer accepting new design submissions for this year's competition.
            </p>
          </div>

          {/* What Happens Next */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              What Happens Next?
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Our judges are currently reviewing all submitted designs</li>
              <li>Finalists will be selected and announced soon</li>
              <li>Public voting will open for the finalist designs</li>
              <li>Winners will be announced after voting closes</li>
            </ol>
          </div>

          {/* Want to Participate */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Want to Participate?
            </h2>
            <p className="text-gray-700 mb-4">
              Keep an eye out for the next edition of the Maltina Nourishment Tour in 2025!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/vote">
                <Button className="w-full sm:w-auto min-w-[240px] h-12 text-base font-bold bg-[#F5A623] text-white hover:bg-[#E89515]">
                  View Finalist Design & Vote
                </Button>
              </Link>
              <Link href="/track">
                <Button className="w-full sm:w-auto min-w-[180px] h-12 text-base font-bold bg-[#F5A623] text-white hover:bg-[#E89515]">
                  Track the Tour
                </Button>
              </Link>
            </div>
          </div>

          {/* Stay Updated */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Stay Updated
            </h2>
            <p className="text-gray-700 mb-2">
              Follow us on social media or subscribe to our newsletter to get notified about:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Finalist announcements</li>
              <li>Public voting opening dates</li>
              <li>Winner announcements</li>
              <li>Next year's competition dates</li>
            </ul>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="flex justify-center pt-4">
          <Link href="/home">
            <Button className="min-w-[200px] h-14 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
