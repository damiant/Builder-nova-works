import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

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
  const [InteractiveMap, setInteractiveMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import the map component to avoid SSR issues
        const { default: MapComponent } = await import("./InteractiveMap");
        setInteractiveMap(() => MapComponent);
      } catch (err) {
        console.error("Failed to load map:", err);
        setError("Failed to load interactive map");
      } finally {
        setIsLoading(false);
      }
    };

    // Only load the map component if we're in the browser
    if (typeof window !== "undefined") {
      loadMap();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-napoleon-400/10 to-casino-800/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-napoleon-400 border-t-transparent mx-auto mb-4"></div>
          <h3 className="text-xl font-luxury font-bold text-foreground mb-2">
            Loading Interactive Map
          </h3>
          <p className="text-muted-foreground">
            Preparing your personalized casino location map...
          </p>
        </div>
      </div>
    );
  }

  if (error || !InteractiveMap) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-napoleon-400/10 to-casino-800/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-napoleon-400 mx-auto mb-4" />
          <h3 className="text-xl font-luxury font-bold text-foreground mb-2">
            Interactive Map
          </h3>
          <p className="text-muted-foreground mb-4">
            Explore all our locations across America
          </p>

          {/* Static destination list as fallback */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className={`p-3 bg-napoleon-400/10 rounded-lg border border-napoleon-400/20 cursor-pointer hover:bg-napoleon-400/20 transition-colors ${
                  selectedDestination === dest.id ? "bg-napoleon-400/30" : ""
                }`}
                onClick={() => onDestinationSelect?.(dest.id)}
              >
                <div className="text-sm font-medium text-foreground">
                  {dest.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {dest.state}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <InteractiveMap
      destinations={destinations}
      selectedDestination={selectedDestination}
      onDestinationSelect={onDestinationSelect}
    />
  );
}
