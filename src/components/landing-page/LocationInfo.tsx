// components/LocationInfo.tsx
import { MapPin, Globe, Crosshair } from "lucide-react";
import { useUserLocation } from "@/hooks/useUserLocation";

const LocationInfo = () => {
  const location = useUserLocation();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-card/60 px-4 py-3 shadow-sm">
      {location ? (
        <>
          {/* IP */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm">
              <span className="text-muted-foreground">IP:</span>{" "}
              <span className="font-medium text-foreground break-all">{location.ip}</span>
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm">
              <span className="font-medium text-foreground">
                {location.city}, {location.region}
              </span>
              <span className="text-muted-foreground"> ({location.country_name})</span>
            </span>
          </div>

          {/* Coordinates */}
          <div className="flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-medium text-foreground">
              {location.latitude}, {location.longitude}
            </span>
          </div>
        </>
      ) : (
        <span className="text-sm text-muted-foreground">-</span>
      )}
    </div>
  );
};

export default LocationInfo;
