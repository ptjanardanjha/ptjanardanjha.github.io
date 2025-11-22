import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  Phone, 
  Flame, 
  FileText, 
  Heart, 
  Calculator,
  Moon,
  Star
} from "lucide-react";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  ctaText: string;
  ctaVariant: "spiritual" | "divine";
  href?: string;
}

const services: Service[] = [
  // {
  //   icon: MessageCircle,
  //   title: "Chat with Astrologer",
  //   description: "Get instant answers to your questions through live chat with experienced astrologers.",
  //   color: "bg-pink-500/20 text-pink-500",
  //   ctaText: "Start Chat",
  //   ctaVariant: "spiritual"
  // },
  {
    icon: Phone,
    title: "Talk to Astrologer", 
    description: "Direct voice consultation for personalized guidance on love, career, and life decisions.",
    color: "bg-blue-500/20 text-blue-500",
    ctaText: "Call Now",
    ctaVariant: "divine"
  },
  {
    icon: Flame,
    title: "Book Pooja Services",
    description: "Authentic Vedic poojas performed by qualified pandits for prosperity and peace.",
    color: "bg-orange-500/20 text-orange-500",
    ctaText: "View Poojas",
    ctaVariant: "spiritual",
    href: "/pooja-list"
  },
  {
    icon: FileText,
    title: "Free Kundli",
    description: "Generate detailed birth chart analysis with planetary positions and predictions.",
    color: "bg-green-500/20 text-green-500",
    ctaText: "Get Kundli",
    ctaVariant: "divine"
  },
  // {
  //   icon: Heart,
  //   title: "Love & Compatibility",
  //   description: "Discover relationship compatibility and love predictions based on astrological analysis.",
  //   color: "bg-red-500/20 text-red-500",
  //   ctaText: "Check Match",
  //   ctaVariant: "spiritual"
  // },
  // {
  //   icon: Calculator,
  //   title: "Astro Calculators",
  //   description: "Various calculators for numerology, moon sign, dasha periods, and more.",
  //   color: "bg-purple-500/20 text-purple-500",
  //   ctaText: "Calculate",
  //   ctaVariant: "divine"
  // }
];

const Services = () => {
  const handleServiceClick = (href?: string) => {
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <section className="py-20 bg-background relative" id="services">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Star className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <div className="absolute top-40 right-32">
          <Moon className="w-6 h-6 text-accent animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-40 left-1/3">
          <Star className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Our Sacred</span>{" "}
            <span className="bg-golden-gradient bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive astrological services to guide you towards prosperity, 
            peace, and spiritual fulfillment
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-border hover:shadow-spiritual transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Button 
                    variant={service.ctaVariant} 
                    className="w-full"
                    onClick={() => handleServiceClick(service.href)}
                  >
                    {service.ctaText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;