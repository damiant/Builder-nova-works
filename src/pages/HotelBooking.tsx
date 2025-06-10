import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import LocationSelector from "@/components/LocationSelector";
import DatePicker from "@/components/DatePicker";
import {
  Bed,
  Star,
  Users,
  MapPin,
  Search,
  Filter,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  ArrowRight,
  Calendar,
  CreditCard,
  Shield,
  Award,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Room {
  id: string;
  name: string;
  type: string;
  size: number;
  maxGuests: number;
  price: number;
  originalPrice?: number;
  image: string;
  amenities: string[];
  features: string[];
  description: string;
  availability: number;
}

const rooms: Room[] = [
  {
    id: "1",
    name: "Emperor Suite",
    type: "Suite",
    size: 1200,
    maxGuests: 4,
    price: 899,
    originalPrice: 1199,
    image: "/placeholder.svg",
    amenities: ["King Bed", "Sofa Bed", "Jacuzzi", "Balcony", "Mini Bar"],
    features: ["Casino View", "Marble Bathroom", "24/7 Butler Service"],
    description:
      "The pinnacle of luxury with panoramic casino views and premium amenities.",
    availability: 3,
  },
  {
    id: "2",
    name: "Royal King Room",
    type: "Deluxe",
    size: 650,
    maxGuests: 2,
    price: 449,
    originalPrice: 599,
    image: "/placeholder.svg",
    amenities: ["King Bed", "Work Desk", "Mini Fridge", "Coffee Maker"],
    features: ["City View", "Marble Bathroom", "Premium Linens"],
    description:
      "Elegant accommodations with modern amenities and stunning city views.",
    availability: 8,
  },
  {
    id: "3",
    name: "Napoleon Standard",
    type: "Standard",
    size: 450,
    maxGuests: 2,
    price: 299,
    image: "/placeholder.svg",
    amenities: ["Queen Bed", "Work Desk", "Coffee Maker"],
    features: ["Modern Design", "Free WiFi", "Flat Screen TV"],
    description: "Comfortable and stylish rooms perfect for a casino getaway.",
    availability: 12,
  },
  {
    id: "4",
    name: "Crown Double",
    type: "Standard",
    size: 500,
    maxGuests: 4,
    price: 399,
    image: "/placeholder.svg",
    amenities: ["Two Queen Beds", "Mini Fridge", "Work Area"],
    features: ["Family Friendly", "Extra Space", "Modern Amenities"],
    description:
      "Spacious rooms ideal for families or groups visiting our casino.",
    availability: 6,
  },
];

export default function HotelBooking() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Parse URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get("location");
    const checkIn = urlParams.get("checkIn");
    const checkOut = urlParams.get("checkOut");
    const guestsParam = urlParams.get("guests");

    if (location) setSelectedLocation(location);
    if (checkIn) setCheckInDate(new Date(checkIn));
    if (checkOut) setCheckOutDate(new Date(checkOut));
    if (guestsParam) setGuests(parseInt(guestsParam));

    if (location && checkIn && checkOut) {
      setSearchPerformed(true);
    }
  }, []);

  const handleSearch = () => {
    if (!selectedLocation || !checkInDate || !checkOutDate) {
      alert("Please fill in all search criteria");
      return;
    }
    setSearchPerformed(true);
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = (room: Room) => {
    const nights = calculateNights();
    const roomTotal = room.price * nights;
    const taxes = roomTotal * 0.15;
    const fees = 25;
    return {
      roomTotal,
      taxes,
      fees,
      total: roomTotal + taxes + fees,
    };
  };

  const filteredRooms = rooms.filter((room) => room.maxGuests >= guests);

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
              <Bed className="h-12 w-12 text-napoleon-400 mr-4 animate-float" />
              <div className="h-px bg-gradient-to-r from-transparent via-napoleon-400 to-transparent w-32" />
            </div>

            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              <span className="luxury-text">Luxury</span>
              <br />
              <span className="text-foreground">Accommodations</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience unparalleled comfort in our elegantly appointed rooms
              and suites, each designed to provide the ultimate in relaxation
              and luxury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="casino-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <LocationSelector
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                    placeholder="Choose your destination"
                  />
                </div>

                <DatePicker
                  date={checkInDate}
                  onDateChange={setCheckInDate}
                  placeholder="Check-in date"
                  disabled={(date) => date < new Date()}
                />

                <DatePicker
                  date={checkOutDate}
                  onDateChange={setCheckOutDate}
                  placeholder="Check-out date"
                  disabled={(date) =>
                    date < new Date() || (checkInDate && date <= checkInDate)
                  }
                />

                <div className="flex items-center">
                  <div className="flex items-center space-x-2 w-full">
                    <Users className="h-4 w-4 text-napoleon-400" />
                    <span className="text-sm text-muted-foreground">
                      Guests:
                    </span>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="flex-1 bg-casino-800/50 border border-napoleon-400/30 rounded px-3 py-2 text-foreground focus:border-napoleon-400 focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center">
                <Button onClick={handleSearch} className="luxury-button px-8">
                  <Search className="mr-2 h-4 w-4" />
                  Search Rooms
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {searchPerformed && (
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-luxury font-bold text-foreground mb-2">
                Available Rooms
              </h2>
              <p className="text-muted-foreground">
                {calculateNights()} nights • {guests} guests •{" "}
                {filteredRooms.length} rooms available
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Rooms List */}
              <div className="lg:col-span-2 space-y-6">
                {filteredRooms.map((room, index) => {
                  const pricing = calculateTotal(room);
                  const isExpanded = showDetails === room.id;

                  return (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card
                        className={`casino-card hover:border-napoleon-400/40 transition-all duration-300 ${selectedRoom?.id === room.id ? "border-napoleon-400/60" : ""}`}
                      >
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Room Image */}
                            <div className="aspect-video md:aspect-square bg-gradient-to-br from-napoleon-400/20 to-casino-800 rounded-lg relative overflow-hidden">
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30">
                                  {room.type}
                                </Badge>
                              </div>
                              {room.originalPrice && (
                                <div className="absolute top-2 right-2">
                                  <Badge className="bg-green-600/80 text-white">
                                    Save ${room.originalPrice - room.price}
                                  </Badge>
                                </div>
                              )}
                              <div className="absolute bottom-2 left-2 right-2">
                                <div className="text-sm text-napoleon-300">
                                  {room.size} sq ft • Up to {room.maxGuests}{" "}
                                  guests
                                </div>
                              </div>
                            </div>

                            {/* Room Details */}
                            <div className="md:col-span-2">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h3 className="text-xl font-luxury font-bold text-foreground mb-1">
                                    {room.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mb-2">
                                    {room.description}
                                  </p>
                                  <div className="flex items-center text-sm text-green-400 mb-2">
                                    <Shield className="h-4 w-4 mr-1" />
                                    Only {room.availability} rooms left
                                  </div>
                                </div>
                                <div className="text-right">
                                  {room.originalPrice && (
                                    <div className="text-sm text-muted-foreground line-through">
                                      ${room.originalPrice}/night
                                    </div>
                                  )}
                                  <div className="text-2xl font-bold text-napoleon-300">
                                    ${room.price}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    per night
                                  </div>
                                </div>
                              </div>

                              {/* Basic Amenities */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {room.amenities.slice(0, 4).map((amenity) => (
                                  <Badge
                                    key={amenity}
                                    variant="secondary"
                                    className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20 text-xs"
                                  >
                                    {amenity}
                                  </Badge>
                                ))}
                                {room.amenities.length > 4 && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20 text-xs"
                                  >
                                    +{room.amenities.length - 4} more
                                  </Badge>
                                )}
                              </div>

                              {/* Expanded Details */}
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  transition={{ duration: 0.3 }}
                                  className="space-y-3 mb-4 pt-4 border-t border-napoleon-400/20"
                                >
                                  <div>
                                    <h4 className="font-medium text-foreground mb-2">
                                      All Amenities
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {room.amenities.map((amenity) => (
                                        <Badge
                                          key={amenity}
                                          variant="secondary"
                                          className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20 text-xs"
                                        >
                                          {amenity}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-foreground mb-2">
                                      Special Features
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {room.features.map((feature) => (
                                        <Badge
                                          key={feature}
                                          className="bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30 text-xs"
                                        >
                                          <Award className="h-3 w-3 mr-1" />
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Action Buttons */}
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setShowDetails(isExpanded ? null : room.id)
                                  }
                                  className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  {isExpanded ? "Less" : "More"} Details
                                  {isExpanded ? (
                                    <ChevronUp className="h-4 w-4 ml-1" />
                                  ) : (
                                    <ChevronDown className="h-4 w-4 ml-1" />
                                  )}
                                </Button>
                                <Button
                                  onClick={() => setSelectedRoom(room)}
                                  className={
                                    selectedRoom?.id === room.id
                                      ? "bg-napoleon-600 hover:bg-napoleon-700"
                                      : "luxury-button"
                                  }
                                  size="sm"
                                >
                                  {selectedRoom?.id === room.id
                                    ? "Selected"
                                    : "Select Room"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {filteredRooms.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <Bed className="h-16 w-16 text-napoleon-400/50 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-muted-foreground mb-2">
                      No rooms available
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your dates or guest count to find available
                      rooms.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Booking Summary */}
              {selectedRoom && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-24">
                    <Card className="casino-card">
                      <CardHeader>
                        <h3 className="text-xl font-luxury font-bold text-foreground">
                          Booking Summary
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">
                            {selectedRoom.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {selectedRoom.description}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            Las Vegas, Nevada
                          </div>
                        </div>

                        <Separator className="bg-napoleon-400/20" />

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Check-in
                            </span>
                            <span className="text-foreground">
                              {checkInDate?.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Check-out
                            </span>
                            <span className="text-foreground">
                              {checkOutDate?.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Nights
                            </span>
                            <span className="text-foreground">
                              {calculateNights()}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Guests
                            </span>
                            <span className="text-foreground">{guests}</span>
                          </div>
                        </div>

                        <Separator className="bg-napoleon-400/20" />

                        {(() => {
                          const pricing = calculateTotal(selectedRoom);
                          return (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  ${selectedRoom.price} × {calculateNights()}{" "}
                                  nights
                                </span>
                                <span className="text-foreground">
                                  ${pricing.roomTotal}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                  Taxes & fees
                                </span>
                                <span className="text-foreground">
                                  ${pricing.taxes + pricing.fees}
                                </span>
                              </div>
                              <Separator className="bg-napoleon-400/20" />
                              <div className="flex justify-between font-semibold">
                                <span className="text-foreground">Total</span>
                                <span className="text-napoleon-300 text-lg">
                                  ${pricing.total}
                                </span>
                              </div>
                            </div>
                          );
                        })()}

                        <Button className="w-full luxury-button">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Book Now
                        </Button>

                        <div className="text-center">
                          <div className="flex items-center justify-center text-sm text-muted-foreground">
                            <Shield className="h-4 w-4 mr-1" />
                            Free cancellation until 24 hours before check-in
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
