import { useEffect, useState } from "react";

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: number;
  longitude: number;
}

const STORAGE_KEY = "userLocation";

export function useUserLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        // Check localStorage first
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed: LocationData = JSON.parse(cached);
          // Verify IP is still same (optional)
          const res = await fetch("https://ipapi.co/ip/");
          const currentIp = await res.text();
          if (parsed.ip === currentIp) {
            setLocation(parsed);
            return;
          }
        }

        // Fetch new location data
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const locationData: LocationData = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country_name: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
        };

        setLocation(locationData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(locationData));
      } catch (err) {
        console.error("Failed to fetch location", err);
      }
    }

    fetchLocation();
  }, []);

  return location;
}
