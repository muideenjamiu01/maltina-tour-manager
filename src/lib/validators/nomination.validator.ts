import { z } from 'zod';

export const step1Schema = z.object({
  state: z.string().min(1, 'Please select a state'),
  schoolType: z.enum(['Primary', 'Secondary']),
});

export const step2Schema = z.object({
  lga: z.string().min(1, 'Please select an LGA'),
  schoolId: z.string().optional(),
  manualEntry: z.boolean().optional(),
});

export const step3Schema = z.object({
  schoolName: z.string().min(3, 'School name must be at least 3 characters'),
  schoolAddress: z.string().min(5, 'School address must be at least 5 characters'),
  state: z.string().min(1, 'Please select a state'),
  lga: z.string().min(1, 'Please select an LGA'),
  schoolType: z.enum(['Primary', 'Secondary']),
  
  principalFirstName: z.string().min(2, 'First name must be at least 2 characters'),
  principalLastName: z.string().min(2, 'Last name must be at least 2 characters'),
  principalMobile: z.string().regex(/^[0-9]{11}$/, 'Please enter a valid 11-digit mobile number'),
  principalEmail: z.string().email('Please enter a valid email address'),
  
  yourFirstName: z.string().min(2, 'First name must be at least 2 characters'),
  yourLastName: z.string().min(2, 'Last name must be at least 2 characters'),
  yourMobile: z.string().regex(/^[0-9]{11}$/, 'Please enter a valid 11-digit mobile number'),
  yourEmail: z.string().email('Please enter a valid email address'),
  relationshipToSchool: z.string().min(1, 'Please select your relationship to the school'),
  reasonForNomination: z.string().min(20, 'Reason must be at least 20 characters'),
  
  verified: z.boolean().refine((val) => val === true, {
    message: 'Please verify your details before submitting',
  }),
});

export type Step1Schema = z.infer<typeof step1Schema>;
export type Step2Schema = z.infer<typeof step2Schema>;
export type Step3Schema = z.infer<typeof step3Schema>;
