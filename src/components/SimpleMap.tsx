import { useState } from "react";
import { Crown, Star, MapPin, Phone, Globe, Bed, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface SimpleMapProps {
  destinations: Destination[];
  selectedDestination?: string;
  onDestinationSelect?: (destinationId: string) => void;
}

export default function SimpleMap({
  destinations,
  selectedDestination,
  onDestinationSelect,
}: SimpleMapProps) {
  const [hoveredDestination, setHoveredDestination] = useState<string>("");

  // Map bounds for USA (approximate)
  const mapBounds = {
    minLat: 24,
    maxLat: 49,
    minLng: -125,
    maxLng: -66,
  };

  // Convert lat/lng to percentage positions on the map
  const getPosition = (lat: number, lng: number) => {
    const x =
      ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y =
      ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  const getSelectedDestination = () => {
    return destinations.find(
      (d) => d.id === selectedDestination || d.id === hoveredDestination,
    );
  };

  const selectedDest = getSelectedDestination();

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-casino-950 via-casino-900 to-casino-800 rounded-lg overflow-hidden border border-napoleon-400/30">
      {/* USA Map Background */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full opacity-20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified USA outline */}
          <path
            d="M200 100 L800 100 L850 150 L900 200 L850 250 L800 300 L750 350 L700 400 L650 450 L600 480 L550 500 L500 520 L450 500 L400 480 L350 450 L300 400 L250 350 L200 300 L150 250 L100 200 L150 150 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="rgba(234, 179, 8, 0.1)"
            className="text-napoleon-400"
          />

          {/* Grid lines for visual appeal */}
          <defs>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(234, 179, 8, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Destination Pins */}
      <div className="absolute inset-0">
        {destinations.map((destination) => {
          const position = getPosition(
            destination.coordinates.lat,
            destination.coordinates.lng,
          );
          const isSelected = selectedDestination === destination.id;
          const isHovered = hoveredDestination === destination.id;

          return (
            <div
              key={destination.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              onClick={() => onDestinationSelect?.(destination.id)}
              onMouseEnter={() => setHoveredDestination(destination.id)}
              onMouseLeave={() => setHoveredDestination("")}
            >
              {/* Casino Pin */}
              <div
                className={`relative transition-all duration-300 ${isSelected || isHovered ? "scale-125" : "scale-100"} hover:scale-110`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-3 transition-all duration-300 ${
                    isSelected
                      ? "bg-napoleon-400 border-napoleon-300 shadow-lg shadow-napoleon-400/50"
                      : isHovered
                        ? "bg-napoleon-500 border-napoleon-400 shadow-md shadow-napoleon-400/30"
                        : "bg-napoleon-600 border-napoleon-500 shadow-sm"
                  }`}
                >
                  <Crown className="w-4 h-4 text-casino-900 m-auto mt-1" />
                </div>

                {/* Pulse animation for selected */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-full bg-napoleon-400 animate-ping opacity-30" />
                )}
              </div>

              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                  <div className="bg-casino-900/95 backdrop-blur-sm border border-napoleon-400/30 rounded-lg px-3 py-2 shadow-xl min-w-max">
                    <div className="text-sm font-semibold text-napoleon-300">
                      {destination.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {destination.state}
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-casino-900/95" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-casino-900/90 backdrop-blur-sm border border-napoleon-400/30 rounded-lg p-3">
        <h3 className="text-sm font-semibold text-napoleon-300 mb-2 flex items-center">
          <Crown className="w-4 h-4 mr-2" />
          Napoleon Properties
        </h3>
        <div className="text-xs text-muted-foreground">
          Click pins to view details
        </div>
      </div>

      {/* Region indicators */}
      <div className="absolute top-4 right-4 space-y-1">
        {["West", "South", "Northeast"].map((region) => (
          <div
            key={region}
            className="text-xs text-napoleon-400 bg-casino-900/80 px-2 py-1 rounded"
          >
            {region}
          </div>
        ))}
      </div>

      {/* Selected Destination Info Panel */}
      {selectedDest && (
        <div className="absolute bottom-4 left-4 right-4 bg-casino-900/95 backdrop-blur-sm border border-napoleon-400/30 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Main Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Crown className="h-6 w-6 text-napoleon-400" />
                <div>
                  <h3 className="text-lg font-luxury font-bold text-foreground">
                    Napoleon {selectedDest.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {selectedDest.state}
                    <span>•</span>
                    <Star className="h-3 w-3 fill-current text-napoleon-400" />
                    {selectedDest.rating}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {selectedDest.description.substring(0, 150)}...
              </p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4 text-napoleon-400" />
                  <span className="text-foreground font-medium">
                    {selectedDest.rooms}
                  </span>
                  <span className="text-muted-foreground">rooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="h-4 w-4 text-napoleon-400" />
                  <span className="text-foreground font-medium">
                    {selectedDest.restaurants}
                  </span>
                  <span className="text-muted-foreground">restaurants</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                className="w-full luxury-button text-sm"
                onClick={() => {
                  window.location.href = `/hotels?location=${selectedDest.id}`;
                }}
              >
                Book Stay
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                  onClick={() =>
                    window.open(`tel:${selectedDest.phone}`, "_self")
                  }
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                  onClick={() =>
                    window.open(`https://${selectedDest.website}`, "_blank")
                  }
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-napoleon-400/30 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-napoleon-400/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-napoleon-400/30 rounded-full animate-pulse delay-500" />
      </div>
    </div>
  );
}
