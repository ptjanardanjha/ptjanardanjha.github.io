import { useEffect, useState } from "react";
import { MhahPanchang } from "mhah-panchang";


export function useMhahPanchang(date: Date, latitude: number = 28.6139, longitude: number = 77.209) {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    const obj = new MhahPanchang();
    const result:any = obj.calculate(date);
    const sun:any = obj.sunTimer(date, latitude, longitude);
    console.log(result, sun);
    setData({
       Day: result.Day,
      Tithi: result.Tithi,
      Paksha: result.Paksha,
      Nakshatra: result.Nakshatra,
      Karna: result.Karna,
      Yoga: result.Yoga,
      Ayanamsa: result.Ayanamsa,
      Raasi: result.Raasi,
      Julian: result.Julian,
      Gana: result.Gana,
      Guna: result.Guna,
      Trinity: result.Trinity,
      sunRise: sun?.sunRise?.toString(),
      sunSet: sun?.sunSet?.toString(),
    });
  }, [date]);

  return data;
}
