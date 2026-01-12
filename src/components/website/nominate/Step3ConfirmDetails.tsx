"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, Step3Schema } from '@/lib/validators/nomination.validator';
import { NominationFormData } from '@/types/nomination.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { nigerianStates, lgasByState, relationshipOptions } from '@/data/nomination-mock-data';

interface Step3Props {
  formData: Partial<NominationFormData>;
  updateFormData: (data: Partial<NominationFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step3ConfirmDetails({ formData, updateFormData, onSubmit, onBack }: Step3Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(formData.verified || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Step3Schema>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      schoolName: formData.schoolName || '',
      schoolAddress: formData.schoolAddress || '',
      state: formData.state || '',
      lga: formData.lga || '',
      schoolType: formData.schoolType || 'Primary',
      principalFirstName: formData.principalFirstName || '',
      principalLastName: formData.principalLastName || '',
      principalMobile: formData.principalMobile || '',
      principalEmail: formData.principalEmail || '',
      yourFirstName: formData.yourFirstName || '',
      yourLastName: formData.yourLastName || '',
      yourMobile: formData.yourMobile || '',
      yourEmail: formData.yourEmail || '',
      relationshipToSchool: formData.relationshipToSchool || '',
      reasonForNomination: formData.reasonForNomination || '',
      verified: formData.verified || false,
    },
  });

  const state = watch('state');
  const schoolType = watch('schoolType');
  const relationshipToSchool = watch('relationshipToSchool');
  const availableLgas = lgasByState[state] || [];

  const handleVerify = () => {
    setIsVerified(true);
    setValue('verified', true);
  };

