"use client";

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NominationFormData } from '@/types/nomination.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { nigerianStates, lgasByState } from '@/data/nomination-mock-data';
import { CheckCircle } from 'lucide-react';

interface Step2ManualProps {
    formData: Partial<NominationFormData>;
    updateFormData: (data: Partial<NominationFormData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function Step2ManualSchoolDetails({
    formData,
    updateFormData,
    onNext,
    onBack,
}: Step2ManualProps) {
    const formik = useFormik({
        initialValues: {
            schoolName: formData.schoolName || '',
            schoolAddress: formData.schoolAddress || '',
            state: formData.state || '',
            lga: formData.lga || '',
            schoolType: formData.schoolType || 'Primary',
        },
        validationSchema: Yup.object({
            schoolName: Yup.string().required('School Name is required'),
            schoolAddress: Yup.string().required('School Address is required'),
            state: Yup.string().required('State is required'),
            lga: Yup.string().required('LGA is required'),
            schoolType: Yup.string().required('School Type is required'),
        }),
        onSubmit: (values) => {
            updateFormData(values);
            onNext();
        },
    });

    const { values, errors, touched, setFieldValue, handleSubmit, handleChange } = formik;
    const availableLgas = values.state ? lgasByState[values.state] || [] : [];

    return (
        <div
            className="space-y-6 min-h-screen py-8 mt-[80px] bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('/images/websites/nominate/step-3.png')",
            }}
        >
            <div className="breakpoint mx-auto">
                {/* Progress Bar (Adjusted for flow) */}
                <div className="text-center md:w-1/2 mx-auto space-y-2 mb-6">
                    <div className="flex justify-between text-sm md:text-base text-gray-900 font-semibold">
                        <span>Step 2 of 5</span>
                        <span>40% Complete</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2">
                        <div
                            className="bg-[#FF6F38] h-2 rounded-full"
                            style={{ width: '40%' }}
                        ></div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-2">
                        Nominate a School
                    </h1>
                    <p className="text-lg font-medium text-gray-900">Provide School Details</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 md:w-2/3 mx-auto">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                            School Details
                        </h2>
                    </div>

                    {/* School Name */}
                    <div>
                        <Label htmlFor="schoolName" className="text-gray-900 font-semibold text-sm mb-2 block">
                            School Name
                        </Label>
                        <Input
                            id="schoolName"
                            name="schoolName"
                            onChange={handleChange}
                            value={values.schoolName}
                            className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                        />
                        {touched.schoolName && errors.schoolName && (
                            <p className="text-white text-sm mt-1 font-medium">{errors.schoolName}</p>
                        )}
                    </div>

                    {/* School Address */}
                    <div>
                        <Label htmlFor="schoolAddress" className="text-gray-900 font-semibold text-sm mb-2 block">
                            School Address
                        </Label>
                        <Input
                            id="schoolAddress"
                            name="schoolAddress"
                            onChange={handleChange}
                            value={values.schoolAddress}
                            className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
                        />
                        {touched.schoolAddress && errors.schoolAddress && (
                            <p className="text-white text-sm mt-1 font-medium">{errors.schoolAddress}</p>
                        )}
                    </div>

                    {/* State & LGA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="state" className="text-gray-900 font-semibold text-sm mb-2 block">
                                State
                            </Label>
                            <Select
                                value={values.state}
                                onValueChange={(val) => {
                                    setFieldValue('state', val);
                                    setFieldValue('lga', ''); // Reset LGA when state changes
                                }}
                            >
                                <SelectTrigger className="w-full bg-white border-none h-12">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {nigerianStates.map((state) => (
                                        <SelectItem key={state} value={state}>
                                            {state}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {touched.state && errors.state && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.state}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="lga" className="text-gray-900 font-semibold text-sm mb-2 block">
                                LGA
                            </Label>
                            <Select
                                value={values.lga}
                                onValueChange={(val) => setFieldValue('lga', val)}
                                disabled={!values.state}
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
                            {touched.lga && errors.lga && (
                                <p className="text-white text-sm mt-1 font-medium">{errors.lga}</p>
                            )}
                        </div>
                    </div>

                    {/* School Type */}
                    <div>
                        <Label className="text-gray-900 font-semibold text-sm mb-3 block">
                            School Type <span className="text-[#E8673F]">*</span>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setFieldValue('schoolType', 'Primary')}
                                className={`flex items-center justify-center py-4 px-6 rounded-lg text-base font-semibold transition-all ${values.schoolType === 'Primary'
                                    ? 'bg-white text-[#F66F39] border-[#F66F39] border shadow-lg'
                                    : 'bg-white/50 text-gray-700 hover:bg-white/80'
                                    }`}
                            >
                                Primary School {
                                    values.schoolType === 'Primary' && (
                                        <CheckCircle className="w-5 text-[#F66F39] h-5 ml-2" />
                                    )
                                }
                            </button>
                            <button
                                type="button"
                                onClick={() => setFieldValue('schoolType', 'Secondary')}
                                className={`flex items-center justify-center py-4 px-6 rounded-lg text-base font-semibold transition-all ${values.schoolType === 'Secondary'
                                    ? 'bg-white text-[#F66F39] border-[#F66F39] border shadow-lg'
                                    : 'bg-white/50 text-gray-700 hover:bg-white/80'
                                    }`}
                            >
                                Secondary School {
                                    values.schoolType === 'Secondary' && (
                                        <CheckCircle className="w-5 text-[#F66F39] h-5 ml-2" />
                                    )
                                }
                            </button>
                        </div>
                        {touched.schoolType && errors.schoolType && (
                            <p className="text-white text-sm mt-1 font-medium">{errors.schoolType}</p>
                        )}
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
