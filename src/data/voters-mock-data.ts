// Mock voters record database
export type Voter = {
  id: string;
  email?: string;
  phone?: string;
  designId: number;
  designName: string;
  voteDate: string;
  ipAddress?: string;
};

// Simulated voters database
export const mockVoters: Voter[] = [
  {
    id: "v1",
    email: "john.doe@gmail.com",
    designId: 1,
    designName: "Abstract Dreams",
    voteDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "v2",
    phone: "+2348012345678",
    designId: 3,
    designName: "Nature's Canvas",
    voteDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "v3",
    email: "alice.smith@outlook.com",
    designId: 2,
    designName: "Digital Revolution",
    voteDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "v4",
    phone: "+2349876543210",
    designId: 5,
    designName: "Cultural Heritage",
    voteDate: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "v5",
    email: "test@example.com",
    designId: 4,
    designName: "Modern Minimalism",
    voteDate: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
];
