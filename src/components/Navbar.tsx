import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Menu,
  X,
  ChefHat,
  Bed,
  MapPin,
  Calendar,
  Trophy,
  User,
  LogIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Destinations", href: "/destinations", icon: MapPin },
  { name: "Hotels", href: "/hotels", icon: Bed },
  { name: "Restaurants", href: "/restaurants", icon: ChefHat },
  { name: "My Reservations", href: "/reservations", icon: Calendar },
  { name: "My Rewards", href: "/rewards", icon: Trophy },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 casino-bg backdrop-blur-lg border-b border-napoleon-400/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Crown className="h-8 w-8 text-napoleon-400 group-hover:text-napoleon-300 transition-colors duration-300" />
              <div className="absolute inset-0 bg-napoleon-400/20 rounded-full blur-lg group-hover:bg-napoleon-300/30 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-luxury font-bold luxury-text">
                Napoleon
              </span>
              <span className="text-xs text-napoleon-400/80 -mt-1">
                Casino Group
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group",
                    isActive
                      ? "bg-napoleon-400/20 text-napoleon-300"
                      : "text-muted-foreground hover:text-napoleon-400 hover:bg-napoleon-400/10",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-napoleon-400"
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button className="luxury-button">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-muted-foreground hover:text-napoleon-400"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden casino-bg border-t border-napoleon-400/20">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-napoleon-400/20 text-napoleon-300"
                      : "text-muted-foreground hover:text-napoleon-400 hover:bg-napoleon-400/10",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-napoleon-400/20 space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-napoleon-400"
              >
                <User className="h-4 w-4 mr-3" />
                Account
              </Button>
              <Button className="w-full luxury-button">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
