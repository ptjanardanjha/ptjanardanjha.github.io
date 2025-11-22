import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "Happy Clients",
    color: "text-blue-500"
  },
  {
    icon: Award,
    number: "25+",
    label: "Years Experience",
    color: "text-green-500"
  },
  {
    icon: Shield,
    number: "99%",
    label: "Accuracy Rate",
    color: "text-purple-500"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Available",
    color: "text-orange-500"
  }
];

const About = () => {
  return (
    <section className="py-20 bg-muted/20" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-foreground">About</span>{" "}
              <span className="bg-golden-gradient bg-clip-text text-transparent">PoojaJyotish</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Welcome to PoojaJyotish.com, your trusted spiritual companion for over two decades. 
              We bridge ancient Vedic wisdom with modern convenience, providing authentic 
              astrological guidance and divine services.
            </p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our team of experienced astrologers and qualified pandits are dedicated to 
              helping you navigate life's challenges with divine wisdom. From personalized 
              horoscopes to sacred poojas, we offer comprehensive spiritual solutions 
              tailored to your unique needs.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Our Mission</h4>
                <p className="text-sm text-muted-foreground">
                  To make authentic Vedic astrology accessible to everyone seeking spiritual guidance.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Our Vision</h4>
                <p className="text-sm text-muted-foreground">
                  Creating a harmonious world through divine wisdom and spiritual practices.
                </p>
              </div>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border-border hover:shadow-spiritual transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-${stat.color.split('-')[1]}-500/20 flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;