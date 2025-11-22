import { Calendar, Moon, Star, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMhahPanchang } from "@/hooks/useMhahPanchang";
import { useState } from "react";

interface PanchangCardProps {
  className?: string;
  minimal?: boolean;
}

const PanchangCard = ({ className, minimal = false }: PanchangCardProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const panchang = useMhahPanchang(selectedDate);

  if (!panchang) {
    return <div className={cn("text-sm text-muted-foreground", className)}>Loading Panchang...</div>;
  }

  const handlePrev = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNext = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSelectedDate(new Date(e.target.value));
    }
  };

  return (
    <div className={cn("bg-card/50 backdrop-blur-sm rounded-lg p-4 space-y-3", className)}>
    <h1>Ravi</h1>
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">aaaआज का पंचांग</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handlePrev} className="p-1 rounded hover:bg-primary/10">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="border rounded px-2 py-1 text-sm"
          />
          <button onClick={handleNext} className="p-1 rounded hover:bg-primary/10">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Panchang details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="flex items-center space-x-2">
          <Moon className="w-4 h-4 text-primary" />
          <div className="text-sm">
            <div className="text-muted-foreground">तिथि</div>
            <div className="font-medium">{panchang.Tithi?.name_en_IN}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-primary" />
          <div className="text-sm">
            <div className="text-muted-foreground">नक्षत्र</div>
            <div className="font-medium">{panchang.Nakshatra?.name_en_IN}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="w-4 h-4 text-primary" />
          <div className="text-sm">
            <div className="text-muted-foreground">सूर्योदय</div>
            <div className="font-medium">{panchang.sunRise}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanchangCard;
