import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Crown, Star, MapPin, Phone, Globe } from "lucide-react";

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Create custom Napoleon Casino icon
const createCustomIcon = (isHighlighted = false) => {
  const svgIcon = `
    <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16C0 24 16 42 16 42S32 24 32 16C32 7.163 24.837 0 16 0Z" fill="${isHighlighted ? "#facc15" : "#eab308"}"/>
      <circle cx="16" cy="16" r="8" fill="#0f172a"/>
      <path d="M16 10L18 14H22L19 17L20 21L16 18L12 21L13 17L10 14H14L16 10Z" fill="${isHighlighted ? "#facc15" : "#eab308"}"/>
    </svg>
  `;

  return new L.DivIcon({
    html: svgIcon,
    className: "custom-casino-marker",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
};

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

interface InteractiveMapProps {
  destinations: Destination[];
  selectedDestination?: string;
  onDestinationSelect?: (destinationId: string) => void;
}

export default function InteractiveMap({
  destinations,
  selectedDestination,
  onDestinationSelect,
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Add custom CSS for markers
    const style = document.createElement("style");
    style.textContent = `
      .custom-casino-marker {
        background: none !important;
        border: none !important;
      }
      .custom-casino-marker svg {
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        transition: all 0.3s ease;
      }
      .custom-casino-marker:hover svg {
        transform: scale(1.1);
        filter: drop-shadow(0 6px 12px rgba(234, 179, 8, 0.4));
      }
      .leaflet-popup-content-wrapper {
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(234, 179, 8, 0.3);
        border-radius: 12px;
        color: #f8fafc;
        padding: 0;
      }
      .leaflet-popup-content {
        margin: 16px;
        font-family: 'Inter', sans-serif;
      }
      .leaflet-popup-tip {
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(234, 179, 8, 0.3);
        border-top: none;
        border-right: none;
      }
      .leaflet-popup-close-button {
        color: #eab308 !important;
        font-size: 18px !important;
        padding: 8px !important;
      }
      .leaflet-popup-close-button:hover {
        color: #facc15 !important;
      }
      .leaflet-control-zoom {
        border: 1px solid rgba(234, 179, 8, 0.3) !important;
        border-radius: 8px !important;
        overflow: hidden;
      }
      .leaflet-control-zoom a {
        background: rgba(15, 23, 42, 0.9) !important;
        color: #eab308 !important;
        border: none !important;
      }
      .leaflet-control-zoom a:hover {
        background: rgba(234, 179, 8, 0.2) !important;
        color: #facc15 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Calculate center of all destinations
  const center = destinations.reduce(
    (acc, dest) => {
      acc.lat += dest.coordinates.lat;
      acc.lng += dest.coordinates.lng;
      return acc;
    },
    { lat: 0, lng: 0 },
  );
  center.lat /= destinations.length;
  center.lng /= destinations.length;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border border-napoleon-400/30">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            position={[
              destination.coordinates.lat,
              destination.coordinates.lng,
            ]}
            icon={createCustomIcon(selectedDestination === destination.id)}
            eventHandlers={{
              click: () => {
                onDestinationSelect?.(destination.id);
              },
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <div className="flex items-center gap-2 mb-3">
                  <Crown className="h-5 w-5 text-napoleon-400" />
                  <h3 className="font-bold text-lg text-foreground">
                    Napoleon {destination.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-napoleon-400" />
                  <span className="text-sm text-muted-foreground">
                    {destination.name}, {destination.state}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 text-napoleon-400 fill-current" />
                  <span className="text-sm font-medium text-foreground">
                    {destination.rating} rating
                  </span>
                  <span className="text-sm text-muted-foreground">
                    • {destination.rooms} rooms
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {destination.description.substring(0, 120)}...
                </p>

                <div className="flex gap-2">
                  <button
                    className="flex-1 bg-gradient-to-r from-napoleon-500 to-napoleon-600 hover:from-napoleon-600 hover:to-napoleon-700 text-casino-900 font-semibold px-3 py-2 rounded-lg transition-all duration-300 text-sm"
                    onClick={() => {
                      // Navigate to hotel booking for this destination
                      window.location.href = `/hotels?location=${destination.id}`;
                    }}
                  >
                    Book Stay
                  </button>
                  <button
                    className="px-3 py-2 bg-napoleon-400/20 border border-napoleon-400/30 rounded-lg hover:bg-napoleon-400/30 transition-colors text-napoleon-300 text-sm"
                    onClick={() => {
                      window.open(`tel:${destination.phone}`, "_self");
                    }}
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                  <button
                    className="px-3 py-2 bg-napoleon-400/20 border border-napoleon-400/30 rounded-lg hover:bg-napoleon-400/30 transition-colors text-napoleon-300 text-sm"
                    onClick={() => {
                      window.open(`https://${destination.website}`, "_blank");
                    }}
                  >
                    <Globe className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