  const onFormSubmit = async (data: Step3Schema) => {
    if (!data.verified) {
      alert('Please verify your details before submitting');
      return;
    }
    
    updateFormData(data);
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <div
      className="space-y-6 min-h-screen py-8 px-4 bg-cover bg-center bg-no-repeat -mx-4 -my-8 md:-my-12"
      style={{
        backgroundImage: "url('/images/websites/challenge/step-three.png')",
      }}
    >
      <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="text-center space-y-2 mb-6">
        <div className="flex justify-between text-sm md:text-base text-gray-900 font-semibold">
          <span>Step 3 of 3</span>
          <span>100% Complete</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <div className="bg-white h-2 rounded-full" style={{ width: '100%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white font-lilita mb-2">
          Confirm School & Your Details
        </h1>
        <p className="text-base md:text-lg text-gray-900 font-semibold">
          Step 3 of 3 – Tell us about the school and you
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {/* School Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">School Details</h2>
          
          <div>
            <Label htmlFor="schoolName" className="text-gray-900 font-semibold text-sm mb-2 block">
              School Name
            </Label>
            <Input
              id="schoolName"
              {...register('schoolName')}
              className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              disabled={!formData.manualEntry}
            />
            {errors.schoolName && (
              <p className="text-red-600 text-sm mt-1">{errors.schoolName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="schoolAddress" className="text-gray-900 font-semibold text-sm mb-2 block">
              School Address
            </Label>
            <Input
              id="schoolAddress"
              {...register('schoolAddress')}
              className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
            />
            {errors.schoolAddress && (
              <p className="text-red-600 text-sm mt-1">{errors.schoolAddress.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="state" className="text-gray-900 font-semibold text-sm mb-2 block">
                State
              </Label>
              <Select
                value={state}
                onValueChange={(value) => setValue('state', value)}
                disabled={!formData.manualEntry}
              >
                <SelectTrigger className="w-full bg-white border-none h-12">
                  <SelectValue placeholder="Select" />
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
                <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lga" className="text-gray-900 font-semibold text-sm mb-2 block">
                LGA
              </Label>
              <Select
                value={watch('lga')}
                onValueChange={(value) => setValue('lga', value)}
                disabled={!formData.manualEntry}
              >
                <SelectTrigger className="w-full bg-white border-none h-12">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {availableLgas.map((lga) => (
                    <SelectItem key={lga} value={lga}>
                      {lga}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.lga && (
                <p className="text-red-600 text-sm mt-1">{errors.lga.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-gray-900 font-semibold text-sm mb-3 block">
              School Type <span className="text-[#E8673F]">*</span>
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setValue('schoolType', 'Primary')}
                disabled={!formData.manualEntry}
                className={`py-4 px-6 rounded-lg text-base font-semibold transition-all ${
                  schoolType === 'Primary'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/80 text-gray-700'
                }`}
              >
                Primary School
              </button>
              <button
                type="button"
                onClick={() => setValue('schoolType', 'Secondary')}
                disabled={!formData.manualEntry}
                className={`py-4 px-6 rounded-lg text-base font-semibold transition-all ${
                  schoolType === 'Secondary'
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'bg-white/80 text-gray-700'
                }`}
              >
                Secondary School
              </button>
            </div>
          </div>
        </div>

        {/* Principal's Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Principal's Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="principalFirstName" className="text-gray-900 font-semibold text-sm mb-2 block">
                First Name
              </Label>
              <Input
                id="principalFirstName"
                {...register('principalFirstName')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.principalFirstName && (
                <p className="text-red-600 text-sm mt-1">{errors.principalFirstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="principalLastName" className="text-gray-900 font-semibold text-sm mb-2 block">
                Last Name
              </Label>
              <Input
                id="principalLastName"
                {...register('principalLastName')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.principalLastName && (
                <p className="text-red-600 text-sm mt-1">{errors.principalLastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="principalMobile" className="text-gray-900 font-semibold text-sm mb-2 block">
                Mobile
              </Label>
              <Input
                id="principalMobile"
                {...register('principalMobile')}
                placeholder="08012345678"
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.principalMobile && (
                <p className="text-red-600 text-sm mt-1">{errors.principalMobile.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="principalEmail" className="text-gray-900 font-semibold text-sm mb-2 block">
                Email
              </Label>
              <Input
                id="principalEmail"
                type="email"
                {...register('principalEmail')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.principalEmail && (
                <p className="text-red-600 text-sm mt-1">{errors.principalEmail.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Your Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yourFirstName" className="text-gray-900 font-semibold text-sm mb-2 block">
                First Name
              </Label>
              <Input
                id="yourFirstName"
                {...register('yourFirstName')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.yourFirstName && (
                <p className="text-red-600 text-sm mt-1">{errors.yourFirstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="yourLastName" className="text-gray-900 font-semibold text-sm mb-2 block">
                Last Name
              </Label>
              <Input
                id="yourLastName"
                {...register('yourLastName')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.yourLastName && (
                <p className="text-red-600 text-sm mt-1">{errors.yourLastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yourMobile" className="text-gray-900 font-semibold text-sm mb-2 block">
                Mobile
              </Label>
              <Input
                id="yourMobile"
                {...register('yourMobile')}
                placeholder="08012345678"
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.yourMobile && (
                <p className="text-red-600 text-sm mt-1">{errors.yourMobile.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="yourEmail" className="text-gray-900 font-semibold text-sm mb-2 block">
                Email
              </Label>
              <Input
                id="yourEmail"
                type="email"
                {...register('yourEmail')}
                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
              />
              {errors.yourEmail && (
                <p className="text-red-600 text-sm mt-1">{errors.yourEmail.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-gray-900 font-semibold text-sm mb-2 block">
              Relationship to school
            </Label>
            <Select
              value={relationshipToSchool}
              onValueChange={(value) => setValue('relationshipToSchool', value)}
            >
              <SelectTrigger className="w-full bg-white border-none h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {relationshipOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.relationshipToSchool && (
              <p className="text-red-600 text-sm mt-1">{errors.relationshipToSchool.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="reasonForNomination" className="text-gray-900 font-semibold text-sm mb-2 block">
              Reason for nomination
            </Label>
            <Textarea
              id="reasonForNomination"
              {...register('reasonForNomination')}
              rows={5}
              className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] resize-none"
            />
            {errors.reasonForNomination && (
              <p className="text-red-600 text-sm mt-1">{errors.reasonForNomination.message}</p>
            )}
          </div>
        </div>

        {/* Verify Button */}
        <div className="text-center">
          <Button
            type="button"
            onClick={handleVerify}
            disabled={isVerified}
            className={`font-semibold text-base px-8 py-6 h-auto rounded-lg shadow-md ${
              isVerified
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            {isVerified ? '✓ Verified' : 'Click to Verify'}
          </Button>
          {errors.verified && (
            <p className="text-red-600 text-sm mt-2">{errors.verified.message}</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={!isVerified || isSubmitting}
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8 py-6 h-auto rounded-lg shadow-md disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Nomination'}
          </Button>
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="bg-white/80 text-gray-900 hover:bg-white font-semibold text-base px-8 py-6 h-auto rounded-lg border-none shadow-md"
          >
            Back
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
