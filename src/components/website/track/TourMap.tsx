"use client";

import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { School } from '@/types/tour.types';

interface TourMapProps {
  schools: School[];
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 9.0820,
  lng: 8.6753,
};

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#66b3ff' }],
  },
];

export default function TourMap({ schools }: TourMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const visitedSchools = schools.filter((school) => school.visited);

  const pathCoordinates = visitedSchools.map((school) => ({
    lat: school.location.lat,
    lng: school.location.lng,
  }));

  const polylineOptions = {
    strokeColor: '#333333',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    geodesic: true,
    icons: [
      {
        icon: {
          path: 'M 0,-1 0,1',
          strokeOpacity: 1,
          scale: 3,
        },
        offset: '0',
        repeat: '20px',
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-white">
      <LoadScript 
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        onLoad={() => setIsLoaded(true)}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={6}
          options={{
            styles: mapStyles,
            disableDefaultUI: false,
            zoomControl: true,
          }}
        >
          {/* Route line */}
          {pathCoordinates.length > 1 && (
            <Polyline path={pathCoordinates} options={polylineOptions} />
          )}

          {/* School markers */}
          {isLoaded && visitedSchools.map((school) => (
            <Marker
              key={school.id}
              position={school.location}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: '#E8673F',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                scale: 10,
              }}
              title={school.name}
            />
          ))}

          {/* Bus icon - positioned at last school */}
          {isLoaded && visitedSchools.length > 0 && (
            <Marker
              position={visitedSchools[visitedSchools.length - 1].location}
              icon={{
                path: 'M 12,2 C 11.172,2 10.5,2.672 10.5,3.5 v 1 H 6 c -1.108,0 -2,0.892 -2,2 v 10 c 0,1.108 0.892,2 2,2 h 1 c 0,1.105 0.895,2 2,2 1.105,0 2,-0.895 2,-2 h 2 c 0,1.105 0.895,2 2,2 1.105,0 2,-0.895 2,-2 h 1 c 1.108,0 2,-0.892 2,-2 V 6.5 C 20,5.672 19.328,5 18.5,5 H 13.5 V 3.5 C 13.5,2.672 12.828,2 12,2 Z m 0,1 c 0.276,0 0.5,0.224 0.5,0.5 V 5 H 11.5 V 3.5 C 11.5,3.224 11.724,3 12,3 Z M 6,5.5 h 12.5 c 0.276,0 0.5,0.224 0.5,0.5 v 10 c 0,0.554 -0.446,1 -1,1 h -1 v -1 c 0,-1.105 -0.895,-2 -2,-2 -1.105,0 -2,0.895 -2,2 v 1 h -2 v -1 c 0,-1.105 -0.895,-2 -2,-2 -1.105,0 -2,0.895 -2,2 v 1 H 6 C 5.446,17 5,16.554 5,16 V 6.5 C 5,5.946 5.446,5.5 6,5.5 Z m 3,10.5 c 0.552,0 1,0.448 1,1 v 1 c 0,0.552 -0.448,1 -1,1 -0.552,0 -1,-0.448 -1,-1 v -1 c 0,-0.552 0.448,-1 1,-1 z m 6,0 c 0.552,0 1,0.448 1,1 v 1 c 0,0.552 -0.448,1 -1,1 -0.552,0 -1,-0.448 -1,-1 v -1 c 0,-0.552 0.448,-1 1,-1 z',
                fillColor: '#FFD700',
                fillOpacity: 1,
                strokeColor: '#000000',
                strokeWeight: 1,
                scale: 2,
                anchor: new window.google.maps.Point(12, 12),
              }}
              title="Tour Bus"
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
