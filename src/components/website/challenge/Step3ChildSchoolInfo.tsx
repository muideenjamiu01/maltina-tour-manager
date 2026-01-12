"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { childSchoolSchema } from '@/lib/validators/challenge.validator';
import { ChildSchoolData } from '@/types/challenge.form.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Step3Props {
  onNext: (data: ChildSchoolData) => void;
  onBack: () => void;
  defaultValues?: ChildSchoolData;
}

export default function Step3ChildSchoolInfo({ onNext, onBack, defaultValues }: Step3Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ChildSchoolData>({
    resolver: zodResolver(childSchoolSchema),
    defaultValues,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl space-y-8">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Child & School Information
            </h1>
            <p className="text-sm text-gray-800">
              Step 2 of 4 - Your contact details
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onNext)} className="space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-lg">
            {/* Child's Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Child's Details</h2>

              <div className="space-y-2">
                <Label htmlFor="childNumber" className="text-gray-900 font-semibold">
                  Child's Number
                </Label>
                <Input
                  id="childNumber"
                  {...register('childNumber')}
                  className="h-12 bg-white border-0 shadow-md max-w-xs"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="childFirstName" className="text-gray-900 font-semibold">
                    Child First Name *
                  </Label>
                  <Input
                    id="childFirstName"
                    {...register('childFirstName')}
                    className="h-12 bg-white border-0 shadow-md"
                  />
                  {errors.childFirstName && (
                    <p className="text-sm text-red-600 font-medium">{errors.childFirstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="childLastName" className="text-gray-900 font-semibold">
                    Child Last Name *
                  </Label>
                  <Input
                    id="childLastName"
                    {...register('childLastName')}
                    className="h-12 bg-white border-0 shadow-md"
                  />
                  {errors.childLastName && (
                    <p className="text-sm text-red-600 font-medium">{errors.childLastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-900 font-semibold">
                    Age
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('age', value)}
                    defaultValue={defaultValues?.age}
                  >
                    <SelectTrigger className="h-12 bg-white border-0 shadow-md">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 13 }, (_, i) => i + 5).map((age) => (
                        <SelectItem key={age} value={age.toString()}>
                          {age}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.age && (
                    <p className="text-sm text-red-600 font-medium">{errors.age.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-gray-900 font-semibold">
                    Gender
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('gender', value)}
                    defaultValue={defaultValues?.gender}
                  >
                    <SelectTrigger className="h-12 bg-white border-0 shadow-md">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-sm text-red-600 font-medium">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* School Details */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">School Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-gray-900 font-semibold">
                    State
                  </Label>
                  <Select
                    onValueChange={(value) => setValue('state', value)}
                    defaultValue={defaultValues?.state}
                  >
                    <SelectTrigger className="h-12 bg-white border-0 shadow-md">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-sm text-red-600 font-medium">{errors.state.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900 font-semibold">
                    School Type *
                  </Label>
                  <Controller
                    name="schoolType"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-6 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="primary" id="primary" />
                          <Label htmlFor="primary" className="text-gray-900 font-normal cursor-pointer">
                            Primary School
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="secondary" id="secondary" />
                          <Label htmlFor="secondary" className="text-gray-900 font-normal cursor-pointer">
                            Secondary School
                          </Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.schoolType && (
                    <p className="text-sm text-red-600 font-medium">{errors.schoolType.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lga" className="text-gray-900 font-semibold">
                  LGA
                </Label>
                <Select
                  onValueChange={(value) => setValue('lga', value)}
                  defaultValue={defaultValues?.lga}
                >
                  <SelectTrigger className="h-12 bg-white border-0 shadow-md">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ikeja">Ikeja</SelectItem>
                    <SelectItem value="lekki">Lekki</SelectItem>
                  </SelectContent>
                </Select>
                {errors.lga && (
                  <p className="text-sm text-red-600 font-medium">{errors.lga.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="schoolName" className="text-gray-900 font-semibold">
                  School Name
                </Label>
                <Input
                  id="schoolName"
                  {...register('schoolName')}
                  placeholder="Start Typing School Name"
                  className="h-12 bg-white border-0 shadow-md"
                />
                {errors.schoolName && (
                  <p className="text-sm text-red-600 font-medium">{errors.schoolName.message}</p>
                )}
                <p className="text-sm text-gray-800">
                  Can't find the school? Add details manually.
                </p>
              </div>

              <p className="text-sm text-gray-800">
                You can only submit one design per child. We'll check for duplicate combinations of child name, age, gender, class and school.
              </p>
            </div>

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
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
