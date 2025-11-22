// hooks/usePoojas.tsx
import { API_URL } from "@/config/api";
import { useEffect, useState } from "react";

export interface Pooja {
  poojaId: string;
  name: string;
  sanskritName: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  featured?: boolean;
}

export function usePoojas() {
  const [poojas, setPoojas] = useState<Pooja[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        const res = await fetch(
          `${API_URL}/poojas?page=0&size=100`
        );
        if (!res.ok) throw new Error("Failed to fetch poojas");
        const data = await res.json();
        setPoojas(data.content || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPoojas();
  }, []);

  return { poojas, loading, error };
}
