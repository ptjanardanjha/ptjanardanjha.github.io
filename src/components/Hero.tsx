import { MapPin, Globe, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star, Users, Clock, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-astrologer.jpg";
import PanchangCard from "./PanchangCard";
import { useState } from "react";
import { BookingForm } from "./BookingForm";
import { KundliForm } from "./KundliForm";
import { BookPoojaForm } from "./BookPoojaForm";

const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [isPoojaOpen, setIsPoojaOpen] = useState(false);
  const [preSelectedPoojaIds, setPreSelectedPoojaIds] = useState<string[]>([]);
  return (
    <>
      <section className="relative min-h-screen bg-hero-gradient flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(45_100%_51%/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(280_60%_60%/0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="flex items-center space-x-1 bg-primary/20 rounded-full px-3 py-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-primary ml-2">5000+ Happy Clients</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Connect with</span>{" "}
                <span className="bg-golden-gradient bg-clip-text text-transparent">
                  Divine Wisdom
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Get authentic astrological guidance, personalized poojas, and spiritual solutions
                from experienced astrologers. Your path to prosperity starts here.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span>50+ Expert Astrologers</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>24/7 Available</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="spiritual"
                  size="lg"
                  className="text-base"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Book Free Consultation
                </Button>
                <Button
                  variant="divine"
                  size="lg"
                  className="text-base"
                  onClick={() => setIsKundliOpen(true)}
                >
                  Get Free Kundli
                </Button>
                <Button
                  variant="spiritual"
                  size="lg"
                  className="text-base"
                  onClick={() => setIsPoojaOpen(true)}
                >
                  Book Pooja
                </Button>
              </div>
              <BookingForm isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
              <KundliForm isOpen={isKundliOpen} onClose={() => setIsKundliOpen(false)} />
              <BookPoojaForm
                isOpen={isPoojaOpen}
                onClose={() => {
                  setIsPoojaOpen(false);
                  setPreSelectedPoojaIds([]);
                }}
                preSelectedPoojaIds={preSelectedPoojaIds}
              />
            </div>

{/* Diwali Lakshmi Pooja Card */}
<div className="relative h-full">
  <div className="relative rounded-2xl overflow-hidden bg-card shadow-spiritual h-full">
    <div className="relative h-full">
      <img
        src="/pooja/200005.png"
        alt="Diwali Lakshmi Pooja ceremony"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
      <h3 className="text-2xl font-bold mb-2">
        दीवाली लक्ष्मी पूजा
        <span className="block text-lg font-normal text-muted-foreground">
          Diwali Lakshmi Pooja
        </span>
      </h3>
      <p className="text-muted-foreground mb-4">
        Diwali Lakshmi Pooja is performed to seek blessings of Goddess Lakshmi
        for wealth, prosperity, and good fortune. The rituals include worshipping
        Lakshmi and Ganesha, lighting diyas, and invoking divine energy for a
        prosperous year ahead.
      </p>
      <Button
        variant="divine"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => {
          setPreSelectedPoojaIds(['Diwali Lakshmi Pooja']);
          setIsPoojaOpen(true);
        }}
      >
        Book Diwali Lakshmi Pooja
      </Button>
    </div>
  </div>

  {/* Floating Badge */}
  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-spiritual">
    <div className="text-center">
      <div className="text-sm font-medium">Special Festival</div>
      <div className="text-xs opacity-90">October 2025</div>
    </div>
  </div>
</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;