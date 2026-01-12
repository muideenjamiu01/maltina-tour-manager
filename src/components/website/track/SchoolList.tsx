"use client";

import React from 'react';
import Link from 'next/link';
import { School } from '@/types/tour.types';

interface SchoolListProps {
  schools: School[];
  groupByRegion?: boolean;
}

export default function SchoolList({ schools, groupByRegion = true }: SchoolListProps) {
  if (!groupByRegion) {
    return (
      <div className="space-y-4">
        {schools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    );
  }

  const groupedSchools = schools.reduce((acc, school) => {
    if (!acc[school.region]) {
      acc[school.region] = [];
    }
    acc[school.region].push(school);
    return acc;
  }, {} as Record<string, School[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedSchools).map(([region, regionSchools]) => (
        <div key={region} className="space-y-4">
          <h3 className="text-2xl font-bold text-gray-900">{region}</h3>
          <div className="space-y-3">
            {regionSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function SchoolCard({ school }: { school: School }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-200 transition-colors">
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-1">{school.name}</h4>
        <p className="text-sm text-gray-600">
          {school.lga} • {school.state}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {school.visited && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F66F39]"></div>
            <span className="text-sm font-medium text-gray-900">Visited</span>
          </div>
        )}
        <Link
          href={`/track/${school.id}`}
          className="text-sm font-semibold text-[#F66F39] hover:text-[#E8673F] underline"
        >
          View details
        </Link>
      </div>
    </div>
  );
}
