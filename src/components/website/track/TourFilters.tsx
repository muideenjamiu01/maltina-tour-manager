"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TourFiltersProps {
  states: string[];
  selectedState: string;
  selectedSchoolType: string;
  onStateChange: (state: string) => void;
  onSchoolTypeChange: (type: string) => void;
}

export default function TourFilters({
  states,
  selectedState,
  selectedSchoolType,
  onStateChange,
  onSchoolTypeChange,
}: TourFiltersProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <Select value={selectedState} onValueChange={onStateChange}>
        <SelectTrigger className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39]">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All States</SelectItem>
          {states.map((state) => (
            <SelectItem key={state} value={state}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedSchoolType} onValueChange={onSchoolTypeChange}>
        <SelectTrigger className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39]">
          <SelectValue placeholder="School Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="Primary">Primary</SelectItem>
          <SelectItem value="Secondary">Secondary</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
