'use client';

import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, Home } from 'lucide-react';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8C1D18] rounded-full mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[#2B2B2B] mb-2">Access Denied</h1>
          <p className="text-[#9E9E9E] text-lg">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#E5E7EB] mb-6">
          <h2 className="text-lg font-medium text-[#2B2B2B] mb-2">Need Access?</h2>
          <p className="text-[#9E9E9E] text-sm mb-4">
            Contact your administrator to request the appropriate permissions for the Maltina Tour admin dashboard.
          </p>
          <div className="text-xs text-[#9E9E9E] bg-[#F9FAFB] p-3 rounded border">
            <strong>Required Role:</strong> Admin or Super Admin
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F5A623] text-white rounded-lg hover:bg-[#E09612] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <button
            onClick={() => router.push('/login')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#E5E7EB] text-[#2B2B2B] rounded-lg hover:bg-[#F9FAFB] transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Login
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#9E9E9E] text-sm">
            © 2025 Maltina Tour. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}