import { SchoolOption } from '@/types/nomination.types';

export const nigerianStates = [
  'Lagos', 'Kano', 'Rivers', 'Oyo', 'Ogun', 'Kaduna', 'Edo', 'Delta',
  'Enugu', 'Anambra', 'Imo', 'Osun', 'Ekiti', 'Ondo', 'Kwara', 'Niger',
  'Plateau', 'Abuja', 'Benue', 'Kogi', 'Nasarawa', 'Taraba', 'Adamawa',
  'Bauchi', 'Borno', 'Gombe', 'Yobe', 'Jigawa', 'Katsina', 'Kebbi',
  'Sokoto', 'Zamfara', 'Abia', 'Akwa Ibom', 'Bayelsa', 'Cross River', 'Ebonyi',
];

export const lgasByState: Record<string, string[]> = {
  Lagos: ['Ikeja', 'Surulere', 'Epe', 'Ikorodu', 'Alimosho', 'Oshodi-Isolo', 'Agege', 'Lagos Island', 'Lagos Mainland'],
  Kano: ['Kano Municipal', 'Fagge', 'Dala', 'Gwale', 'Nasarawa', 'Tarauni'],
  Rivers: ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Ikwerre', 'Oyigbo'],
  Abuja: ['Garki', 'Wuse', 'Asokoro', 'Maitama', 'Gwarinpa', 'Kubwa'],
  Oyo: ['Ibadan North', 'Ibadan South', 'Ibadan North-East', 'Akinyele', 'Egbeda'],
};

export const mockSchools: SchoolOption[] = [
  {
    id: 'school-1',
    name: 'Government Primary School Ikeja',
    state: 'Lagos',
    lga: 'Ikeja',
    type: 'Primary',
    status: 'Available',
  },
  {
    id: 'school-2',
    name: 'Community Secondary School Ikeja',
    state: 'Lagos',
    lga: 'Ikeja',
    type: 'Secondary',
    status: 'Not yet activated',
  },
  {
    id: 'school-3',
    name: 'St. Mary Primary School',
    state: 'Lagos',
    lga: 'Ikeja',
    type: 'Primary',
    status: 'Visited',
  },
  {
    id: 'school-4',
    name: 'Unity High School',
    state: 'Lagos',
    lga: 'Surulere',
    type: 'Secondary',
    status: 'Available',
  },
  {
    id: 'school-5',
    name: 'Central Primary School Epe',
    state: 'Lagos',
    lga: 'Epe',
    type: 'Primary',
    status: 'Available',
  },
];

export const relationshipOptions = [
  'Parent/Guardian',
  'Teacher',
  'Principal',
  'Student',
  'Alumni',
  'Community Member',
  'Education Official',
  'Other',
];
