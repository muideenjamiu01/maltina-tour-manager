"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit } from 'lucide-react';

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
  formData: any;
}

export default function Step5ReviewSubmit({ onNext, onBack, onEdit, formData }: Step5Props) {
  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/websites/challenge/step-5.png)' }}
    >
      <div className="flex-1 px-4 py-12 mt-12 md:mt-24">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="font-lilita text-4xl md:text-5xl font-black text-white leading-tight">
              Review and Submit
            </h1>
            <p className="text-sm text-gray-800">
              Step 4 of 4 - Confirm & submit
            </p>
          </div>

          {/* Review Cards */}
          <div className="space-y-4">
            {/* Adult Details */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-bold">Adult Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(2)}
                  className="text-[#F5A623] hover:text-[#E89515]"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Name:</span> {formData?.parentGuardian?.firstName} {formData?.parentGuardian?.lastName}</p>
                <p><span className="font-semibold">Email:</span> {formData?.parentGuardian?.email}</p>
                <p><span className="font-semibold">Mobile:</span> {formData?.parentGuardian?.mobileNo}</p>
                <p><span className="font-semibold">Relationship:</span> {formData?.parentGuardian?.relationship}</p>
              </CardContent>
            </Card>

            {/* Child Details */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-bold">Child Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(3)}
                  className="text-[#F5A623] hover:text-[#E89515]"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">Name:</span> {formData?.childSchool?.childFirstName} {formData?.childSchool?.childLastName}</p>
                <p><span className="font-semibold">Age:</span> {formData?.childSchool?.age}</p>
                <p><span className="font-semibold">Gender:</span> {formData?.childSchool?.gender}</p>
                <p><span className="font-semibold">Class:</span> {formData?.childSchool?.childNumber}</p>
              </CardContent>
            </Card>

            {/* School Details */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-bold">School Details</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(3)}
                  className="text-[#F5A623] hover:text-[#E89515]"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p><span className="font-semibold">State:</span> {formData?.childSchool?.state}</p>
                <p><span className="font-semibold">LGA:</span> {formData?.childSchool?.lga}</p>
                <p><span className="font-semibold">School:</span> {formData?.childSchool?.schoolName}</p>
                <p><span className="font-semibold">Type:</span> {formData?.childSchool?.schoolType}</p>
              </CardContent>
            </Card>

            {/* Upload */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-bold">Upload</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(4)}
                  className="text-[#F5A623] hover:text-[#E89515]"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p className="font-semibold mb-2">Images:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>5 images uploaded</li>
                  <li>1 video uploaded</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button
              type="button"
              onClick={onNext}
              className="min-w-[180px] h-12 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
            >
              Submit Design
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="min-w-[160px] h-12 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
