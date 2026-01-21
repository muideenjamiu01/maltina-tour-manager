'use client';

import React from "react"

import { useState, useEffect } from 'react';
import { X, Mail, Phone, Check } from 'lucide-react';

interface VoteModalProps {
  onClose: () => void;
}

export default function VoteModal({ onClose }: VoteModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTab, setSelectedTab] = useState<'email' | 'phone'>('email');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleVote = (e: React.FormEvent) => {
    e.preventDefault();
    if ((selectedTab === 'email' && email) || (selectedTab === 'phone' && phone)) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-border transition-all duration-300 transform ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-orange to-yellow/100 p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1  rounded-lg transition-colors"
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
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center space-y-4 min-h-80 flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse" />
              <div className="relative bg-primary/10 p-6 rounded-full">
                <Check className="w-12 h-12 text-primary animate-bounce" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">Vote Received!</h3>
            <p className="text-muted-foreground text-sm">
              Thank you for voting. Your choice has been recorded.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
