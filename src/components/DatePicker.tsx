import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  disabled?: (date: Date) => boolean;
}

export default function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  label,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-sm font-medium text-napoleon-300">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-12 elegant-input bg-casino-800/50 border-napoleon-400/30 hover:border-napoleon-400/50",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-3 h-4 w-4 text-napoleon-400" />
            <div className="flex flex-col items-start">
              {date ? (
                <>
                  <span className="font-medium text-foreground">
                    {format(date, "PPP")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(date, "EEEE")}
                  </span>
                </>
              ) : (
                <span>{placeholder}</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 casino-card border-napoleon-400/30"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              onDateChange?.(newDate);
              setOpen(false);
            }}
            disabled={disabled}
            initialFocus
            className="bg-transparent"
            classNames={{
              day_selected:
                "bg-napoleon-500 text-casino-900 hover:bg-napoleon-600",
              day_today: "bg-napoleon-400/20 text-napoleon-300",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-napoleon-400/20 aria-selected:text-napoleon-300",
              day_hidden: "invisible",
              head_cell: "text-napoleon-400 font-medium",
              nav_button:
                "text-napoleon-400 hover:text-napoleon-300 hover:bg-napoleon-400/20",
              nav_button_previous: "hover:bg-napoleon-400/20",
              nav_button_next: "hover:bg-napoleon-400/20",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
