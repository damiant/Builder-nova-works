import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import SimpleMap from "./SimpleMap";

interface Destination {
  id: string;
  name: string;
  state: string;
  region: string;
  rating: number;
  rooms: number;
  restaurants: number;
  description: string;
  phone: string;
  website: string;
  coordinates: { lat: number; lng: number };
}

interface MapWrapperProps {
  destinations: Destination[];
  selectedDestination?: string;
  onDestinationSelect?: (destinationId: string) => void;
}

export default function MapWrapper({
  destinations,
  selectedDestination,
  onDestinationSelect,
}: MapWrapperProps) {
  // Simply render the SimpleMap directly - no loading or error states needed
  return (
    <SimpleMap
      destinations={destinations}
      selectedDestination={selectedDestination}
      onDestinationSelect={onDestinationSelect}
    />
  );
}
