import { z } from 'zod';

export const ageVerificationSchema = z.object({
  day: z.string().min(1, 'Day is required').refine((val) => {
    const num = parseInt(val);
    return num >= 1 && num <= 31;
  }, 'Invalid day'),
  month: z.string().min(1, 'Month is required').refine((val) => {
    const num = parseInt(val);
    return num >= 1 && num <= 12;
  }, 'Invalid month'),
  year: z.string().min(4, 'Year is required').refine((val) => {
    const num = parseInt(val);
    const currentYear = new Date().getFullYear();
    return num >= 1900 && num <= currentYear;
  }, 'Invalid year'),
}).refine((data) => {
  const birthDate = new Date(`${data.year}-${data.month}-${data.day}`);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 18;
}, {
  message: 'You must be 18 or older',
  path: ['year'],
});

export const parentGuardianSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  mobileNo: z.string().min(10, 'Invalid mobile number'),
  relationship: z.string().min(1, 'Relationship is required'),
});

export const childSchoolSchema = z.object({
  childNumber: z.string().optional(),
  childFirstName: z.string().min(2, 'Child first name is required'),
  childLastName: z.string().min(2, 'Child last name is required'),
  age: z.string().min(1, 'Age is required'),
  gender: z.string().min(1, 'Gender is required'),
  state: z.string().min(1, 'State is required'),
  lga: z.string().min(1, 'LGA is required'),
  schoolType: z.enum(['primary', 'secondary']).refine((val) => !!val, {
    message: 'School type is required',
  }),
  schoolName: z.string().min(2, 'School name is required'),
});

export const consentSchema = z.object({
  isParentGuardian: z.boolean().refine((val) => val === true, {
    message: 'You must confirm you are the parent/guardian',
  }),
  givePermission: z.boolean().refine((val) => val === true, {
    message: 'Permission is required to continue',
  }),
  confirmOriginal: z.boolean().refine((val) => val === true, {
    message: 'You must confirm the design is original',
  }),
});
