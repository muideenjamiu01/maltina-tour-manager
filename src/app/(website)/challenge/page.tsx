"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Step1AgeVerification from '@/components/website/challenge/Step1AgeVerification';
import Step2ParentDetails from '@/components/website/challenge/Step2ParentDetails';
import Step3ChildSchoolInfo from '@/components/website/challenge/Step3ChildSchoolInfo';
import Step4UploadDesign from '@/components/website/challenge/Step4UploadDesign';
import Step5ReviewSubmit from '@/components/website/challenge/Step5ReviewSubmit';
import Step6Consent from '@/components/website/challenge/Step6Consent';
import {
  AgeVerificationData,
  ParentGuardianData,
  ChildSchoolData,
  ConsentData,
  ChallengeFormData,
} from '@/types/challenge.form.types';
import { useToast } from '@/hooks/use-toast';

export default function LunchBoxChallengePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<ChallengeFormData>>({});
  const router = useRouter();
  const { toast } = useToast();

  // Check if submissions are open
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      try {
        const response = await fetch('/api/challenge/submit');
        const data = await response.json();
        
        if (!data.isOpen) {
          router.push('/challenge/closed');
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
      }
    };

    checkSubmissionStatus();
  }, [router]);

  const handleStep1Complete = (data: AgeVerificationData) => {
    setFormData((prev) => ({ ...prev, ageVerification: data }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (data: ParentGuardianData) => {
    setFormData((prev) => ({ ...prev, parentGuardian: data }));
    setCurrentStep(3);
  };

  const handleStep3Complete = (data: ChildSchoolData) => {
    setFormData((prev) => ({ ...prev, childSchool: data }));
    setCurrentStep(4);
  };

  const handleStep4Complete = (data: any) => {
    setFormData((prev) => ({ ...prev, uploads: data }));
    setCurrentStep(5);
  };

  const handleStep5Complete = () => {
    setCurrentStep(6);
  };

  const handleStep6Complete = async (data: ConsentData) => {
    setFormData((prev) => ({ ...prev, consent: data }));
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/challenge/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          consent: data,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();

      toast({
        title: 'Success!',
        description: 'Your design has been submitted successfully.',
      });

      router.push('/challenge/thank-you');
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your design. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5A623] via-[#F9B850] to-[#FF8C42]">
      {currentStep === 1 && (
        <Step1AgeVerification
          onNext={handleStep1Complete}
          defaultValues={formData.ageVerification}
        />
      )}
      {currentStep === 2 && (
        <Step2ParentDetails
          onNext={handleStep2Complete}
          onBack={handleBack}
          defaultValues={formData.parentGuardian}
        />
      )}
      {currentStep === 3 && (
        <Step3ChildSchoolInfo
          onNext={handleStep3Complete}
          onBack={handleBack}
          defaultValues={formData.childSchool}
        />
      )}
      {currentStep === 4 && (
        <Step4UploadDesign
          onNext={handleStep4Complete}
          onBack={handleBack}
          defaultValues={formData.uploads}
        />
      )}
      {currentStep === 5 && (
        <Step5ReviewSubmit
          onNext={handleStep5Complete}
          onBack={handleBack}
          onEdit={handleEdit}
          formData={formData}
        />
      )}
      {currentStep === 6 && (
        <Step6Consent
          onNext={handleStep6Complete}
          onBack={handleBack}
          defaultValues={formData.consent}
        />
      )}

      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5A623] mx-auto mb-4"></div>
            <p className="text-lg font-semibold">Submitting your design...</p>
          </div>
        </div>
      )}
    </div>
  );
}
