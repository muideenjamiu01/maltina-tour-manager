export interface NominationFormData {
  // Step 1
  state: string;
  schoolType: 'Primary' | 'Secondary';
  
  // Step 2
  lga: string;
  schoolId?: string;
  manualEntry?: boolean;
  
  // Step 3 - School Details
  schoolName: string;
  schoolAddress: string;
  
  // Principal Details
  principalFirstName: string;
  principalLastName: string;
  principalMobile: string;
  principalEmail: string;
  
  // Your Details
  yourFirstName: string;
  yourLastName: string;
  yourMobile: string;
  yourEmail: string;
  relationshipToSchool: string;
  reasonForNomination: string;
  
  // Verification
  verified: boolean;
}

export interface SchoolOption {
  id: string;
  name: string;
  state: string;
  lga: string;
  type: 'Primary' | 'Secondary';
  status: 'Available' | 'Not yet activated' | 'Visited';
}
