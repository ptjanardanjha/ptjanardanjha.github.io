import { Calendar, Sun, Moon, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useMhahPanchang } from "@/hooks/useMhahPanchang";
import { cn } from "@/lib/utils";
import { useUserLocation } from "@/hooks/useUserLocation";
import { HiEn } from "@/hi-en";
import DatePicker from "react-datepicker";
import LocationInfo from "./landing-page/LocationInfo";
interface PanchangCardProps {
  className?: string;
  minimal?: boolean;
}

const Panchang = ({ className, minimal = false }: PanchangCardProps) => {
  const convert = (en: any) => {
    if (HiEn[en]) {
      return HiEn[en];
    }
    return en;
  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  const location = useUserLocation();
  console.log(location);
  const panchang = useMhahPanchang(selectedDate, location?.latitude, location?.longitude);

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

  const formatDateRange = (start?: string, end?: string) => {
    if (!start || !end) return "";
    const options = { day: "numeric", month: "long", year: "numeric" } as const;
    const startDate = new Intl.DateTimeFormat("en-IN", options).format(new Date(start));
    const startTime = new Date(start).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    const endDate = new Intl.DateTimeFormat("en-IN", options).format(new Date(end));
    const endTime = new Date(end).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    return `${startDate}, ${startTime} - ${endDate}, ${endTime}`;
  };

  const renderField = (label: string, value: any, start?: string, end?: string) => {
    const displayValue = value ? HiEn[value] || value : "-";
    console.log(label, value, displayValue);

    return (
      <div className="bg-card/50 rounded-xl p-3 sm:p-4 border border-primary/10 hover:border-primary/30 transition-colors w-full">
        <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base break-words">
          {label}
        </h4>
        <p className="text-primary font-medium text-base sm:text-lg break-words">
          {displayValue}
          {start && end ? (
            <>
              <br />
              <span className="text-muted-foreground text-sm sm:text-base">
                {formatDateRange(start, end)}
              </span>
            </>
          ) : null}
        </p>
      </div>
    );
  };


  // Mock data - in real app, this would come from an API
  const today = new Date();



  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4">
        <div className="relative mb-10 sm:mb-12 text-center">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 mb-4">
            <div className="flex items-center justify-center">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                आज का पंचांग
              </h2>
            </div>

          </div>
            {/* Controls */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
  {/* Date navigation */}
  <div className="flex items-center gap-2">
    {/* Prev button */}
    <button
      onClick={handlePrev}
      className="p-2 rounded hover:bg-primary/20 transition-colors"
      aria-label="Previous Day"
    >
      <ChevronLeft className="w-5 h-5 text-primary" />
    </button>

    {/* Date Picker */}
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date) => setSelectedDate(date)}
      dateFormat="dd/MM/yyyy"
      className="border rounded px-2 py-1 text-sm text-black w-28 sm:w-36 text-center focus:outline-none focus:ring-1 focus:ring-primary"
    />

    {/* Next button */}
    <button
      onClick={handleNext}
      className="p-2 rounded hover:bg-primary/20 transition-colors"
      aria-label="Next Day"
    >
      <ChevronRight className="w-5 h-5 text-primary" />
    </button>
  </div>

  {/* Location (moves below on mobile) */}
  <div className="mt-2 sm:mt-0 w-full sm:w-auto text-center sm:text-left">
    <LocationInfo />
  </div>
</div>

          {/* Subtitle */}
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-4 text-center">
            Today's Astrological Calendar & Auspicious Timings
          </p>
            
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-spiritual p-4 sm:p-6 md:p-8">
            
            {/* Timings Section */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-card/50 rounded-lg p-3 sm:p-4 border border-secondary/20">
                <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">सूर्योदय</h4>
                <p className="text-primary font-medium text-base sm:text-lg">{panchang.sunRise || "-"}</p>
              </div>
              <div className="bg-card/50 rounded-lg p-3 sm:p-4 border border-secondary/20">
                <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">सूर्यास्त</h4>
                <p className="text-primary font-medium text-base sm:text-lg">{panchang.sunSet || "-"}</p>
              </div>
            </div>

            {/* Panchang Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
              {renderField("तिथि", panchang.Tithi?.name_en_IN, panchang.Tithi?.start, panchang.Tithi?.end)}
              {renderField("नक्षत्र", panchang.Nakshatra?.name_en_IN, panchang.Nakshatra?.start, panchang.Nakshatra?.end)}
              {renderField("योग", panchang.Yoga?.name_en_IN, panchang.Yoga?.start, panchang.Yoga?.end)}
              {renderField("करण", panchang.Karna?.name_en_IN, panchang.Karna?.start, panchang.Karna?.end)}
            </div>
            
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
  {renderField("पक्ष", panchang.Paksha?.name_en_IN)}
  {renderField("दिन", panchang.Day?.name_en_UK)}
  {renderField("राशि", panchang.Raasi?.name_en_UK)}
  {renderField("गण", panchang.Gana?.name_en_IN)}
  {renderField("गुण", panchang.Guna?.name_en_IN)}
  {renderField("त्रय", panchang.Trinity?.name_en_IN)}
</div>

          </Card>
        </div>
      </div>
    </section>
  );
};

export default Panchang;