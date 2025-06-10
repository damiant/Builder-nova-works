import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import {
  Trophy,
  Crown,
  Star,
  Gift,
  CreditCard,
  Zap,
  Calendar,
  MapPin,
  Users,
  Gamepad2,
  ChefHat,
  Bed,
  Car,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  Ticket,
  Percent,
  ArrowRight,
} from "lucide-react";

const tierBenefits = {
  bronze: {
    name: "Bronze Elite",
    color: "from-orange-600 to-orange-800",
    icon: Trophy,
    benefits: [
      "5% dining discount",
      "Priority check-in",
      "Free WiFi",
      "Birthday bonus",
    ],
  },
  silver: {
    name: "Silver Elite",
    color: "from-gray-400 to-gray-600",
    icon: Star,
    benefits: [
      "10% dining discount",
      "Room upgrades (based on availability)",
      "Late checkout",
      "Express valet",
      "Complimentary breakfast",
    ],
  },
  gold: {
    name: "Gold Elite",
    color: "from-napoleon-400 to-napoleon-600",
    icon: Crown,
    benefits: [
      "15% dining discount",
      "Guaranteed room upgrades",
      "VIP check-in",
      "Premium valet",
      "Spa discounts",
      "Event invitations",
    ],
  },
  platinum: {
    name: "Platinum Elite",
    color: "from-purple-400 to-purple-600",
    icon: Crown,
    benefits: [
      "20% dining discount",
      "Suite upgrades",
      "Personal concierge",
      "Free airport transfers",
      "Private gaming areas",
      "Exclusive events",
    ],
  },
};

const mockUser = {
  name: "John Smith",
  email: "john.smith@email.com",
  tier: "gold" as keyof typeof tierBenefits,
  points: 12750,
  pointsToNextTier: 2250,
  lifetimePoints: 45300,
  memberSince: "January 2020",
  visits: 28,
  favoriteProperty: "Napoleon Las Vegas",
};

const recentActivity = [
  {
    id: "1",
    type: "earned",
    points: 450,
    description: "Hotel stay at Napoleon Las Vegas",
    date: "2024-02-15",
    property: "Las Vegas, NV",
  },
  {
    id: "2",
    type: "redeemed",
    points: -200,
    description: "Dining credit at Crown Steakhouse",
    date: "2024-02-10",
    property: "Atlantic City, NJ",
  },
  {
    id: "3",
    type: "earned",
    points: 180,
    description: "Gaming activity",
    date: "2024-02-08",
    property: "Las Vegas, NV",
  },
  {
    id: "4",
    type: "bonus",
    points: 500,
    description: "Elite tier bonus",
    date: "2024-02-01",
    property: "Account Credit",
  },
];

const availableRewards = [
  {
    id: "1",
    title: "Free Night Stay",
    description: "One night accommodation at any Napoleon property",
    points: 2500,
    category: "hotel",
    tier: "bronze",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    title: "$50 Dining Credit",
    description: "Use at any Napoleon restaurant or bar",
    points: 1000,
    category: "dining",
    tier: "bronze",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Spa Package",
    description: "Relaxing spa treatment for two",
    points: 1800,
    category: "spa",
    tier: "silver",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    title: "VIP Gaming Experience",
    description: "Private gaming session with refreshments",
    points: 3000,
    category: "gaming",
    tier: "gold",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "Suite Upgrade",
    description: "Guaranteed suite upgrade on next stay",
    points: 1500,
    category: "hotel",
    tier: "silver",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Chef's Table Experience",
    description: "Exclusive dining experience with our executive chef",
    points: 4000,
    category: "dining",
    tier: "platinum",
    image: "/placeholder.svg",
  },
];

const offers = [
  {
    id: "1",
    title: "Double Points Weekend",
    description: "Earn 2x points on all activities this weekend",
    validUntil: "2024-03-01",
    type: "limited",
  },
  {
    id: "2",
    title: "Complimentary Breakfast",
    description: "Free breakfast with any weekend stay",
    validUntil: "2024-03-15",
    type: "tier",
  },
  {
    id: "3",
    title: "25% Off Spa Services",
    description: "Exclusive discount for Gold Elite members",
    validUntil: "2024-04-01",
    type: "tier",
  },
];

