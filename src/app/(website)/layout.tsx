'use client'
import Link from 'next/link';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
   

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

     
    </div>
  );
}
