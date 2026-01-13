"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NominationFormData } from '@/types/nomination.types';
import Step1SelectLocation from '@/components/website/nominate/Step1SelectLocation';
import Step2FindSchool from '@/components/website/nominate/Step2FindSchool';
import Step2ManualSchoolDetails from '@/components/website/nominate/Step2ManualSchoolDetails';
import Step3SchoolContact from '@/components/website/nominate/Step3SchoolContact';
import Step4YourDetails from '@/components/website/nominate/Step4YourDetails';
import Step5Review from '@/components/website/nominate/Step5Review';

export default function NominateSchoolPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isManualEntry, setIsManualEntry] = useState(false);
  const isManualEntryRef = React.useRef(false);

  useEffect(() => {
    document.querySelectorAll('*').forEach(e => e.scrollTo({ top: 0, behavior: 'smooth' }))
  }, [currentStep])

  const [formData, setFormData] = useState<Partial<NominationFormData>>({
    verified: false,
  });

  const updateFormData = (data: Partial<NominationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (data.manualEntry !== undefined) {
      setIsManualEntry(data.manualEntry);
      isManualEntryRef.current = data.manualEntry;
    }
  };

  const handleNext = () => {
    if (currentStep === 2 && isManualEntryRef.current) {
      setCurrentStep(2.5);
    } else if (currentStep === 2.5) {
      setCurrentStep(3);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    if (currentStep === 2.5) {
      setCurrentStep(2);
      // We probably don't want to reset isManualEntry here unless we want to clear the form?
      // Let's keep it simpls.
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    try {
      // const response = await fetch('/api/nominate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // const result = await response.json();

      // if (result.success) {
      router.push(`/nominate/thank-you?school=${encodeURIComponent(formData.schoolName || '')}`);
      // } else {
      //   throw new Error(result.error);
      // }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit nomination. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="">
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
            onNext={() => {
              if (isManualEntryRef.current) setCurrentStep(2.5);
              else setCurrentStep(3);
            }}
            onBack={handleBack}
          />
        )}
        {currentStep === 2.5 && (
          <Step2ManualSchoolDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 3 && (
          <Step3SchoolContact
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={isManualEntry ? () => setCurrentStep(2.5) : handleBack}
          />
        )}
        {currentStep === 4 && (
          <Step4YourDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <Step5Review
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
            onBack={handleBack}
            onEditStep={handleEditStep}
          />
        )}
      </div>
    </div>
  );
}
