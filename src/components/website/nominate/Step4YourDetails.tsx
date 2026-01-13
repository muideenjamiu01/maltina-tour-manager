"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NominationFormData } from '@/types/nomination.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { relationshipOptions } from '@/data/nomination-mock-data';

interface Step4Props {
    formData: Partial<NominationFormData>;
    updateFormData: (data: Partial<NominationFormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step4YourDetails({
    formData,
    updateFormData,
    onNext,
    onBack,
}: Step4Props) {
    const formik = useFormik({
        initialValues: {
            yourFirstName: formData.yourFirstName || '',
            yourLastName: formData.yourLastName || '',
            yourMobile: formData.yourMobile || '',
            yourEmail: formData.yourEmail || '',
            relationshipToSchool: formData.relationshipToSchool || '',
            reasonForNomination: formData.reasonForNomination || '',
        },
        validationSchema: Yup.object({
            yourFirstName: Yup.string().required('First Name is required'),
            yourLastName: Yup.string().required('Last Name is required'),
            yourMobile: Yup.string()
                .matches(/^[0-9]+$/, 'Must be only digits')
                .min(10, 'Must be at least 10 digits')
                .required('Mobile number is required'),
            yourEmail: Yup.string().email('Invalid email').required('Email is required'),
            relationshipToSchool: Yup.string().required('Relationship is required'),
            reasonForNomination: Yup.string().required('Reason for nomination is required'),
        }),
        onSubmit: (values) => {
            updateFormData(values);
            onNext();
        },
    });

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

    return (
        <div
            className="space-y-6 min-h-screen py-8 mt-[80px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/websites/challenge/step-three.png')", // Adjust Bg if needed
            }}
        >
            <div className="max-w-3xl mx-auto px-4">
                {/* Progress Bar */}
                <div className="text-center space-y-2 mb-6">
                    <div className="flex justify-between text-sm md:text-base text-gray-900 font-semibold">
                        <span>Step 4 of 5</span>
                        <span>80% Complete</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                        <div
                            className="bg-[#FF6F38] h-2 rounded-full"
                            style={{ width: '80%' }}
                        ></div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-2">
                        Provide Your Details
                    </h1>
                    <p className="text-lg font-medium text-gray-900">Step 4: Provide your contact detail</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="yourFirstName" className="text-gray-900 font-semibold text-sm mb-2 block">
                                First Name
                            </Label>
                            <Input
                                id="yourFirstName"
                                name="yourFirstName"
                                onChange={handleChange}
                                value={values.yourFirstName}
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.yourFirstName && errors.yourFirstName && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.yourFirstName}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="yourLastName" className="text-gray-900 font-semibold text-sm mb-2 block">
                                Last Name
                            </Label>
                            <Input
                                id="yourLastName"
                                name="yourLastName"
                                onChange={handleChange}
                                value={values.yourLastName}
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.yourLastName && errors.yourLastName && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.yourLastName}</p>
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
                                name="yourMobile"
                                onChange={handleChange}
                                value={values.yourMobile}
                                placeholder="08012345678"
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.yourMobile && errors.yourMobile && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.yourMobile}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="yourEmail" className="text-gray-900 font-semibold text-sm mb-2 block">
                                Email
                            </Label>
                            <Input
                                id="yourEmail"
                                name="yourEmail"
                                type="email"
                                onChange={handleChange}
                                value={values.yourEmail}
                                className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                            />
                            {touched.yourEmail && errors.yourEmail && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.yourEmail}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <Label className="text-gray-900 font-semibold text-sm mb-2 block">
                            Relationship to school
                        </Label>
                        <Select
                            value={values.relationshipToSchool}
                            onValueChange={(value) => setFieldValue('relationshipToSchool', value)}
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
                        {touched.relationshipToSchool && errors.relationshipToSchool && (
                            <p className="text-white text-sm mt-1 font-medium">{errors.relationshipToSchool}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="reasonForNomination" className="text-gray-900 font-semibold text-sm mb-2 block">
                            Reason for nomination
                        </Label>
                        <Textarea
                            id="reasonForNomination"
                            name="reasonForNomination"
                            onChange={handleChange}
                            value={values.reasonForNomination}
                            rows={5}
                            className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] resize-none"
                        />
                        {touched.reasonForNomination && errors.reasonForNomination && (
                            <p className="text-white text-sm mt-1 font-medium">{errors.reasonForNomination}</p>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <Button
                            type="submit"
                            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-10 py-6 h-auto rounded-full shadow-md min-w-[200px]"
                        >
                            Submit Nomination
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
