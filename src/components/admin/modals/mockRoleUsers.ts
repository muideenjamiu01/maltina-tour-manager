export type RoleUser = {
  id: string
  name: string
  email: string
  status: "Active" | "Inactive"
  lastLogin: string
  assignedDate: string
}

export const ROLE_USERS: Record<string, RoleUser[]> = {
  "campaign-manager": [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@maltina.com",
      status: "Active",
      lastLogin: "2025-01-20",
      assignedDate: "2024-11-12",
    },
    {
      id: "2",
      name: "Sarah Jones",
      email: "sarah.jones@agency.com",
      status: "Active",
      lastLogin: "2025-01-18",
      assignedDate: "2024-10-01",
    },
  ],

  "recee-officer": [
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@corp.com",
      status: "Inactive",
      lastLogin: "2024-12-02",
      assignedDate: "2024-09-15",
    },
    {
      id: "4",
      name: "Aisha Bello",
      email: "aisha.bello@edu.ng",
      status: "Active",
      lastLogin: "2025-01-19",
      assignedDate: "2024-08-20",
    },
  ],

  "tour-coordinator": [
    {
      id: "5",
      name: "Daniel Okoye",
      email: "daniel.okoye@travel.com",
      status: "Active",
      lastLogin: "2025-01-21",
      assignedDate: "2024-12-05",
    },
  ],
}

/**
 * Helper (optional but recommended)
 * Single source of truth for user count
 */
export const getRoleUserCount = (roleId: string) =>
  ROLE_USERS[roleId]?.length ?? 0
