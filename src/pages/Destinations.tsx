import { useState } from "react";
import { motion } from "framer-motion";
import InteractiveMap from "@/components/InteractiveMap";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import {
  MapPin,
  Star,
  Bed,
  ChefHat,
  Gamepad2,
  Car,
  Plane,
  Search,
  Filter,
  ArrowRight,
  Phone,
  Globe,
  Users,
  Calendar,
  Trophy,
  Sparkles,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Destination {
  id: string;
  name: string;
  state: string;
  region: string;
  rating: number;
  rooms: number;
  restaurants: number;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
  nearbyAttractions: string[];
  distance?: string;
  phone: string;
  website: string;
  coordinates: { lat: number; lng: number };
}

const destinations: Destination[] = [
  {
    id: "las-vegas-nv",
    name: "Las Vegas",
    state: "Nevada",
    region: "West",
    rating: 4.9,
    rooms: 450,
    restaurants: 8,
    image:
      "https://api.webnative.dev/images?query=Las Vegas strip casino luxury",
    description:
      "The crown jewel of Napoleon Casino Group, featuring world-class gaming, luxury suites, and award-winning dining on the famous Las Vegas Strip.",
    highlights: [
      "Vegas Strip Location",
      "24/7 Gaming",
      "Celebrity Chef Restaurants",
      "Luxury Spa",
    ],
    amenities: [
      "Pool Complex",
      "Spa & Wellness",
      "Convention Center",
      "High-Limit Gaming",
    ],
    nearbyAttractions: [
      "Bellagio Fountains",
      "High Roller",
      "Red Rock Canyon",
      "Hoover Dam",
    ],
    phone: "(702) 555-0123",
    website: "napoleon-lasvegas.com",
    coordinates: { lat: 36.1699, lng: -115.1398 },
  },
  {
    id: "atlantic-city-nj",
    name: "Atlantic City",
    state: "New Jersey",
    region: "Northeast",
    rating: 4.8,
    rooms: 320,
    restaurants: 6,
    image:
      "https://api.webnative.dev/images?query=Atlantic City boardwalk casino ocean",
    description:
      "Oceanfront luxury casino resort with pristine beaches, boardwalk entertainment, and East Coast's finest gaming experience.",
    highlights: [
      "Oceanfront Views",
      "Boardwalk Access",
      "Beach Club",
      "Golf Course",
    ],
    amenities: ["Beach Access", "Marina", "Golf Course", "Shopping Mall"],
    nearbyAttractions: [
      "Steel Pier",
      "Absecon Lighthouse",
      "Cape May",
      "Atlantic City Boardwalk",
    ],
    phone: "(609) 555-0456",
    website: "napoleon-atlanticcity.com",
    coordinates: { lat: 39.3643, lng: -74.4229 },
  },
  {
    id: "new-orleans-la",
    name: "New Orleans",
    state: "Louisiana",
    region: "South",
    rating: 4.7,
    rooms: 280,
    restaurants: 5,
    image:
      "https://api.webnative.dev/images?query=New Orleans French Quarter casino jazz",
    description:
      "Immerse yourself in the vibrant culture of the Big Easy with authentic Creole cuisine, jazz music, and Southern hospitality.",
    highlights: [
      "French Quarter Views",
      "Jazz Lounge",
      "Creole Cuisine",
      "Historic District",
    ],
    amenities: ["Jazz Club", "Courtyard Pool", "Rooftop Bar", "Valet Parking"],
    nearbyAttractions: [
      "French Quarter",
      "Garden District",
      "Bourbon Street",
      "Mississippi River",
    ],
    phone: "(504) 555-0789",
    website: "napoleon-neworleans.com",
    coordinates: { lat: 29.9511, lng: -90.0715 },
  },
  {
    id: "biloxi-ms",
    name: "Biloxi",
    state: "Mississippi",
    region: "South",
    rating: 4.6,
    rooms: 200,
    restaurants: 4,
    image:
      "https://api.webnative.dev/images?query=Biloxi beach casino gulf coast",
    description:
      "Gulf Coast gaming paradise with beautiful beaches, fresh seafood, and warm Southern charm.",
    highlights: [
      "Gulf Coast Beaches",
      "Seafood Buffet",
      "Fishing Charters",
      "Casino Boat",
    ],
    amenities: ["Beach Club", "Fishing Pier", "Seafood Market", "Water Sports"],
    nearbyAttractions: [
      "Biloxi Beach",
      "Gulf Islands",
      "Biloxi Lighthouse",
      "Shrimping Industry Tour",
    ],
    phone: "(228) 555-0321",
    website: "napoleon-biloxi.com",
    coordinates: { lat: 30.396, lng: -88.8853 },
  },
  {
    id: "reno-nv",
    name: "Reno",
    state: "Nevada",
    region: "West",
    rating: 4.5,
    rooms: 180,
    restaurants: 3,
    image:
      "https://api.webnative.dev/images?query=Reno Nevada casino mountains lake tahoe",
    description:
      "The biggest little city in the world offers mountain views, outdoor adventures, and authentic Nevada gaming.",
    highlights: [
      "Mountain Views",
      "Ski Resort Access",
      "Tahoe Day Trips",
      "Adventure Sports",
    ],
    amenities: [
      "Ski Shuttle",
      "Adventure Concierge",
      "Mountain Bike Rental",
      "Outdoor Pool",
    ],
    nearbyAttractions: [
      "Lake Tahoe",
      "Mount Rose",
      "Virginia City",
      "Pyramid Lake",
    ],
    phone: "(775) 555-0654",
    website: "napoleon-reno.com",
    coordinates: { lat: 39.5296, lng: -119.8138 },
  },
  {
    id: "tunica-ms",
    name: "Tunica",
    state: "Mississippi",
    region: "South",
    rating: 4.4,
    rooms: 150,
    restaurants: 3,
    image:
      "https://api.webnative.dev/images?query=Tunica Mississippi casino river delta",
    description:
      "Delta region gaming destination with Southern comfort, blues music, and Mississippi River charm.",
    highlights: [
      "Blues Heritage",
      "Delta Cuisine",
      "River Views",
      "Golf Resort",
    ],
    amenities: [
      "Championship Golf",
      "Blues Club",
      "River Tours",
      "Delta Museum",
    ],
    nearbyAttractions: [
      "Mississippi River",
      "Blues Trail",
      "Memphis",
      "Graceland",
    ],
    phone: "(662) 555-0987",
    website: "napoleon-tunica.com",
    coordinates: { lat: 34.6859, lng: -90.3826 },
  },
];

const regions = ["All", "West", "South", "Northeast", "Midwest"];

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filteredDestinations = destinations
    .filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion =
        selectedRegion === "All" || destination.region === selectedRegion;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "rooms":
          return b.rooms - a.rooms;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen casino-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-casino-pattern"
            style={{ backgroundSize: "60px 60px" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-12 w-12 text-napoleon-400 mr-4 animate-float" />
              <div className="h-px bg-gradient-to-r from-transparent via-napoleon-400 to-transparent w-32" />
            </div>

            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              <span className="luxury-text">Discover</span>
              <br />
              <span className="text-foreground">Our Destinations</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From the bright lights of Las Vegas to the Gulf Coast charm of
              Biloxi, explore our premier properties across 30 states in
              America.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="casino-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-napoleon-400" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 elegant-input"
                  />
                </div>

                {/* Region Filter */}
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="elegant-input"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region} Region
                    </option>
                  ))}
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="elegant-input"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                  <option value="rooms">Sort by Size</option>
                </select>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="casino-card h-full hover:border-napoleon-400/40 transition-all duration-300 group cursor-pointer">
                  {/* Destination Image */}
                  <div className="aspect-video relative overflow-hidden rounded-t-xl">
                    <img
                      src={destination.image}
                      alt={`${destination.name}, ${destination.state}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.classList.add(
                          "bg-gradient-to-br",
                          "from-napoleon-400/20",
                          "to-casino-800",
                        );
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-casino-900/80 via-casino-900/20 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <Badge className="bg-casino-900/80 backdrop-blur-sm text-napoleon-300 border-napoleon-400/30">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {destination.rating}
                      </Badge>
                      <Badge className="bg-casino-900/80 backdrop-blur-sm text-foreground border-napoleon-400/30">
                        {destination.region}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-luxury font-bold text-white mb-1 drop-shadow-lg">
                        {destination.name}
                      </h3>
                      <div className="flex items-center text-sm text-napoleon-300">
                        <MapPin className="h-3 w-3 mr-1" />
                        {destination.state}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {destination.description}
                    </p>

                    {/* Property Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 py-3 bg-napoleon-400/5 rounded-lg px-3">
                      <div className="text-center">
                        <div className="flex items-center justify-center text-napoleon-400 mb-1">
                          <Bed className="h-4 w-4 mr-1" />
                          <span className="text-lg font-semibold text-foreground">
                            {destination.rooms}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Rooms
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center text-napoleon-400 mb-1">
                          <ChefHat className="h-4 w-4 mr-1" />
                          <span className="text-lg font-semibold text-foreground">
                            {destination.restaurants}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Restaurants
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        Highlights
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight) => (
                          <Badge
                            key={highlight}
                            variant="secondary"
                            className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20 text-xs"
                          >
                            {highlight}
                          </Badge>
                        ))}
                        {destination.highlights.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20 text-xs"
                          >
                            +{destination.highlights.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Amenities Icons */}
                    <div className="flex items-center justify-between mb-4 py-2 border-t border-napoleon-400/20">
                      <div className="flex space-x-3">
                        <Gamepad2
                          className="h-4 w-4 text-napoleon-400"
                          title="Gaming"
                        />
                        <ChefHat
                          className="h-4 w-4 text-napoleon-400"
                          title="Dining"
                        />
                        <Car
                          className="h-4 w-4 text-napoleon-400"
                          title="Parking"
                        />
                        <Sparkles
                          className="h-4 w-4 text-napoleon-400"
                          title="Spa"
                        />
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Camera className="h-3 w-3 mr-1" />
                        Virtual Tour
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        to={`/hotels?location=${destination.id}`}
                        className="flex-1"
                      >
                        <Button className="w-full luxury-button text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Stay
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                      >
                        <Globe className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <MapPin className="h-16 w-16 text-napoleon-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground mb-2">
                No destinations found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find the perfect
                destination.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-casino-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-foreground mb-6">
              <span className="luxury-text">Coast to Coast</span> Luxury
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Napoleon Casino Group spans across America, bringing world-class
              gaming and hospitality to every corner of the nation.
            </p>
          </motion.div>

          <Card className="casino-card">
            <CardContent className="p-8">
              <div className="aspect-video bg-gradient-to-br from-napoleon-400/10 to-casino-800/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-napoleon-400 mx-auto mb-4" />
                  <h3 className="text-xl font-luxury font-bold text-foreground mb-2">
                    Interactive Map Coming Soon
                  </h3>
                  <p className="text-muted-foreground">
                    Explore all our locations with our interactive property map
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-luxury font-bold text-foreground mb-4">
              Ready to <span className="luxury-text">Explore</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join Napoleon Elite today and unlock exclusive benefits at all our
              destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rewards">
                <Button className="luxury-button text-lg px-8 py-3">
                  Join Napoleon Elite
                  <Trophy className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/hotels">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                >
                  Book Your Stay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
