import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Star } from "lucide-react";
import { BookPoojaForm } from "./BookPoojaForm";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { API_URL } from "@/config/api";

interface Pooja {
  poojaId: number;
  name: string;
  hindiName: string;
  html_description: string;
  price: number;
  samagriRefIdList: number[];
}

export const PoojaList = () => {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [isPoojaOpen, setIsPoojaOpen] = useState(false);
  const [selectedPoojaIds, setSelectedPoojaIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryColors: Record<string, string> = {
    prosperity: "bg-amber-500/10 text-amber-500",
    wellness: "bg-emerald-500/10 text-emerald-500",
    peace: "bg-sky-500/10 text-sky-500",
    relationship: "bg-rose-500/10 text-rose-500",
    career: "bg-violet-500/10 text-violet-500"
  };

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        const res = await fetch(`${API_URL}/poojas?page=0&size=10`);
        const data = await res.json();
        setPoojas(data.content);
      } catch (err) {
        console.error("Failed to fetch poojas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoojas();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-muted-foreground">Loading Poojas...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 bg-background relative" id="poojas">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20">
            <Star className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <div className="absolute top-40 right-32">
            <Flame className="w-6 h-6 text-accent animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
          <div className="absolute bottom-40 left-1/3">
            <Star className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: "2s" }} />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Sacred</span>{" "}
              <span className="bg-golden-gradient bg-clip-text text-transparent">Poojas</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Authentic Vedic poojas performed by experienced priests for spiritual growth, 
              prosperity, and divine blessings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {poojas.map((pooja) => (
              <Card
  key={pooja.poojaId}
  className="bg-card/50 backdrop-blur-sm border-border hover:shadow-spiritual transition-all duration-300 hover:-translate-y-1"
>
  <CardHeader className="text-center">
    <img
      src={`/pooja/${pooja.poojaId}.png`}
      alt={pooja.name}
      className="w-40 h-40 object-contain mx-auto mb-4 rounded-2xl border border-border bg-background"
    />
    <CardTitle className="text-xl font-semibold">
      {pooja.hindiName}
      <span className="block text-base font-normal text-muted-foreground mt-1">
        {pooja.name}
      </span>
    </CardTitle>
  </CardHeader>
  <CardContent className="text-center space-y-6">
    {/* <div className="font-medium text-lg text-primary">
      ₹{pooja.price}
    </div> */}
<div className="flex gap-2">
  <Button
    variant="spiritual"
    className="flex-1"
    onClick={() => {
      setSelectedPoojaIds([pooja.poojaId]);
      setIsPoojaOpen(true);
    }}
  >
    Book Now
  </Button>
  <Link to={`/pooja-detail/${pooja.name}`} className="flex-1">
    <Button variant="outline" className="w-full">Details</Button>
  </Link>
</div>
  </CardContent>
</Card>


            ))}
          </div>
        </div>

        <BookPoojaForm 
          isOpen={isPoojaOpen} 
          onClose={() => {
            setIsPoojaOpen(false);
            setSelectedPoojaIds([]);
          }}
          preSelectedPoojaIds={selectedPoojaIds}
        />
      </section>
    </Layout>
  );
};
