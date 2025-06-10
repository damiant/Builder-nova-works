import { useState } from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const locations = [
  { value: "las-vegas-nv", label: "Las Vegas, Nevada", state: "Nevada" },
  {
    value: "atlantic-city-nj",
    label: "Atlantic City, New Jersey",
    state: "New Jersey",
  },
  {
    value: "new-orleans-la",
    label: "New Orleans, Louisiana",
    state: "Louisiana",
  },
  { value: "biloxi-ms", label: "Biloxi, Mississippi", state: "Mississippi" },
  { value: "reno-nv", label: "Reno, Nevada", state: "Nevada" },
  { value: "tunica-ms", label: "Tunica, Mississippi", state: "Mississippi" },
  {
    value: "shreveport-la",
    label: "Shreveport, Louisiana",
    state: "Louisiana",
  },
  {
    value: "lake-charles-la",
    label: "Lake Charles, Louisiana",
    state: "Louisiana",
  },
  {
    value: "kansas-city-mo",
    label: "Kansas City, Missouri",
    state: "Missouri",
  },
  { value: "st-louis-mo", label: "St. Louis, Missouri", state: "Missouri" },
  { value: "chicago-il", label: "Chicago, Illinois", state: "Illinois" },
  { value: "detroit-mi", label: "Detroit, Michigan", state: "Michigan" },
  { value: "cleveland-oh", label: "Cleveland, Ohio", state: "Ohio" },
  { value: "cincinnati-oh", label: "Cincinnati, Ohio", state: "Ohio" },
  {
    value: "indianapolis-in",
    label: "Indianapolis, Indiana",
    state: "Indiana",
  },
  { value: "milwaukee-wi", label: "Milwaukee, Wisconsin", state: "Wisconsin" },
  { value: "des-moines-ia", label: "Des Moines, Iowa", state: "Iowa" },
  { value: "omaha-ne", label: "Omaha, Nebraska", state: "Nebraska" },
  { value: "denver-co", label: "Denver, Colorado", state: "Colorado" },
  {
    value: "albuquerque-nm",
    label: "Albuquerque, New Mexico",
    state: "New Mexico",
  },
  { value: "phoenix-az", label: "Phoenix, Arizona", state: "Arizona" },
  { value: "tucson-az", label: "Tucson, Arizona", state: "Arizona" },
  {
    value: "sacramento-ca",
    label: "Sacramento, California",
    state: "California",
  },
  {
    value: "san-diego-ca",
    label: "San Diego, California",
    state: "California",
  },
  { value: "portland-or", label: "Portland, Oregon", state: "Oregon" },
  { value: "seattle-wa", label: "Seattle, Washington", state: "Washington" },
  { value: "anchorage-ak", label: "Anchorage, Alaska", state: "Alaska" },
  { value: "honolulu-hi", label: "Honolulu, Hawaii", state: "Hawaii" },
  { value: "miami-fl", label: "Miami, Florida", state: "Florida" },
  { value: "tampa-fl", label: "Tampa, Florida", state: "Florida" },
];

interface LocationSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

export default function LocationSelector({
  value,
  onValueChange,
  placeholder = "Select a destination...",
}: LocationSelectorProps) {
  const [open, setOpen] = useState(false);

  const selectedLocation = locations.find(
    (location) => location.value === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between elegant-input bg-casino-800/50 border-napoleon-400/30 hover:border-napoleon-400/50 h-12 text-left"
        >
          <div className="flex items-center">
            <MapPin className="mr-3 h-4 w-4 text-napoleon-400" />
            <div className="flex flex-col items-start">
              {selectedLocation ? (
                <>
                  <span className="font-medium text-foreground">
                    {selectedLocation.label.split(",")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {selectedLocation.state}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-napoleon-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 casino-card border-napoleon-400/30">
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search destinations..."
            className="elegant-input border-none"
          />
          <CommandList>
            <CommandEmpty>No destination found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={location.value}
                  value={location.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    onValueChange?.(newValue);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between hover:bg-napoleon-400/10 data-[selected=true]:bg-napoleon-400/20"
                >
                  <div className="flex items-center">
                    <MapPin className="mr-3 h-4 w-4 text-napoleon-400" />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {location.label.split(",")[0]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {location.state}
                      </span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4 text-napoleon-400",
                      value === location.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
