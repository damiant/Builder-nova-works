import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import {
  Calendar,
  MapPin,
  Users,
  Bed,
  ChefHat,
  Clock,
  Phone,
  Mail,
  Download,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  Car,
  Utensils,
  CreditCard,
  FileText,
  QrCode,
} from "lucide-react";

interface Reservation {
  id: string;
  type: "hotel" | "restaurant";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  property: string;
  location: string;
  checkIn?: Date;
  checkOut?: Date;
  reservationDate?: Date;
  reservationTime?: string;
  guests: number;
  roomType?: string;
  tableType?: string;
  totalAmount: number;
  confirmationNumber: string;
  specialRequests?: string;
  createdAt: Date;
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    type: "hotel",
    status: "confirmed",
    property: "Napoleon Las Vegas",
    location: "Las Vegas, Nevada",
    checkIn: new Date("2024-03-15"),
    checkOut: new Date("2024-03-18"),
    guests: 2,
    roomType: "Emperor Suite",
    totalAmount: 2697,
    confirmationNumber: "NAP-LV-001234",
    specialRequests: "Late checkout requested",
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "2",
    type: "restaurant",
    status: "confirmed",
    property: "Crown Steakhouse",
    location: "Atlantic City, New Jersey",
    reservationDate: new Date("2024-02-28"),
    reservationTime: "7:30 PM",
    guests: 4,
    tableType: "Private Dining Room",
    totalAmount: 320,
    confirmationNumber: "NAP-AC-005678",
    specialRequests: "Anniversary celebration",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "3",
    type: "hotel",
    status: "pending",
    property: "Napoleon New Orleans",
    location: "New Orleans, Louisiana",
    checkIn: new Date("2024-04-10"),
    checkOut: new Date("2024-04-13"),
    guests: 3,
    roomType: "Royal King Room",
    totalAmount: 1347,
    confirmationNumber: "NAP-NO-009876",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "4",
    type: "hotel",
    status: "completed",
    property: "Napoleon Biloxi",
    location: "Biloxi, Mississippi",
    checkIn: new Date("2024-01-20"),
    checkOut: new Date("2024-01-23"),
    guests: 2,
    roomType: "Napoleon Standard",
    totalAmount: 897,
    confirmationNumber: "NAP-BI-543210",
    createdAt: new Date("2024-01-01"),
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-600/20 text-green-400 border-green-600/30";
    case "pending":
      return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30";
    case "cancelled":
      return "bg-red-600/20 text-red-400 border-red-600/30";
    case "completed":
      return "bg-blue-600/20 text-blue-400 border-blue-600/30";
    default:
      return "bg-gray-600/20 text-gray-400 border-gray-600/30";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4" />;
    case "pending":
      return <Clock className="h-4 w-4" />;
    case "cancelled":
      return <X className="h-4 w-4" />;
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export default function MyReservations() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredReservations = mockReservations
    .filter((reservation) => {
      if (activeTab === "all") return true;
      if (activeTab === "hotel") return reservation.type === "hotel";
      if (activeTab === "restaurant") return reservation.type === "restaurant";
      if (activeTab === "upcoming") {
        const targetDate = reservation.checkIn || reservation.reservationDate;
        return (
          targetDate &&
          targetDate >= new Date() &&
          reservation.status !== "cancelled"
        );
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = a.checkIn || a.reservationDate || a.createdAt;
      const dateB = b.checkIn || b.reservationDate || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });

  const upcomingCount = mockReservations.filter((r) => {
    const targetDate = r.checkIn || r.reservationDate;
    return targetDate && targetDate >= new Date() && r.status !== "cancelled";
  }).length;

  const hotelCount = mockReservations.filter((r) => r.type === "hotel").length;
  const restaurantCount = mockReservations.filter(
    (r) => r.type === "restaurant",
  ).length;

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
              <Calendar className="h-12 w-12 text-napoleon-400 mr-4 animate-float" />
              <div className="h-px bg-gradient-to-r from-transparent via-napoleon-400 to-transparent w-32" />
            </div>

            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              <span className="luxury-text">My</span>
              <br />
              <span className="text-foreground">Reservations</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Manage all your Napoleon Casino Group reservations in one place.
              View, modify, or cancel your bookings with ease.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            {/* Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="casino-card">
                <CardContent className="p-6">
                  <TabsList className="grid w-full grid-cols-4 bg-casino-800/50">
                    <TabsTrigger
                      value="all"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      All ({mockReservations.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="upcoming"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Upcoming ({upcomingCount})
                    </TabsTrigger>
                    <TabsTrigger
                      value="hotel"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Hotels ({hotelCount})
                    </TabsTrigger>
                    <TabsTrigger
                      value="restaurant"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Restaurants ({restaurantCount})
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reservations Content */}
            <TabsContent value={activeTab} className="space-y-6">
              {filteredReservations.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Calendar className="h-16 w-16 text-napoleon-400/50 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">
                    No reservations found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {activeTab === "upcoming"
                      ? "You don't have any upcoming reservations."
                      : "Start planning your next Napoleon experience."}
                  </p>
                  <Button className="luxury-button">Make a Reservation</Button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {filteredReservations.map((reservation, index) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="casino-card hover:border-napoleon-400/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            {/* Reservation Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="flex items-center">
                                      {reservation.type === "hotel" ? (
                                        <Bed className="h-5 w-5 text-napoleon-400 mr-2" />
                                      ) : (
                                        <ChefHat className="h-5 w-5 text-napoleon-400 mr-2" />
                                      )}
                                      <h3 className="text-xl font-luxury font-bold text-foreground">
                                        {reservation.property}
                                      </h3>
                                    </div>
                                    <Badge
                                      className={getStatusColor(
                                        reservation.status,
                                      )}
                                    >
                                      {getStatusIcon(reservation.status)}
                                      <span className="ml-1 capitalize">
                                        {reservation.status}
                                      </span>
                                    </Badge>
                                  </div>

                                  <div className="flex items-center text-muted-foreground mb-2">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {reservation.location}
                                  </div>

                                  <div className="text-sm text-napoleon-300 mb-3">
                                    Confirmation:{" "}
                                    {reservation.confirmationNumber}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-2xl font-bold text-napoleon-300">
                                    ${reservation.totalAmount}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Total
                                  </div>
                                </div>
                              </div>

                              {/* Reservation Details */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                {reservation.type === "hotel" ? (
                                  <>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Check-in
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.checkIn?.toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Check-out
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.checkOut?.toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Users className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Guests
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.guests}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Bed className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Room
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.roomType}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Date
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.reservationDate?.toLocaleDateString()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Time
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.reservationTime}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Users className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Party Size
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.guests}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <Utensils className="h-4 w-4 text-napoleon-400 mr-2" />
                                      <div>
                                        <div className="text-sm font-medium text-foreground">
                                          Table
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          {reservation.tableType}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>

                              {reservation.specialRequests && (
                                <div className="mb-4 p-3 bg-napoleon-400/10 rounded-lg border border-napoleon-400/20">
                                  <div className="text-sm font-medium text-foreground mb-1">
                                    Special Requests
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {reservation.specialRequests}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 lg:w-48">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Details
                              </Button>

                              {reservation.status === "confirmed" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modify
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                                  >
                                    <QrCode className="h-4 w-4 mr-2" />
                                    Check-in
                                  </Button>
                                </>
                              )}

                              <Button
                                variant="outline"
                                size="sm"
                                className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>

                              {reservation.status === "confirmed" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-600/30 text-red-400 hover:bg-red-600/10"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              )}

                              <div className="flex gap-1 mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                                >
                                  <Phone className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-r from-napoleon-900/20 via-napoleon-800/20 to-napoleon-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-luxury font-bold text-foreground mb-8">
              Need <span className="luxury-text">Assistance</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="casino-card">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-napoleon-400 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    24/7 Guest Services
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                  >
                    1-800-NAPOLEON
                  </Button>
                </CardContent>
              </Card>

              <Card className="casino-card">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-napoleon-400 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">
                    Email Support
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Get help via email
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="casino-card">
                <CardContent className="p-6 text-center">
                  <CreditCard className="h-8 w-8 text-napoleon-400 mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2">
                    Book Again
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Plan your next visit
                  </p>
                  <Button className="luxury-button" size="sm">
                    New Reservation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
