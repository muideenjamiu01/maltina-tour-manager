"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ageVerificationSchema } from '@/lib/validators/challenge.validator';
import { AgeVerificationData } from '@/types/challenge.form.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface Step1Props {
  onNext: (data: AgeVerificationData) => void;
  defaultValues?: AgeVerificationData;
}

export default function Step1AgeVerification({ onNext, defaultValues }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgeVerificationData>({
    resolver: zodResolver(ageVerificationSchema),
    defaultValues,
  });

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/websites/challenge/step-one.png)' }}
    >
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 mt-12 md:mt-24">
        <div className="w-full max-w-2xl text-center space-y-8">
          {/* NB Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="/images/websites/challenge/nb.png" 
              alt="Nigerian Breweries" 
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="font-lilita text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Hello,<br />
              Care to show us show ID?
            </h1>
            <p className="text-lg md:text-xl font-semibold text-gray-900">
              Please enter your birthdate:
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onNext)} className="space-y-6">
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
              <div className="space-y-2">
                <Input
                  {...register('day')}
                  placeholder="DD"
                  maxLength={2}
                  className="h-14 text-center text-lg bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.day && (
                  <p className="text-sm text-red-600 font-medium">{errors.day.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register('month')}
                  placeholder="MM"
                  maxLength={2}
                  className="h-14 text-center text-lg bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.month && (
                  <p className="text-sm text-red-600 font-medium">{errors.month.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  {...register('year')}
                  placeholder="YYYY"
                  maxLength={4}
                  className="h-14 text-center text-lg bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.year && (
                  <p className="text-sm text-red-600 font-medium">{errors.year.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full max-w-xl mx-auto h-14 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
            >
              CONTINUE
            </Button>

            <div className="text-sm text-left text-white max-w-xl mx-auto space-y-4">
              <p>
                By continuing, you confirm you are 18 or older and you consent to submit a
                child's artwork for this competition, including permission for campaign use.
              </p>
              <div className="flex justify-start gap-4 text-xs underline">
                <a href="/terms" className="hover:text-white">Terms of Use</a>
                <a href="/privacy" className="hover:text-white">Privacy Policy</a>
                <a href="/competition-rules" className="hover:text-white">Competition Rules</a>
              </div>
            </div>
          </form>
        </div>
      </div> 
    </div>
  );
}
