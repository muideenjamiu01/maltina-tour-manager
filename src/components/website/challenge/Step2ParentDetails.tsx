"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { parentGuardianSchema } from '@/lib/validators/challenge.validator';
import { ParentGuardianData } from '@/types/challenge.form.types';
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

interface Step2Props {
  onNext: (data: ParentGuardianData) => void;
  onBack: () => void;
  defaultValues?: ParentGuardianData;
}

export default function Step2ParentDetails({ onNext, onBack, defaultValues }: Step2Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ParentGuardianData>({
    resolver: zodResolver(parentGuardianSchema),
    defaultValues,
  });

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/websites/challenge/step-two.png)' }}
    >
      <div className="flex-1 flex items-center justify-center px-4 py-12 mt-12 md:mt-24">
        <div className="w-full max-w-3xl space-y-8">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h1 className="font-lilita text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              Submit a Lunch Bag Design
            </h1>
            <p className="text-xl font-semibold text-gray-900">
              Parent or guardian, please enter your details first.
            </p>
            <p className="text-sm text-gray-800">
              Step 2 of 6 - Your contact details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onNext)} className="space-y-6 bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-900 font-semibold">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 font-medium">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-900 font-semibold">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 font-medium">{errors.lastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-900 font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNo" className="text-gray-900 font-semibold">
                  Mobile No *
                </Label>
                <Input
                  id="mobileNo"
                  {...register('mobileNo')}
                  className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]"
                />
                {errors.mobileNo && (
                  <p className="text-sm text-red-600 font-medium">{errors.mobileNo.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-gray-900 font-semibold">
                Relationship to child
              </Label>
              <Select
                onValueChange={(value) => setValue('relationship', value)}
                defaultValue={defaultValues?.relationship}
              >
                <SelectTrigger className="h-12 bg-white border-0 shadow-md focus:ring-2 focus:ring-[#F66F39] focus:border-[#F66F39]">
                  <SelectValue placeholder="Parent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.relationship && (
                <p className="text-sm text-red-600 font-medium">{errors.relationship.message}</p>
              )}
            </div>

            <p className="text-sm text-gray-800 text-center">
              We'll use these details to contact you about this entry. You can submit designs for more than one child.
            </p>

            <div className="flex gap-4 justify-center pt-4">
              <Button
                type="submit"
                className="min-w-[160px] h-12 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
              >
                Continue
              </Button>
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="min-w-[160px] h-12 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-md"
              >
                Return Home
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
