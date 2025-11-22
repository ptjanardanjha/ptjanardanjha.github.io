import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookingForm } from "./BookingForm";
import { KundliForm } from "./KundliForm";
import { BookPoojaForm } from "./BookPoojaForm";

const Header = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isKundliOpen, setIsKundliOpen] = useState(false);
  const [isPoojaOpen, setIsPoojaOpen] = useState(false);
  const [preSelectedPoojaIds, setPreSelectedPoojaIds] = useState<string[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);

  return (
<header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={logo}
                alt="PoojaJyotish.com - Vedic Astrology & Pooja Services"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-foreground">PoojaJyotish</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a> */}

{/* CTA Section */}
<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
  <button
    onClick={() => setIsBookingOpen(true)}
    className="text-muted-foreground hover:text-primary transition-colors text-base"
  >
    Consult Now
  </button>

  <button
    onClick={() => setIsKundliOpen(true)}
    className="text-muted-foreground hover:text-primary transition-colors text-base"
  >
    Get Free Kundli
  </button>
</div>

{/* Modals */}
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
            <Link to="/pooja-list" className="text-muted-foreground hover:text-primary transition-colors">
              Book Pooja
            </Link>
            <Link
              to="/request-status"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Request Status
            </Link>
            {/* <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a> */}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="divine"
              size="sm"
              onClick={() =>
                window.open("https://wa.me/918527618816", "_blank")
              }
            >
              <MessageCircle className="w-4 h-4" />
              Whatsapp Now
            </Button>
            <Button
              variant="spiritual"
              size="sm"
              onClick={() => (window.location.href = "tel:+918527618816")}
            >
              <Phone className="w-4 h-4" />
              Call Astrologer
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-primary/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </button>
        </div>
      </div>

{/* Mobile Dropdown */}
{mobileOpen && (
      <div className="md:hidden bg-card border-t border-border shadow-md absolute w-full z-40">
    <nav className="flex flex-col space-y-2 px-4 py-4 max-h-[calc(100vh-64px)] overflow-y-auto">
      {/* Navigation Links */}
      <Link
        to="/pooja-list"
        className="text-foreground hover:text-primary transition-colors py-2"
        onClick={() => setMobileOpen(false)}
      >
        Book Pooja
      </Link>
      <Link
        to="/request-status"
        className="text-foreground hover:text-primary transition-colors py-2"
        onClick={() => setMobileOpen(false)}
      >
        Request Status
      </Link>
      <button
        onClick={() => {
          setIsBookingOpen(true);
          setMobileOpen(false);
        }}
        className="text-foreground hover:text-primary transition-colors text-left py-2"
      >
        Consult Now
      </button>
      <button
        onClick={() => {
          setIsKundliOpen(true);
          setMobileOpen(false);
        }}
        className="text-foreground hover:text-primary transition-colors text-left py-2"
      >
        Get Free Kundli
      </button>

      {/* CTA Buttons */}
      <div className="flex flex-col space-y-2 pt-4 border-t border-border">
        <Button
          variant="divine"
          size="sm"
          onClick={() => window.open("https://wa.me/918527618816", "_blank")}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Whatsapp Now
        </Button>
        <Button
          variant="spiritual"
          size="sm"
          onClick={() => (window.location.href = "tel:+918527618816")}
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Astrologer
        </Button>
      </div>
    </nav>
  </div>
)}
    </header>
      );
};

export default Header;