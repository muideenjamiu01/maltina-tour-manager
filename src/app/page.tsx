'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF8] to-[#FFF8E8] flex items-center justify-center px-8">
      <div className="text-center max-w-[500px]">
        <h1 className="text-[48px] font-[600] text-[#2B2B2B] mb-12">
          Maltina Nourishment Tour
        </h1>
        
        <Button
          onClick={() => router.push('/login')}
          className="px-8 py-4 bg-[#F5A623] text-white rounded-lg text-[15px] font-[500] hover:bg-[#E09615] transition-all shadow-lg hover:shadow-xl"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