export default function MyRewards() {
  const [activeTab, setActiveTab] = useState("overview");
  const currentTier = tierBenefits[mockUser.tier];
  const nextTierKey = Object.keys(tierBenefits)[
    Object.keys(tierBenefits).indexOf(mockUser.tier) + 1
  ] as keyof typeof tierBenefits;
  const nextTier = nextTierKey ? tierBenefits[nextTierKey] : null;
  const progressToNextTier = nextTier
    ? ((15000 - mockUser.pointsToNextTier) / 15000) * 100
    : 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hotel":
        return Bed;
      case "dining":
        return ChefHat;
      case "spa":
        return Sparkles;
      case "gaming":
        return Gamepad2;
      default:
        return Gift;
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
              <Trophy className="h-12 w-12 text-napoleon-400 mr-4 animate-float" />
              <div className="h-px bg-gradient-to-r from-transparent via-napoleon-400 to-transparent w-32" />
            </div>

            <h1 className="text-4xl md:text-6xl font-luxury font-bold mb-6">
              <span className="luxury-text">Napoleon</span>
              <br />
              <span className="text-foreground">Elite Rewards</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the ultimate in luxury gaming rewards. Every stay,
              every meal, and every game brings you closer to exclusive benefits
              and unforgettable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Account Overview */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="casino-card mb-8">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Member Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-luxury font-bold text-foreground mb-2">
                          Welcome back, {mockUser.name}
                        </h2>
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <span>Member since {mockUser.memberSince}</span>
                          <span>•</span>
                          <span>{mockUser.visits} visits</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center">
                          {React.createElement(currentTier.icon, {
                            className: "h-6 w-6 text-napoleon-400 mr-2",
                          })}
                          <Badge
                            className={`bg-gradient-to-r ${currentTier.color} text-white border-none px-4 py-2`}
                          >
                            {currentTier.name}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Points Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-napoleon-400/10 rounded-lg border border-napoleon-400/20">
                        <div className="text-3xl font-bold text-napoleon-300 mb-1">
                          {mockUser.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Available Points
                        </div>
                      </div>
                      <div className="text-center p-4 bg-napoleon-400/10 rounded-lg border border-napoleon-400/20">
                        <div className="text-3xl font-bold text-napoleon-300 mb-1">
                          {mockUser.lifetimePoints.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Lifetime Points
                        </div>
                      </div>
                      <div className="text-center p-4 bg-napoleon-400/10 rounded-lg border border-napoleon-400/20">
                        <div className="text-3xl font-bold text-napoleon-300 mb-1">
                          {mockUser.visits}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Visits
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tier Progress */}
                  <div className="bg-gradient-to-br from-napoleon-400/5 to-casino-800/20 rounded-lg p-6 border border-napoleon-400/20">
                    <h3 className="font-luxury font-bold text-foreground mb-4">
                      Tier Progress
                    </h3>
                    {nextTier ? (
                      <>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              Current: {currentTier.name}
                            </span>
                            <span className="text-muted-foreground">
                              Next: {nextTier.name}
                            </span>
                          </div>
                          <Progress
                            value={progressToNextTier}
                            className="h-3"
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-napoleon-300 mb-1">
                            {mockUser.pointsToNextTier.toLocaleString()} points
                            to go
                          </div>
                          <div className="text-sm text-muted-foreground">
                            to reach {nextTier.name}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Crown className="h-12 w-12 text-napoleon-400 mx-auto mb-3" />
                        <div className="text-lg font-semibold text-napoleon-300 mb-1">
                          Highest Tier Achieved!
                        </div>
                        <div className="text-sm text-muted-foreground">
                          You're a {currentTier.name} member
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="casino-card">
                <CardContent className="p-6">
                  <TabsList className="grid w-full grid-cols-4 bg-casino-800/50">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Benefits
                    </TabsTrigger>
                    <TabsTrigger
                      value="rewards"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Redeem
                    </TabsTrigger>
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="offers"
                      className="data-[state=active]:bg-napoleon-400/20 data-[state=active]:text-napoleon-300"
                    >
                      Offers
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits Overview */}
            <TabsContent value="overview">
              <div className="space-y-8">
                {/* Current Tier Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="casino-card">
                    <CardHeader>
                      <h3 className="text-xl font-luxury font-bold text-foreground flex items-center">
                        {React.createElement(currentTier.icon, {
                          className: "h-6 w-6 text-napoleon-400 mr-3",
                        })}
                        Your {currentTier.name} Benefits
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentTier.benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="flex items-center p-3 bg-napoleon-400/10 rounded-lg border border-napoleon-400/20"
                          >
                            <Award className="h-5 w-5 text-napoleon-400 mr-3 flex-shrink-0" />
                            <span className="text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* All Tier Comparison */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-2xl font-luxury font-bold text-foreground mb-6">
                    All <span className="luxury-text">Elite Tiers</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Object.entries(tierBenefits).map(([key, tier]) => {
                      const TierIcon = tier.icon;
                      const isCurrentTier = key === mockUser.tier;

                      return (
                        <Card
                          key={key}
                          className={`casino-card ${isCurrentTier ? "border-napoleon-400/60" : ""}`}
                        >
                          <CardContent className="p-6">
                            <div className="text-center mb-4">
                              <div
                                className={`inline-flex p-3 rounded-full bg-gradient-to-r ${tier.color} mb-3`}
                              >
                                <TierIcon className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="font-luxury font-bold text-foreground">
                                {tier.name}
                              </h4>
                              {isCurrentTier && (
                                <Badge className="mt-2 bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30">
                                  Your Tier
                                </Badge>
                              )}
                            </div>
                            <div className="space-y-2">
                              {tier.benefits
                                .slice(0, 3)
                                .map((benefit, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center text-sm"
                                  >
                                    <Award className="h-3 w-3 text-napoleon-400 mr-2 flex-shrink-0" />
                                    <span className="text-muted-foreground">
                                      {benefit}
                                    </span>
                                  </div>
                                ))}
                              {tier.benefits.length > 3 && (
                                <div className="text-xs text-napoleon-300 text-center mt-2">
                                  +{tier.benefits.length - 3} more benefits
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Rewards Catalog */}
            <TabsContent value="rewards">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-luxury font-bold text-foreground mb-2">
                    Redeem <span className="luxury-text">Your Points</span>
                  </h3>
                  <p className="text-muted-foreground">
                    You have {mockUser.points.toLocaleString()} points available
                    to redeem
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableRewards.map((reward, index) => {
                    const CategoryIcon = getCategoryIcon(reward.category);
                    const canRedeem = mockUser.points >= reward.points;

                    return (
                      <motion.div
                        key={reward.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card
                          className={`casino-card h-full ${canRedeem ? "hover:border-napoleon-400/40" : "opacity-60"} transition-all duration-300`}
                        >
                          <div className="aspect-video bg-gradient-to-br from-napoleon-400/20 to-casino-800 relative overflow-hidden rounded-t-xl">
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30">
                                <CategoryIcon className="h-3 w-3 mr-1" />
                                {reward.category}
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-casino-800/80 text-napoleon-300 border-napoleon-400/30">
                                {reward.points.toLocaleString()} pts
                              </Badge>
                            </div>
                          </div>

                          <CardContent className="p-6 flex-1 flex flex-col">
                            <h4 className="font-luxury font-bold text-foreground mb-2">
                              {reward.title}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-4 flex-1">
                              {reward.description}
                            </p>

                            <Button
                              className={
                                canRedeem ? "luxury-button w-full" : "w-full"
                              }
                              disabled={!canRedeem}
                              variant={canRedeem ? "default" : "outline"}
                            >
                              {canRedeem ? (
                                <>
                                  <Gift className="h-4 w-4 mr-2" />
                                  Redeem Now
                                </>
                              ) : (
                                <>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Need{" "}
                                  {(
                                    reward.points - mockUser.points
                                  ).toLocaleString()}{" "}
                                  more pts
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </TabsContent>

            {/* Activity History */}
            <TabsContent value="activity">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-luxury font-bold text-foreground mb-2">
                    Recent <span className="luxury-text">Activity</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Track your points earnings and redemptions
                  </p>
                </div>

                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="casino-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`p-2 rounded-full ${
                                activity.type === "earned"
                                  ? "bg-green-600/20"
                                  : activity.type === "redeemed"
                                    ? "bg-red-600/20"
                                    : "bg-napoleon-400/20"
                              }`}
                            >
                              {activity.type === "earned" ? (
                                <TrendingUp className="h-5 w-5 text-green-400" />
                              ) : activity.type === "redeemed" ? (
                                <Gift className="h-5 w-5 text-red-400" />
                              ) : (
                                <Zap className="h-5 w-5 text-napoleon-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">
                                {activity.description}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {activity.property} •{" "}
                                {new Date(activity.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-right ${
                              activity.points > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            <div className="font-bold text-lg">
                              {activity.points > 0 ? "+" : ""}
                              {activity.points.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              points
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Special Offers */}
            <TabsContent value="offers">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-luxury font-bold text-foreground mb-2">
                    Exclusive <span className="luxury-text">Offers</span>
                  </h3>
                  <p className="text-muted-foreground">
                    Special promotions just for Napoleon Elite members
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offers.map((offer, index) => (
                    <motion.div
                      key={offer.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="casino-card hover:border-napoleon-400/40 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge
                              className={
                                offer.type === "limited"
                                  ? "bg-red-600/20 text-red-400 border-red-600/30"
                                  : "bg-napoleon-400/20 text-napoleon-300 border-napoleon-400/30"
                              }
                            >
                              {offer.type === "limited" ? (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  Limited Time
                                </>
                              ) : (
                                <>
                                  <Crown className="h-3 w-3 mr-1" />
                                  Tier Benefit
                                </>
                              )}
                            </Badge>
                            <Percent className="h-5 w-5 text-napoleon-400" />
                          </div>

                          <h4 className="font-luxury font-bold text-foreground mb-2">
                            {offer.title}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-4">
                            {offer.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              Valid until{" "}
                              {new Date(offer.validUntil).toLocaleDateString()}
                            </div>
                            <Button size="sm" className="luxury-button">
                              <Ticket className="h-4 w-4 mr-2" />
                              Claim
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
              Maximize Your <span className="luxury-text">Rewards</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The more you play, stay, and dine with us, the more exclusive
              benefits you unlock.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="luxury-button text-lg px-8 py-3">
                Book Your Next Stay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-3 border-napoleon-400/30 text-napoleon-300 hover:bg-napoleon-400/10"
              >
                Learn More About Elite
                <Trophy className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
