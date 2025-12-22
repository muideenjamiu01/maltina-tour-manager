import { z } from 'zod';

// Campaign Schemas
export const campaignSchema = z.object({
  name: z
    .string()
    .min(1, 'Campaign name is required')
    .max(100, 'Campaign name must not exceed 100 characters'),
  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),
  academicYear: z
    .string()
    .min(1, 'Academic year is required')
    .regex(/^\d{4}\/\d{4}$/, 'Academic year must be in format YYYY/YYYY'),
  startDate: z
    .string()
    .min(1, 'Start date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Please enter a valid start date'),
  endDate: z
    .string()
    .min(1, 'End date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Please enter a valid end date'),
  targetSchools: z
    .number()
    .min(1, 'Target schools must be at least 1')
    .max(1000, 'Target schools must not exceed 1000'),
})
.refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return start < end;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

export const campaignYearSchema = z.object({
  academicYear: z
    .string()
    .min(1, 'Academic year is required')
    .regex(/^\d{4}\/\d{4}$/, 'Academic year must be in format YYYY/YYYY'),
  startDate: z
    .string()
    .min(1, 'Start date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Please enter a valid start date'),
  endDate: z
    .string()
    .min(1, 'End date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Please enter a valid end date'),
  isActive: z.boolean().default(false),
})
.refine((data) => {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  return start < end;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

export const campaignTargetSchema = z.object({
  targetType: z
    .string()
    .min(1, 'Target type is required')
    .max(50, 'Target type must not exceed 50 characters'),
  targetValue: z
    .number()
    .min(1, 'Target value must be at least 1')
    .max(10000, 'Target value must not exceed 10000'),
  description: z
    .string()
    .max(200, 'Description must not exceed 200 characters')
    .optional(),
});

export const campaignMilestoneSchema = z.object({
  name: z
    .string()
    .min(1, 'Milestone name is required')
    .max(100, 'Milestone name must not exceed 100 characters'),
  description: z
    .string()
    .max(300, 'Description must not exceed 300 characters')
    .optional(),
  targetDate: z
    .string()
    .min(1, 'Target date is required')
    .refine((date) => !isNaN(Date.parse(date)), 'Please enter a valid target date'),
});

// Export types
export type CampaignFormData = z.infer<typeof campaignSchema>;
export type CampaignYearFormData = z.infer<typeof campaignYearSchema>;
export type CampaignTargetFormData = z.infer<typeof campaignTargetSchema>;
export type CampaignMilestoneFormData = z.infer<typeof campaignMilestoneSchema>;