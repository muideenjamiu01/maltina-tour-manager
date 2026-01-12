"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { consentSchema } from '@/lib/validators/challenge.validator';
import { ConsentData } from '@/types/challenge.form.types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Step6Props {
  onNext: (data: ConsentData) => void;
  onBack: () => void;
  defaultValues?: ConsentData;
}

export default function Step6Consent({ onNext, onBack, defaultValues }: Step6Props) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConsentData>({
    resolver: zodResolver(consentSchema),
    defaultValues: defaultValues || {
      isParentGuardian: false,
      givePermission: false,
      confirmOriginal: false,
    },
  });

  const watchAll = watch();

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(/images/websites/challenge/step-6.png)' }}
    >
      <div className="w-full max-w-4xl space-y-8 mt-12 md:mt-24">
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-lilita text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Consent Checklist
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onNext)} className="space-y-8">
          <div className="space-y-6">
            {/* Consent 1 */}
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Checkbox
                id="isParentGuardian"
                checked={watchAll.isParentGuardian}
                onCheckedChange={(checked) => 
                  setValue('isParentGuardian', checked as boolean, { shouldValidate: true })
                }
                className="mt-1 h-8 w-8 border-2 border-white data-[state=checked]:bg-white data-[state=checked]:text-[#F5A623] focus:ring-2 focus:ring-[#F66F39]"
              />
              <Label
                htmlFor="isParentGuardian"
                className="text-lg md:text-xl text-white font-medium leading-relaxed cursor-pointer"
              >
                I am the parent / guardian / authorised school representative for this child.
              </Label>
            </div>
            {errors.isParentGuardian && (
              <p className="text-sm text-red-200 font-medium pl-12">{errors.isParentGuardian.message}</p>
            )}

            {/* Consent 2 */}
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Checkbox
                id="givePermission"
                checked={watchAll.givePermission}
                onCheckedChange={(checked) => 
                  setValue('givePermission', checked as boolean, { shouldValidate: true })
                }
                className="mt-1 h-8 w-8 border-2 border-white data-[state=checked]:bg-white data-[state=checked]:text-[#F5A623] focus:ring-2 focus:ring-[#F66F39]"
              />
              <Label
                htmlFor="givePermission"
                className="text-lg md:text-xl text-white font-medium leading-relaxed cursor-pointer"
              >
                I give permission for this artwork and the child's first name, age, gender and school to be used for campaign materials if selected.
              </Label>
            </div>
            {errors.givePermission && (
              <p className="text-sm text-red-200 font-medium pl-12">{errors.givePermission.message}</p>
            )}

            {/* Consent 3 */}
            <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <Checkbox
                id="confirmOriginal"
                checked={watchAll.confirmOriginal}
                onCheckedChange={(checked) => 
                  setValue('confirmOriginal', checked as boolean, { shouldValidate: true })
                }
                className="mt-1 h-8 w-8 border-2 border-white data-[state=checked]:bg-white data-[state=checked]:text-[#F5A623] focus:ring-2 focus:ring-[#F66F39]"
              />
              <Label
                htmlFor="confirmOriginal"
                className="text-lg md:text-xl text-white font-medium leading-relaxed cursor-pointer"
              >
                I confirm this design was created by or with the child, and is not copied from another source.
              </Label>
            </div>
            {errors.confirmOriginal && (
              <p className="text-sm text-red-200 font-medium pl-12">{errors.confirmOriginal.message}</p>
            )}
          </div>

          <div className="flex gap-4 justify-center pt-6">
            <Button
              type="submit"
              className="min-w-[180px] h-14 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-lg uppercase"
            >
              Submit Design
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="min-w-[160px] h-14 text-lg font-bold bg-white text-gray-900 hover:bg-gray-100 shadow-lg uppercase"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
