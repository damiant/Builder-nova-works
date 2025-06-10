import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import LocationSelector from "@/components/LocationSelector";
import DatePicker from "@/components/DatePicker";
import {
  Search,
  Star,
  ChefHat,
  Bed,
  Gamepad2,
  Car,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  Trophy,
  Crown,
  Sparkles,
  Clock,
  Wifi,
  Coffee,
  Dumbbell,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Gamepad2,
    title: "World-Class Gaming",
    description:
      "Experience the thrill with state-of-the-art slot machines, table games, and poker rooms.",
  },
  {
    icon: ChefHat,
    title: "Fine Dining",
    description:
      "Savor exquisite cuisine from award-winning chefs at our signature restaurants.",
  },
  {
    icon: Bed,
    title: "Luxury Accommodations",
    description:
      "Rest in elegantly appointed suites with premium amenities and stunning views.",
  },
  {
    icon: Trophy,
    title: "Rewards Program",
    description:
      "Earn points and unlock exclusive benefits with our Napoleon Elite membership.",
  },
];

const popularDestinations = [
  {
    name: "Las Vegas",
    state: "Nevada",
    image: "/placeholder.svg",
    rating: 4.9,
    rooms: "450+ Rooms",
    features: ["Pool", "Spa", "Gaming", "Dining"],
  },
  {
    name: "Atlantic City",
    state: "New Jersey",
    image: "/placeholder.svg",
    rating: 4.8,
    rooms: "320+ Rooms",
    features: ["Beach", "Casino", "Shows", "Golf"],
  },
  {
    name: "New Orleans",
    state: "Louisiana",
    image: "/placeholder.svg",
    rating: 4.7,
    rooms: "280+ Rooms",
    features: ["Music", "Culture", "Food", "Gaming"],
  },
];

const amenities = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Car, label: "Valet Parking" },
  { icon: Coffee, label: "Room Service" },
  { icon: Dumbbell, label: "Fitness Center" },
  { icon: Clock, label: "24/7 Concierge" },
  { icon: Sparkles, label: "Spa Services" },
];

export default function Index() {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState(2);

  const handleBookNow = () => {
    if (!selectedLocation) {
      alert("Please select a destination");
      return;
    }
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    // Navigate to booking page with parameters
    const params = new URLSearchParams({
      location: selectedLocation,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      guests: guests.toString(),
    });

    window.location.href = `/hotels?${params.toString()}`;
  };

  return (
    <div className="min-h-screen casino-bg">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0 bg-casino-pattern"
            style={{ backgroundSize: "60px 60px" }}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-casino-900/50 via-transparent to-casino-900" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-12 w-12 text-napoleon-400 mr-4 animate-float" />
              <div className="h-px bg-gradient-to-r from-transparent via-napoleon-400 to-transparent w-32" />
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury font-bold mb-6">
              <span className="luxury-text">Experience</span>
              <br />
              <span className="text-foreground">Luxury Gaming</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Discover unparalleled elegance and excitement at Napoleon Casino
              Group. From world-class gaming to luxury accommodations across 30
              states.
            </p>
          </motion.div>

          {/* Booking Widget */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="casino-card luxury-shadow">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center mb-6">
                  <Search className="h-6 w-6 text-napoleon-400 mr-3" />
                  <h3 className="text-2xl font-luxury font-semibold text-foreground">
                    Book Your Stay
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-napoleon-400" />
                      <span className="text-sm text-muted-foreground">
                        Guests:
                      </span>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="bg-casino-800/50 border border-napoleon-400/30 rounded px-3 py-1 text-foreground focus:border-napoleon-400 focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={handleBookNow}
                    className="luxury-button px-8 py-3 text-lg"
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-luxury font-bold luxury-text mb-6">
              Why Choose Napoleon
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in a world where luxury meets excitement, and
              every detail is crafted for your ultimate experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="casino-card h-full hover:border-napoleon-400/40 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 relative">
                        <div className="inline-flex p-3 rounded-full bg-napoleon-400/20 group-hover:bg-napoleon-400/30 transition-colors duration-300">
                          <Icon className="h-8 w-8 text-napoleon-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-luxury font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-gradient-to-b from-transparent to-casino-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-foreground mb-6">
              Popular <span className="luxury-text">Destinations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our premier locations across the United States, each
              offering unique experiences and world-class amenities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="casino-card overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-napoleon-400/20 to-casino-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-casino-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {destination.rating}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {destination.state}
                        </div>
                      </div>
                      <h3 className="text-2xl font-luxury font-bold text-foreground mb-1">
                        {destination.name}
                      </h3>
                      <p className="text-napoleon-300 text-sm">
                        {destination.rooms}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2">
                      {destination.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/destinations">
              <Button className="luxury-button text-lg px-8 py-3">
                View All Destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-foreground mb-6">
              Premium <span className="luxury-text">Amenities</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every Napoleon property features world-class amenities designed to
              enhance your stay and create unforgettable memories.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div
                  key={amenity.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="casino-card p-6 hover:border-napoleon-400/40 transition-all duration-300">
                    <Icon className="h-8 w-8 text-napoleon-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-medium text-foreground">
                      {amenity.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-napoleon-900/20 via-napoleon-800/20 to-napoleon-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Crown className="h-16 w-16 text-napoleon-400 mx-auto mb-6 animate-float" />
            <h2 className="text-4xl md:text-5xl font-luxury font-bold text-foreground mb-6">
              Ready to Experience <span className="luxury-text">Napoleon</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join millions of guests who have discovered the perfect blend of
              luxury, excitement, and exceptional service at Napoleon Casino
              Group.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/rewards">
                <Button className="luxury-button text-lg px-8 py-3">
                  Join Napoleon Elite
                  <Trophy className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/destinations">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-3 border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                >
                  Explore Locations
                  <MapPin className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
