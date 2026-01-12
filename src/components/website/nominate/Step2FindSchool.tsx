"use client";

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, Step2Schema } from '@/lib/validators/nomination.validator';
import { NominationFormData, SchoolOption } from '@/types/nomination.types';
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
import { lgasByState, mockSchools } from '@/data/nomination-mock-data';
import { Badge } from '@/components/ui/badge';

interface Step2Props {
  formData: Partial<NominationFormData>;
  updateFormData: (data: Partial<NominationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2FindSchool({ formData, updateFormData, onNext, onBack }: Step2Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState(formData.schoolId || '');

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Step2Schema>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      lga: formData.lga || '',
      schoolId: formData.schoolId || '',
      manualEntry: formData.manualEntry || false,
    },
  });

  const lga = watch('lga');
  const availableLgas = lgasByState[formData.state || ''] || [];

  const filteredSchools = useMemo(() => {
    return mockSchools.filter((school) => {
      const matchesState = school.state === formData.state;
      const matchesLga = lga ? school.lga === lga : true;
      const matchesType = school.type === formData.schoolType;
      const matchesSearch = searchQuery
        ? school.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      return matchesState && matchesLga && matchesType && matchesSearch;
    });
  }, [formData.state, formData.schoolType, lga, searchQuery]);

  const handleSelectSchool = (school: SchoolOption) => {
    setSelectedSchoolId(school.id);
    setValue('schoolId', school.id);
    updateFormData({
      schoolId: school.id,
      schoolName: school.name,
      state: school.state,
      lga: school.lga,
      schoolType: school.type,
      manualEntry: false,
    });
  };

  const handleManualEntry = () => {
    updateFormData({
      schoolId: undefined,
      manualEntry: true,
    });
    onNext();
  };

  const onSubmit = (data: Step2Schema) => {
    updateFormData(data);
    onNext();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return null;
      case 'Not yet activated':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Not yet activated
          </Badge>
        );
      case 'Visited':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Visited
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="space-y-6 min-h-screen py-8 px-4 bg-cover bg-center bg-no-repeat -mx-4 -my-8 md:-my-12"
      style={{
        backgroundImage: "url('/images/websites/challenge/step-two.png')",
      }}
    >
      <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="text-center space-y-2 mb-6">
        <div className="flex justify-between text-sm md:text-base text-gray-900 font-semibold">
          <span>Step 2 of 3</span>
          <span>67% Complete</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2">
          <div className="bg-white h-2 rounded-full" style={{ width: '67%' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-2">
          Nominate a School
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step Title */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Step 2 of 3 – Find the school
          </h2>
        </div>

        {/* LGA Selection */}
        <div>
          <Select
            value={lga}
            onValueChange={(value) => setValue('lga', value, { shouldValidate: true })}
          >
            <SelectTrigger className="w-full bg-white border-none h-12 text-base">
              <SelectValue placeholder="Select LGA" />
            </SelectTrigger>
            <SelectContent>
              {availableLgas.map((lgaName) => (
                <SelectItem key={lgaName} value={lgaName}>
                  {lgaName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.lga && (
            <p className="text-red-600 text-sm mt-1 font-medium">{errors.lga.message}</p>
          )}
        </div>

        {/* School Type Display */}
        <div>
          <Label className="text-gray-900 font-semibold text-sm mb-2 block">
            {formData.schoolType} School
          </Label>
        </div>

        {/* Search Input */}
        <div>
          <Input
            type="text"
            placeholder="Start typing the school name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border-none focus:ring-2 focus:ring-[#F66F39] h-12"
          />
        </div>

        {/* School List */}
        {lga && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredSchools.length > 0 ? (
              filteredSchools.map((school) => (
                <div
                  key={school.id}
                  className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{school.name}</h3>
                    <p className="text-sm text-gray-600">
                      {school.lga}, {school.state}
                    </p>
                    <p className="text-sm text-gray-600">Type: {school.type}</p>
                    {getStatusBadge(school.status)}
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleSelectSchool(school)}
                    variant="outline"
                    className={`ml-4 ${
                      selectedSchoolId === school.id
                        ? 'bg-[#F5A623] text-white border-[#F5A623]'
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}
                  >
                    {selectedSchoolId === school.id ? 'Selected' : 'Select'}
                  </Button>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-lg text-center text-gray-600">
                No schools found matching your criteria.
              </div>
            )}
          </div>
        )}

        {/* Manual Entry Option */}
        <div className="text-center">
          <p className="text-gray-900 font-medium mb-3">Can't find the school in this list?</p>
          <Button
            type="button"
            onClick={handleManualEntry}
            variant="outline"
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8 py-6 h-auto rounded-lg border-none shadow-md"
          >
            Add school details manually
          </Button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            disabled={!selectedSchoolId}
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8 py-6 h-auto rounded-lg shadow-md disabled:opacity-50"
          >
            Continue
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
