import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import {
  ChefHat,
  Star,
  Clock,
  Users,
  MapPin,
  Search,
  Filter,
  Utensils,
  Wine,
  Coffee,
  IceCream,
  ArrowRight,
  Phone,
  Calendar,
} from "lucide-react";

const cuisineTypes = [
  "All",
  "Fine Dining",
  "Steakhouse",
  "Italian",
  "Asian",
  "American",
  "Buffet",
  "Bar & Grill",
  "Desserts",
];

const restaurants = [
  {
    id: 1,
    name: "Emperor's Table",
    cuisine: "Fine Dining",
    location: "Las Vegas, NV",
    rating: 4.9,
    priceRange: "$$$$",
    image: "/placeholder.svg",
    description:
      "An elegant fine dining experience featuring contemporary French cuisine with a modern twist.",
    features: ["Wine Pairing", "Private Dining", "Chef's Table"],
    hours: "5:00 PM - 11:00 PM",
    dress: "Business Casual",
    reservations: true,
    phone: "(702) 555-0123",
  },
  {
    id: 2,
    name: "Crown Steakhouse",
    cuisine: "Steakhouse",
    location: "Atlantic City, NJ",
    rating: 4.8,
    priceRange: "$$$",
    image: "/placeholder.svg",
    description:
      "Premium aged steaks and fresh seafood in a sophisticated atmosphere.",
    features: ["Dry-Aged Beef", "Raw Bar", "Extensive Wine List"],
    hours: "4:00 PM - 12:00 AM",
    dress: "Smart Casual",
    reservations: true,
    phone: "(609) 555-0456",
  },
  {
    id: 3,
    name: "Bella Vista",
    cuisine: "Italian",
    location: "New Orleans, LA",
    rating: 4.7,
    priceRange: "$$$",
    image: "/placeholder.svg",
    description:
      "Authentic Italian flavors with handmade pasta and wood-fired pizzas.",
    features: ["Wood-Fired Oven", "Fresh Pasta", "Gelato Bar"],
    hours: "11:00 AM - 11:00 PM",
    dress: "Casual",
    reservations: true,
    phone: "(504) 555-0789",
  },
  {
    id: 4,
    name: "Dynasty",
    cuisine: "Asian",
    location: "Las Vegas, NV",
    rating: 4.6,
    priceRange: "$$",
    image: "/placeholder.svg",
    description:
      "Contemporary Asian fusion cuisine with sushi bar and teppanyaki grills.",
    features: ["Sushi Bar", "Teppanyaki", "Dim Sum"],
    hours: "12:00 PM - 2:00 AM",
    dress: "Casual",
    reservations: true,
    phone: "(702) 555-0321",
  },
  {
    id: 5,
    name: "Royal Buffet",
    cuisine: "Buffet",
    location: "Biloxi, MS",
    rating: 4.5,
    priceRange: "$$",
    image: "/placeholder.svg",
    description:
      "International buffet featuring over 200 items including seafood, steaks, and desserts.",
    features: ["Seafood Station", "Carving Station", "Dessert Bar"],
    hours: "6:00 AM - 11:00 PM",
    dress: "Casual",
    reservations: false,
    phone: "(228) 555-0654",
  },
  {
    id: 6,
    name: "Sunset Grill",
    cuisine: "American",
    location: "Phoenix, AZ",
    rating: 4.4,
    priceRange: "$$",
    image: "/placeholder.svg",
    description:
      "Classic American cuisine with a contemporary twist and outdoor patio dining.",
    features: ["Outdoor Seating", "Sports Bar", "Happy Hour"],
    hours: "11:00 AM - 1:00 AM",
    dress: "Casual",
    reservations: true,
    phone: "(602) 555-0987",
  },
];

export default function Restaurants() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  const locations = [
    "All",
    ...Array.from(new Set(restaurants.map((r) => r.location))),
  ];

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine =
      selectedCuisine === "All" || restaurant.cuisine === selectedCuisine;
    const matchesLocation =
      selectedLocation === "All" || restaurant.location === selectedLocation;

    return matchesSearch && matchesCuisine && matchesLocation;
  });

  const getCuisineIcon = (cuisine: string) => {
    switch (cuisine) {
      case "Fine Dining":
        return Utensils;
      case "Steakhouse":
        return ChefHat;
      case "Italian":
        return Utensils;
      case "Asian":
        return Utensils;
      case "American":
        return Utensils;
      case "Buffet":
        return Users;
      case "Bar & Grill":
        return Wine;
      case "Desserts":
        return IceCream;
      default:
        return Utensils;
    }
  };

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
              <ChefHat className="h-12 w-12 text-napoleon-400 mr-4 animate-float" />
              <div className="h-px bg-gradient-to-r from-transparent via-napoleon-400 to-transparent w-32" />
            </div>

            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              <span className="luxury-text">Culinary</span>
              <br />
              <span className="text-foreground">Excellence</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover exceptional dining experiences at Napoleon Casino Group.
              From award-winning fine dining to casual favorites, every meal is
              a celebration of flavor and craftsmanship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="casino-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-napoleon-400" />
                  <Input
                    placeholder="Search restaurants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 elegant-input"
                  />
                </div>

                {/* Cuisine Filter */}
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="elegant-input"
                >
                  {cuisineTypes.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>

                {/* Location Filter */}
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="elegant-input"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, index) => {
              const CuisineIcon = getCuisineIcon(restaurant.cuisine);
              return (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="casino-card h-full hover:border-napoleon-400/40 transition-all duration-300 group">
                    {/* Restaurant Image */}
                    <div className="aspect-video bg-gradient-to-br from-napoleon-400/20 to-casino-800 relative overflow-hidden rounded-t-xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-casino-900/80 to-transparent" />
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <Badge className="bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30">
                          <CuisineIcon className="h-3 w-3 mr-1" />
                          {restaurant.cuisine}
                        </Badge>
                        <Badge className="bg-casino-800/80 text-foreground border-napoleon-400/30">
                          {restaurant.priceRange}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-napoleon-400 fill-current mr-1" />
                            <span className="text-napoleon-300 font-medium">
                              {restaurant.rating}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {restaurant.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-luxury font-bold text-foreground mb-2">
                          {restaurant.name}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {restaurant.description}
                        </p>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 text-napoleon-400 mr-2" />
                          <span className="text-muted-foreground">
                            Hours: {restaurant.hours}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 text-napoleon-400 mr-2" />
                          <span className="text-muted-foreground">
                            Dress: {restaurant.dress}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant.features.map((feature) => (
                          <Badge
                            key={feature}
                            variant="secondary"
                            className="bg-napoleon-400/10 text-napoleon-300 border-napoleon-400/20 text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {restaurant.reservations && (
                          <Button size="sm" className="flex-1 luxury-button">
                            <Calendar className="h-4 w-4 mr-2" />
                            Reserve
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredRestaurants.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ChefHat className="h-16 w-16 text-napoleon-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-muted-foreground mb-2">
                No restaurants found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria to find the perfect dining
                experience.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-napoleon-900/20 via-napoleon-800/20 to-napoleon-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-luxury font-bold text-foreground mb-4">
              Can't Decide? <span className="luxury-text">Explore More</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover all our dining options and book your culinary adventure
              today.
            </p>
            <Button className="luxury-button text-lg px-8 py-3">
              View All Locations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
