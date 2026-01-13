"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, Step1Schema } from '@/lib/validators/nomination.validator';
import { NominationFormData } from '@/types/nomination.types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { nigerianStates } from '@/data/nomination-mock-data';

interface Step1Props {
  formData: Partial<NominationFormData>;
  updateFormData: (data: Partial<NominationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step1SelectLocation({ formData, updateFormData, onNext, onBack }: Step1Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Step1Schema>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      state: formData.state || '',
      schoolType: formData.schoolType || undefined,
    },
  });

  const state = watch('state');
  const schoolType = watch('schoolType');

  const onSubmit = (data: Step1Schema) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div
      className="min-h-screen mt-[80px] py-8 flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/websites/nominate/step-1.png')",
      }}
    >
      <div className="breakpoint">
        {/* Progress Bar */}
        <div className="text-center space-y-2 mb-6">
          <div className="flex justify-between text-sm md:text-base text-gray-900 font-semibold">
            <span>Step 1 of 5</span>
            <span>20% Complete</span>
          </div>
          <div className="w-full bg-white rounded-full h-2">
            <div className="bg-[#FF6F38] h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-4">
            Nominate a School
          </h1>
          <p className="text-lg md:text-xl text-gray-900 font-semibold">
            Help us select the next school to be nourished.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
          {/* Step Title */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Step 1 of 5 – Choose location and School type
            </h2>
          </div>

          {/* State Selection */}
          <div>
            <Select
              value={state}
              onValueChange={(value) => setValue('state', value, { shouldValidate: true })}
            >
              <SelectTrigger className="w-full bg-white border-none h-12 text-base">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {nigerianStates.map((stateName) => (
                  <SelectItem key={stateName} value={stateName}>
                    {stateName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-white text-sm mt-1 font-medium">{errors.state.message}</p>
            )}
          </div>

          {/* School Type */}
          <div>
            <Label className="text-gray-900 font-semibold text-base mb-3 block">
              School Type <span className="text-[#E8673F]">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue('schoolType', 'Primary', { shouldValidate: true })}
                className={`py-4 px-6 rounded-lg text-base font-semibold transition-all ${schoolType === 'Primary'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
              >
                Primary School
              </button>
              <button
                type="button"
                onClick={() => setValue('schoolType', 'Secondary', { shouldValidate: true })}
                className={`py-4 px-6 rounded-lg text-base font-semibold transition-all ${schoolType === 'Secondary'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
              >
                Secondary School
              </button>
            </div>
            {errors.schoolType && (
              <p className="text-white text-sm mt-1 font-medium">{errors.schoolType.message}</p>
            )}
          </div>

          {/* Info Text */}
          <p className="text-gray-900 font-medium">
            We'll filter schools in this state by type.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8 py-6 h-auto rounded-lg shadow-md"
            >
              Continue
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="bg-white/80 text-gray-900 hover:bg-white font-semibold text-base px-8 py-6 h-auto rounded-lg border-none shadow-md"
            >
              Return Home
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
