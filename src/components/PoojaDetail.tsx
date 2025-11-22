import React, { useState, useEffect } from "react";
import parse, { domToReact, HTMLReactParserOptions, Element } from "html-react-parser";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, LoaderCircle, AlertTriangle } from "lucide-react";
import Layout from "./Layout";
import { BookPoojaForm } from "./BookPoojaForm";
import { API_URL } from "@/config/api";

interface Samagri {
  refId: number;
  display: string;
  hindiName: string;
  description: string;
}

interface Pooja {
  poojaId: number;
  name: string;
  hindiName: string;
  html_description: string;
  price: number;
  samagriRefIdList: number[];
  samagriList?: Samagri[];
}

export const PoojaDetail = () => {
  const [showHindi, setShowHindi] = useState(false);
  const [pooja, setPooja] = useState<Pooja | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // BookPoojaForm state
  const [isPoojaOpen, setIsPoojaOpen] = useState(false);
  const [preSelectedPoojaIds, setPreSelectedPoojaIds] = useState<string[]>([]);

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    if (!name) return;
    const fetchPoojaDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/poojas/by-name?name=${name}`);
        if (!res.ok) throw new Error(res.status === 404 ? "Pooja Not Found" : "Fetch error");
        const data: Pooja = await res.json();
        setPooja(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPoojaDetails();
  }, [name]);

  if (isLoading) return <LoaderCircle className="animate-spin" />;
  if (error) return <div>{error}</div>;
  if (!pooja) return null;

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        switch (domNode.tagName) {
          case "h2":
            return <h2 className="text-3xl font-bold text-primary mb-4">{domToReact(domNode.children, options)}</h2>;
          case "h3":
            return <h3 className="text-2xl font-semibold mt-4 mb-2">{domToReact(domNode.children, options)}</h3>;
          case "p":
            return <p className="text-base leading-relaxed mb-2">{domToReact(domNode.children, options)}</p>;
          case "ul":
            return <ul className="list-disc ml-5 mb-2">{domToReact(domNode.children, options)}</ul>;
          case "li":
            return <li className="mb-1">{domToReact(domNode.children, options)}</li>;
          default:
            return undefined;
        }
      }
    },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <img
            src={`/pooja/${pooja.poojaId}.png`}
            alt={pooja.name}
            className="aspect-square w-full h-auto rounded-2xl border object-cover shadow-xl bg-muted"
          />
          <div>
            <h1 className="text-4xl font-bold mb-1">{pooja.hindiName}</h1>
            <h2 className="text-2xl text-muted-foreground mb-6">{pooja.name}</h2>
            <div className="flex items-center justify-between gap-4 rounded-lg bg-primary/5 p-4 mb-8">
              {/* <div className="text-3xl font-bold text-primary">₹{pooja.price.toLocaleString("en-IN")}</div> */}
<Button
  size="lg"
  variant="spiritual"
  onClick={() => {
    setPreSelectedPoojaIds([pooja.poojaId.toString()]); // only this pooja
    setIsPoojaOpen(true);
  }}
>
  <ShoppingBag className="mr-2 h-5 w-5" /> Book Now
</Button>
            </div>

            {/* Samagri List with toggle */}
            {pooja.samagriList?.length && (
              <div className="mt-8 border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold">Samagri:-</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">English</span>
                    <button
                      onClick={() => setShowHindi(!showHindi)}
                      className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 transition-colors duration-300 ${
                        showHindi ? "bg-green-500 justify-end" : "justify-start"
                      }`}
                    >
                      <span className="bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300"></span>
                    </button>
                    <span className="text-sm font-medium">Hindi</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pooja.samagriList.map((item) => (
                    <div
                      key={item.refId}
                      className="flex items-center justify-center bg-gradient-to-r from-primary/70 to-primary/50 text-black px-5 py-3 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200 cursor-default"
                    >
                      <span className="text-base font-medium text-center">
                        {showHindi ? item.hindiName : item.display}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pooja Description */}
            <div className="pt-6 prose prose-slate dark:prose-invert max-w-none">
              {parse(pooja.html_description, options)}
            </div>

            <Link to="/pooja-list" className="mt-12 block">
              <Button variant="outline" className="w-full md:w-auto">
                <ArrowLeft className="mr-2 h-4 w-4" /> See All Poojas
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* BookPoojaForm Modal */}
      <BookPoojaForm
        isOpen={isPoojaOpen}
        onClose={() => {
          setIsPoojaOpen(false);
          setPreSelectedPoojaIds([]);
        }}
        preSelectedPoojaIds={preSelectedPoojaIds}
      />
    </Layout>
  );
};
