"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NominationFormData } from '@/types/nomination.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step3Props {
    formData: Partial<NominationFormData>;
    updateFormData: (data: Partial<NominationFormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step3SchoolContact({
    formData,
    updateFormData,
    onNext,
    onBack,
}: Step3Props) {
    const formik = useFormik({
        initialValues: {
            principalFirstName: formData.principalFirstName || '',
            principalLastName: formData.principalLastName || '',
            principalMobile: formData.principalMobile || '',
            principalEmail: formData.principalEmail || '',
        },
        validationSchema: Yup.object({
            principalFirstName: Yup.string().required('First Name is required'),
            principalLastName: Yup.string().required('Last Name is required'),
            principalMobile: Yup.string()
                .matches(/^[0-9]+$/, 'Must be only digits')
                .min(10, 'Must be at least 10 digits')
                .required('Mobile number is required'),
            principalEmail: Yup.string().email('Invalid email').required('Email is required'),
        }),
        onSubmit: (values) => {
            updateFormData(values);
            onNext();
        },
    });

    const { values, errors, touched, handleSubmit, handleChange } = formik;

    return (
        <div
            className="space-y-6 min-h-screen py-8 mt-[80px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/websites/nominate/step-3.png')",
            }}
        >
            <div className="max-w-3xl breakpoint mx-auto">
                {/* Progress Bar */}
                <div className="text-center md:w-1/2 mx-auto space-y-2 mb-6">
                    <div className="flex justify-between text-sm md:text-base text-gray-900 font-semibold">
                        <span>Step 3 of 5</span>
                        <span>60% Complete</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                        <div
                            className="bg-[#FF6F38] h-2 rounded-full"
                            style={{ width: '60%' }}
                        ></div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-2">
                        Provide School Contact
                    </h1>
                    <p className="text-lg font-medium text-gray-900">Step 3 of 5 – Tell us about the school</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 md:w-2/3 mx-auto">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">School Head Contact Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="principalFirstName" className="text-gray-900 font-semibold text-sm mb-2 block">
                                First Name
                            </Label>
                            <Input
                                id="principalFirstName"
                                name="principalFirstName"
                                onChange={handleChange}
                                value={values.principalFirstName}
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.principalFirstName && errors.principalFirstName && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.principalFirstName}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="principalLastName" className="text-gray-900 font-semibold text-sm mb-2 block">
                                Last Name
                            </Label>
                            <Input
                                id="principalLastName"
                                name="principalLastName"
                                onChange={handleChange}
                                value={values.principalLastName}
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.principalLastName && errors.principalLastName && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.principalLastName}</p>
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
                                name="principalMobile"
                                onChange={handleChange}
                                value={values.principalMobile}
                                placeholder="08012345678"
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.principalMobile && errors.principalMobile && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.principalMobile}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="principalEmail" className="text-gray-900 font-semibold text-sm mb-2 block">
                                Email
                            </Label>
                            <Input
                                id="principalEmail"
                                name="principalEmail"
                                type="email"
                                onChange={handleChange}
                                value={values.principalEmail}
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.principalEmail && errors.principalEmail && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.principalEmail}</p>
                            )}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <Button
                            type="submit"
                            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-10 py-6 h-auto rounded-full shadow-md min-w-[200px]"
                        >
                            Continue
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
                </form>
            </div>
        </div>
    );
}
