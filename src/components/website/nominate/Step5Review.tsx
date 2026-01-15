"use client";

import React, { useState } from 'react';
import { NominationFormData } from '@/types/nomination.types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Step5Props {
    formData: Partial<NominationFormData>;
    updateFormData: (data: Partial<NominationFormData>) => void;
    onSubmit: () => void;
    onBack: () => void;
    onEditStep: (step: number) => void;
}

export default function Step5Review({
    formData,
    updateFormData,
    onSubmit,
    onBack,
    onEditStep,
}: Step5Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        await onSubmit();
        setIsSubmitting(false);
    };

    const SectionHeader = ({ title, editStep }: { title: string; editStep?: number }) => (
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
            {editStep && (
                <button
                    onClick={() => onEditStep(editStep)}
                    className="text-sm font-semibold underline text-gray-700 hover:text-black"
                >
                    Edit
                </button>
            )}
        </div>
    );

    const DisplayField = ({ label, value }: { label: string; value?: string }) => (
        <div className='mb-2'>
            <span className="block text-gray-600 text-sm font-medium">{label}</span>
            <span className="block text-gray-900 text-base font-semibold">{value || '-'}</span>
        </div>
    );

    return (
        <div
            className="space-y-6 min-h-screen py-8 mt-[80px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/websites/nominate/review.png')",
            }}
        >
            <div className="breakpoint mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-2">
                        Review Your Nomination
                    </h1>
                    <p className="text-lg font-medium text-gray-900">Please review all details before submitting</p>
                </div>

                <div className="space-y-6 md:w-2/3 mx-auto">
                    {/* School Details */}
                    <div className="bg-white/90 p-6 rounded-xl shadow-sm">
                        <SectionHeader title="School Details" editStep={formData.manualEntry ? 2.5 : 2} />
                        {/* Logic: if manual, edit step is 2.5 (Wizard), if not, step 2 (Select) might be weird to edit specific fields. 
                Actually, usually review sends back to the step where data was entered. 
                If selected from list, maybe just send back to step 2.
            */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DisplayField label="School Name" value={formData.schoolName} />
                            <DisplayField label="School Address" value={formData.schoolAddress} />
                            <DisplayField label="State" value={formData.state} />
                            <DisplayField label="LGA" value={formData.lga} />
                            <DisplayField label="School Type" value={formData.schoolType} />
                        </div>
                    </div>

                    {/* School Contact */}
                    <div className="bg-white/90 p-6 rounded-xl shadow-sm">
                        <SectionHeader title="School Contact" editStep={3} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DisplayField label="Contact Name" value={`${formData.principalFirstName} ${formData.principalLastName}`} />
                            <DisplayField label="Email" value={formData.principalEmail} />
                            <DisplayField label="Phone" value={formData.principalMobile} />
                        </div>
                    </div>

                    {/* Your Details */}
                    <div className="bg-white/90 p-6 rounded-xl shadow-sm">
                        <SectionHeader title="Your Details" editStep={4} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DisplayField label="Full Name" value={`${formData.yourFirstName} ${formData.yourLastName}`} />
                            <DisplayField label="Email" value={formData.yourEmail} />
                            <DisplayField label="Phone" value={formData.yourMobile} />
                            <div className='md:col-span-2'>
                                <DisplayField label="Relationship to School" value={formData.relationshipToSchool} />
                            </div>
                            <div className='md:col-span-2'>
                                <DisplayField label="Reason for Nomination" value={formData.reasonForNomination} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
                    <Button
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting}
                        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-10 py-6 h-auto rounded-full shadow-md min-w-[200px]"
                    >
                        {isSubmitting ? 'Confirming...' : 'Confirm'}
                    </Button>
                    <Button
                        type="button"
                        onClick={onBack}
                        variant="outline"
                        className="bg-white/80 text-gray-900 hover:bg-white font-semibold text-base px-10 py-6 h-auto rounded-full border-none shadow-md min-w-[200px]"
                    >
                        Back
                    </Button>
                </div>

            </div>
        </div>
    );
}
