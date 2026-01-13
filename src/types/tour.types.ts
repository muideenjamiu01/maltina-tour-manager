export interface TourMetrics {
  childrenReached: number;
  schoolsActivated: number;
  statesVisited: number;
  activationCompleted: number;
}

export interface SchoolLocation {
  lat: number;
  lng: number;
}

export interface School {
  id: string;
  name: string;
  state: string;
  lga: string;
  region: 'South West' | 'North Central' | 'North West' | 'South South' | 'South East' | 'North East';
  schoolType: 'Primary' | 'Secondary';
  ownership: 'Public' | 'Private';
  location: SchoolLocation;
  visited: boolean;
  visitDate?: string;
  studentsReached?: number;
  samplesDistributed?: number;
  story?: string;
  images?: string[];
  videos?: { title: string; url: string }[];
  testimonials?: { name: string; class: string; quote: string }[];
}

export interface RegionData {
  region: string;
  schools: School[];
}

export interface TourFilters {
  state?: string;
  schoolType?: string;
  region?: string;
}
