export type Role = {
  id: string
  name: string
  type: "System" | "Custom"
  desc: string
  permissions: string[]
}

export const ROLES: Role[] = [
  {
    id: "campaign-manager",
    name: "Campaign Manager",
    type: "System",
    desc: "Manages campaigns, cycles, and competitions",
    permissions: [
      "Create Campaign",
      "Edit Campaign",
      "Delete Campaign",
      "View Reports",
      "Manage Cycles",
      "Assign Schools",
    ],
  },
  {
    id: "recee-officer",
    name: "RECEE Officer",
    type: "System",
    desc: "Conducts school inspections and submissions",
    permissions: [
      "Submit Inspection",
      "Edit Inspection",
      "Upload Evidence",
      "View Assigned Schools",
      "Submit Reports",
    ],
  },
  {
    id: "tour-coordinator",
    name: "Tour Coordinator",
    type: "Custom",
    desc: "Coordinates tour logistics and bookings",
    permissions: [
      "Create Tour",
      "Edit Tour",
      "Assign Vehicles",
      "Manage Bookings",
      "View Schedules",
    ],
  },
]
