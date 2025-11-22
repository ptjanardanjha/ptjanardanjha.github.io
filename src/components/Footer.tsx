import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-golden-gradient rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">PJ</span>
              </div>
              <h3 className="text-xl font-bold text-foreground">PoojaJyotish.com</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted spiritual partner for authentic astrological guidance and divine blessings.
            </p>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Astrology Consultation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pooja Services</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kundli Making</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vastu Consultation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gemstone Recommendation</a></li>
            </ul>
          </div>
          
          {/* Tools */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Free Tools</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Daily Horoscope</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kundli Generator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Numerology Calculator</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Compatibility Check</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Panchang</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 85276 18816</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@poojajyotish.com</span>
              </li>
<li className="flex items-start space-x-2">
  <MapPin className="w-5 h-5 text-primary mt-1" />
  <div className="flex flex-col">
    <span className="font-medium">21/14, Third Floor (Left Side)</span>
    <span>West Patel Nagar, New Delhi - 110008</span>
    <a
      href="https://maps.app.goo.gl/nvuykUUCTTMMQve89"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline mt-1"
    >
      📍 View on Google Maps
    </a>
  </div>
</li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 PoojaJyotish.com. All rights reserved. | Bringing divine wisdom to modern life</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;