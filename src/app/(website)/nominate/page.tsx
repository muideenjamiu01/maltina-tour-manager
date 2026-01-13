"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NominationFormData } from '@/types/nomination.types';
import Step1SelectLocation from '@/components/website/nominate/Step1SelectLocation';
import Step2FindSchool from '@/components/website/nominate/Step2FindSchool';
import Step3ConfirmDetails from '@/components/website/nominate/Step3ConfirmDetails';


export default function NominateSchoolPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<NominationFormData>>({
    verified: false,
  });

  const updateFormData = (data: Partial<NominationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/nominate/thank-you?school=${encodeURIComponent(formData.schoolName || '')}`);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit nomination. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
     
        {currentStep === 1 && (
          <Step1SelectLocation
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={() => router.push('/')}
          />
        )}
        {currentStep === 2 && (
          <Step2FindSchool
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <Step3ConfirmDetails
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        )}
   
    </div>
  );
}
