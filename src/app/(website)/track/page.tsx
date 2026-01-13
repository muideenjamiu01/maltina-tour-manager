"use client";

import React, { useState, useEffect } from 'react';
import TourMetricsCards from '@/components/website/track/TourMetricsCards';
import TourMap from '@/components/website/track/TourMap';
import RegionTabs from '@/components/website/track/RegionTabs';
import TourFilters from '@/components/website/track/TourFilters';
import SchoolList from '@/components/website/track/SchoolList';
import { School, TourMetrics } from '@/types/tour.types';
import { regions, nigeriaStates, mockSchools, tourMetrics } from '@/data/tour-mock-data';

export default function TrackTheTourPage() {
  const [metrics] = useState<TourMetrics>(tourMetrics);
  const [schools] = useState<School[]>(mockSchools);
  const [filteredSchools, setFilteredSchools] = useState<School[]>(mockSchools);

  // Filter states
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedSchoolType, setSelectedSchoolType] = useState<string>('all');

  useEffect(() => {
    applyFilters();
  }, [selectedRegion, selectedState, selectedSchoolType]);

  const applyFilters = () => {
    let filtered = [...schools];

    if (selectedRegion) {
      filtered = filtered.filter((school) => school.region === selectedRegion);
    }

    if (selectedState !== 'all') {
      filtered = filtered.filter((school) => school.state === selectedState);
    }

    if (selectedSchoolType !== 'all') {
      filtered = filtered.filter((school) => school.schoolType === selectedSchoolType);
    }

    setFilteredSchools(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5A623] via-[#F9B850] to-[#FF8C42]">
      <div className="container mx-auto px-4 py-8 md:py-12 mt-12 md:mt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-lilita mb-4">
            Tour Tracker
          </h1>
          <p className="text-lg md:text-xl text-gray-900 font-semibold">
            See where the bus has been, and what's still ahead.
          </p>
        </div>

        {/* Metrics Cards */}
        <TourMetricsCards metrics={metrics} />

        {/* Map */}
        <div className="mb-8">
          <TourMap schools={schools} />
        </div>

        {/* Region Tabs */}
        <RegionTabs
          regions={regions}
          activeRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
        />

        {/* Filters */}
        <TourFilters
          states={nigeriaStates}
          selectedState={selectedState}
          selectedSchoolType={selectedSchoolType}
          onStateChange={setSelectedState}
          onSchoolTypeChange={setSelectedSchoolType}
        />

        {/* School List */}
        {filteredSchools.length > 0 ? (
          <SchoolList schools={filteredSchools} groupByRegion={!selectedRegion} />
        ) : (
          <div className="text-center py-12">
            <p className="text-white text-lg">No schools found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
