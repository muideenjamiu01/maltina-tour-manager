'use client';

import React from "react"
import { useState } from 'react';
import { X, Mail, Phone, Loader2 } from 'lucide-react';
import { useRouter } from "next/navigation";

interface VoteModalProps {
  designId: number;
  designName: string;
  onClose: () => void;
}

export default function VoteModal({ designId, designName, onClose }: VoteModalProps) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const voteData = {
        designId,
        designName,
        email: selectedTab === 'email' ? email : undefined,
        phone: selectedTab === 'phone' ? phone : undefined,
      };

      const response = await fetch('/api/vote/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if it's a duplicate vote
        if (data.error?.type === 'ALREADY_VOTED') {
          const previousDesign = data.error.previousVoteData?.designName || 'Unknown Design';
          const previousDate = data.error.previousVoteData?.voteDate;
          router.push(`/vote/alreadyvoted?design=${encodeURIComponent(previousDesign)}&date=${encodeURIComponent(previousDate)}`);
        } else {
          setError(data.message || 'Failed to record vote. Please try again.');
        }
        return;
      }

      // Success - redirect to vote recorded page
      if (data.success) {
        router.push(`/vote/voteRecorded?voteId=${data.data.voteId}&design=${encodeURIComponent(data.data.designName)}&designId=${designId}`);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Vote submission error:', err);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange to-yellow/100 p-6 relative">
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 p-1 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-black" />
          </button>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Cast Your Vote</h2>
          <p className="text-sm text-white/90 mt-1">{designName}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 bg-orange/300 rounded-lg p-1">
            <button
              onClick={() => {
              setSelectedTab('email');
              setPhone(''); }}
              
              disabled={loading}
              
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all disabled:opacity-50 ${
                selectedTab === 'email'
                  ? 'bg-orange/200 text-primary shadow-md'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>

            <button
             onClick={() => {setSelectedTab('phone'); 
                setEmail('');
                }}
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all disabled:opacity-50 ${
                selectedTab === 'phone'
                  ? 'bg-orange/200 text-primary shadow-md'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Phone
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleVote} className="space-y-4">
            {selectedTab === 'email' ? (
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  required={selectedTab === 'email'}
                />
              </div>
            ) : (
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1234 567 890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
                  required={selectedTab === 'phone'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                (selectedTab === 'email' && !email) ||
                (selectedTab === 'phone' && !phone)
              }
              className="w-full bg-orange/100 text-primary py-3 rounded-lg font-bold hover:bg-orange/100 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Recording Vote...
                </>
              ) : (
                'Vote Now'
              )}
            </button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Your vote is secure and will be counted immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
