export interface AgeVerificationData {
  day: string;
  month: string;
  year: string;
}

export interface ParentGuardianData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  relationship: string;
}

export interface ChildSchoolData {
  childNumber?: string;
  childFirstName: string;
  childLastName: string;
  age: string;
  gender: string;
  state: string;
  lga: string;
  schoolType: 'primary' | 'secondary';
  schoolName: string;
}

export interface UploadData {
  rightSide: File | null;
  leftSide: File | null;
  inside: File | null;
  top: File | null;
  bottom: File | null;
  video: File | null;
}

export interface ConsentData {
  isParentGuardian: boolean;
  givePermission: boolean;
  confirmOriginal: boolean;
}

export interface ChallengeFormData {
  ageVerification: AgeVerificationData;
  parentGuardian: ParentGuardianData;
  childSchool: ChildSchoolData;
  uploads: UploadData;
  consent: ConsentData;
}
