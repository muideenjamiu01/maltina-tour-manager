'use client';

import React from "react"
import { useState } from 'react';
import { X, Mail, Phone } from 'lucide-react';
import { useRouter } from "next/navigation";

interface VoteModalProps {
  onClose: () => void;
}

export default function VoteModal({ onClose }: VoteModalProps) {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');

  const handleVote = (e: React.FormEvent) => {
    e.preventDefault();

    if ((selectedTab === 'email' && email) || (selectedTab === 'phone' && phone)) {
      // Redirect immediately
      router.push("/vote/voteRecorded");
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
            className="absolute top-4 right-4 p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-black" />
          </button>
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">Cast Your Vote</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 bg-orange/300 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('email')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                selectedTab === 'email'
                  ? 'bg-orange/200 text-primary shadow-md'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>

            <button
              onClick={() => setSelectedTab('phone')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
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
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
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
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required={selectedTab === 'phone'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={
                (selectedTab === 'email' && !email) ||
                (selectedTab === 'phone' && !phone)
              }
              className="w-full bg-orange/100 text-primary py-3 rounded-lg font-bold hover:bg-orange/100 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
            >
              Vote Now
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
